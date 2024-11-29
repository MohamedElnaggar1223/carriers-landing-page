'use server'

import { z } from "zod"
import { playerSignUpSchema } from "../validations/auth"
import { connectDB } from "../mongoose"
import User from "@/models/User"
import Player from "@/models/Player"
import { getSession } from "../session"
import {
    RiotAccountResponse,
    MatchListResponse,
    MatchResponse,
    ProcessedValorantStats,
    ApiError,
    RankDetail,
    GameContentDto,
    ValorantRole,
    RoleStats
} from '@/lib/types/valorant.types';
import { AGENT_ROLES, VALORANT_RANKS } from "@/constants"
import valorantContent from "@/data/content.json"
import { revalidatePath } from "next/cache"

function calculateKDA(kills: number, deaths: number, assists: number): string {
    return ((kills + assists) / Math.max(deaths, 1)).toFixed(2);
}

export const createPlayer = async (data: z.infer<typeof playerSignUpSchema>) => {
    const { username, playName, email } = data

    if (!username || !email || !playName) {
        return { error: 'Please fill all the fields' }
    }

    try {
        connectDB()

        const user = await User.findOne({ email })

        if (user) {
            return { error: 'Email already exists' }
        }

        const newUser = new User({
            name: username,
            email,
            role: 'player',
        })

        const newPlayer = new Player({
            userId: newUser._id,
        })

        await Promise.all([newUser.save(), newPlayer.save()])

        return { success: 'Player created successfully', user: newUser }
    }
    catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}

export const addRiotId = async (username: string, tag: string, region: string) => {
    await connectDB()

    console.log(username, tag, region)

    const session = await getSession()

    const userId = session?.user?.id

    if (!userId) throw new Error('User not found')

    await Player.findOneAndUpdate({ userId }, { riotId: `${username}#${tag}`, region }, { new: true })

    revalidatePath('/dashboard')
}

const getRiotRegion = (region: string): string => {
    if (['NA', 'LATAM', 'BR'].includes(region)) return 'AMERICAS';
    if (region === 'EU') return 'EUROPE';
    if (['KR', 'AP'].includes(region)) return 'ASIA';
    return 'AMERICAS';
};

function getLatestRank(matches: MatchResponse[], puuid: string): RankDetail {
    const rankedMatches = matches.filter(match =>
        match.matchInfo.isCompleted &&
        match.matchInfo.isRanked
    );


    if (rankedMatches.length === 0) {
        return VALORANT_RANKS[0]; // Unranked
    }

    const sortedMatches = rankedMatches.sort((a, b) =>
        a.matchInfo.gameStartMillis - b.matchInfo.gameStartMillis
    );


    for (const match of sortedMatches) {
        const player = match.players.find(p => p.puuid === puuid);
        if (player && player.competitiveTier > 0) {
            return VALORANT_RANKS[player.competitiveTier] || VALORANT_RANKS[0];
        }
    }

    return VALORANT_RANKS[0];
}

export async function getPlayerStats(
    gameName: string,
    tagLine: string,
    region: string
): Promise<ProcessedValorantStats> {
    try {
        const RIOT_API_KEY = process.env.RIOT_API_KEY;

        const content = valorantContent as unknown as GameContentDto;

        const agentMap = new Map(content.characters.map(char => [char.id, char.name]));
        const mapMap = new Map(content.maps.map(map => [map.assetPath, { name: map.name, id: map.id }]));
        const weaponMap = new Map(content.equips.map(equip => [equip.id, equip.name]));
        const roleStatsMap: Record<ValorantRole, {
            matches: number;
            wins: number;
            losses: number;
            kills: number;
            deaths: number;
            assists: number;
        }> = {
            Duelist: { matches: 0, wins: 0, losses: 0, kills: 0, deaths: 0, assists: 0 },
            Controller: { matches: 0, wins: 0, losses: 0, kills: 0, deaths: 0, assists: 0 },
            Initiator: { matches: 0, wins: 0, losses: 0, kills: 0, deaths: 0, assists: 0 },
            Sentinel: { matches: 0, wins: 0, losses: 0, kills: 0, deaths: 0, assists: 0 },
        };

        const accountResponse = await fetch(
            `https://${getRiotRegion(region)}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${RIOT_API_KEY}`,
            { next: { revalidate: 3600 } }
        );

        if (!accountResponse.ok) {
            throw new Error(`Account API Error: ${accountResponse.status}`);
        }

        const accountData: RiotAccountResponse = await accountResponse.json();

        const matchListResponse = await fetch(
            `https://${region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${accountData.puuid}?api_key=${RIOT_API_KEY}`,
            { next: { revalidate: 3600 } }
        );

        if (!matchListResponse.ok) {
            throw new Error(`Match List API Error: ${matchListResponse.status}`);
        }

        const matchList: MatchListResponse = await matchListResponse.json();

        const matchPromises = matchList.history
            .map(match => fetch(
                `https://${region}.api.riotgames.com/val/match/v1/matches/${match.matchId}?api_key=${RIOT_API_KEY}`,
                { next: { revalidate: 3600 } }
            ).then(res => {
                if (!res.ok) {
                    throw new Error(`Match Details API Error: ${res.status}`);
                }
                return res.json() as Promise<MatchResponse>;
            }));

        const matches = await Promise.all(matchPromises);

        const stats: Omit<ProcessedValorantStats,
            'kdRatio' | 'winPercentage' | 'headshotPercentage' | 'topMaps' | 'topAgents' | 'topWeapons'
        > = {
            totalPlaytime: 0,
            totalMatches: matches.length,
            totalWins: 0,
            totalLosses: 0,
            totalKills: 0,
            totalDeaths: 0,
            totalAssists: 0,
            totalAces: 0,
            totalFlawlessRounds: 0,
            totalHeadHits: 0,
            totalBodyHits: 0,
            totalLegHits: 0,
            currentRank: VALORANT_RANKS[0],
            mapStats: {},
            agentStats: {},
            weapons: {},
            roleStats: [],
            topRoles: [],
            averageHeadshotsPerMatch: {},
        };

        const agentMapStats: Record<string, Record<string, { wins: number; totalMatches: number }>> = {};

        matches.forEach(match => {
            if (!match.matchInfo.isCompleted) return;

            const player = match.players.find(p => p.puuid === accountData.puuid);
            if (!player) return;

            const team = match.teams.find(t => t.teamId === player.teamId);
            const won = team?.won || false;

            stats.averageHeadshotsPerMatch[match.matchInfo.matchId] = {
                gameStartMillis: match.matchInfo.gameStartMillis,
                headshots: 0
            };

            stats.totalPlaytime += match.matchInfo.gameLengthMillis;
            won ? stats.totalWins++ : stats.totalLosses++;
            stats.totalKills += player.stats.kills;
            stats.totalDeaths += player.stats.deaths;
            stats.totalAssists += player.stats.assists;

            // if (match.matchInfo.isRanked && match.matchInfo.gameStartMillis > latestGameTimestamp) {
            //     latestGameTimestamp = match.matchInfo.gameStartMillis;
            //     stats.currentRank = VALORANT_RANKS[player.competitiveTier] || VALORANT_RANKS[0];
            // }

            const mapId = match.matchInfo.mapId;
            const mapName = mapMap.get(mapId) ?? { name: 'Unknown Map', id: '' };
            if (!stats.mapStats[mapId]) {
                stats.mapStats[mapId] = {
                    mapId,
                    mapName: mapName.name,
                    id: mapName.id,
                    wins: 0,
                    losses: 0,
                    winRate: 0
                };
            }
            won ? stats.mapStats[mapId].wins++ : stats.mapStats[mapId].losses++;

            stats.mapStats[mapId].winRate =
                (stats.mapStats[mapId].wins /
                    (stats.mapStats[mapId].wins + stats.mapStats[mapId].losses)) * 100;

            const agentId = player.characterId;
            const agentName = agentMap.get(agentId.toUpperCase()) ?? 'Unknown Agent';
            const agentRole = AGENT_ROLES[agentName];
            if (!stats.agentStats[agentId]) {
                stats.agentStats[agentId] = {
                    agentId,
                    agentName,
                    matches: 0,
                    wins: 0,
                    losses: 0,
                    headshots: 0,
                    bodyshots: 0,
                    legshots: 0,
                    totalShots: 0,
                    headshotAccuracy: "0",
                    bestMap: {
                        mapId: "",
                        mapName: "",
                        wins: 0,
                        totalMatches: 0,
                        id: ""
                    }
                };
            }

            if (!agentMapStats[agentId]) {
                agentMapStats[agentId] = {};
            }
            if (!agentMapStats[agentId][mapId]) {
                agentMapStats[agentId][mapId] = { wins: 0, totalMatches: 0 };
            }
            agentMapStats[agentId][mapId].totalMatches++;
            if (won) agentMapStats[agentId][mapId].wins++;

            const agentStat = stats.agentStats[agentId];
            agentStat.matches++;
            won ? agentStat.wins++ : agentStat.losses++;

            match.roundResults.forEach(round => {
                const playerStats = round.playerStats.find(p => p.puuid === accountData.puuid);
                if (!playerStats) return;

                if (playerStats.kills?.length === 5) {
                    stats.totalAces++;
                }

                if (won && match.players
                    .filter(p => p.teamId === player.teamId)
                    .every(p => {
                        const playerRoundStats = round.playerStats.find(ps => ps.puuid === p.puuid);
                        return !playerRoundStats?.damage?.some(d => d.receiver === p.puuid);
                    })) {
                    stats.totalFlawlessRounds++;
                }

                playerStats.damage?.forEach(damage => {
                    stats.totalHeadHits += damage.headshots;
                    stats.totalBodyHits += damage.bodyshots;
                    stats.totalLegHits += damage.legshots;

                    agentStat.headshots += damage.headshots;
                    agentStat.bodyshots += damage.bodyshots;
                    agentStat.legshots += damage.legshots;
                    agentStat.totalShots += damage.headshots + damage.bodyshots + damage.legshots;

                    stats.averageHeadshotsPerMatch[match.matchInfo.matchId].headshots += damage.headshots;

                    if (playerStats.economy?.weapon) {
                        const weaponId = playerStats.economy.weapon;
                        const weaponName = weaponMap.get(weaponId.toUpperCase()) ?? 'Unknown Weapon';
                        if (!stats.weapons[weaponId]) {
                            stats.weapons[weaponId] = {
                                weaponId,
                                weaponName,
                                kills: 0,
                                headHits: 0,
                                bodyHits: 0,
                                legHits: 0
                            };
                        }
                        const weaponStat = stats.weapons[weaponId];
                        weaponStat.headHits += damage.headshots;
                        weaponStat.bodyHits += damage.bodyshots;
                        weaponStat.legHits += damage.legshots;
                    }
                });

                if (agentRole) {
                    const roleStats = roleStatsMap[agentRole];
                    roleStats.matches++;
                    won ? roleStats.wins++ : roleStats.losses++;
                    roleStats.kills += player.stats.kills;
                    roleStats.deaths += player.stats.deaths;
                    roleStats.assists += player.stats.assists;
                }

                playerStats.kills?.forEach(kill => {
                    if (playerStats.economy?.weapon) {
                        const weaponId = playerStats.economy.weapon;
                        if (stats.weapons[weaponId]) {
                            stats.weapons[weaponId].kills++;
                        }
                    }
                });
            });
        });

        stats.currentRank = getLatestRank(matches, accountData.puuid);

        console.log("Current Rank", stats.currentRank);

        Object.keys(stats.agentStats).forEach(agentId => {
            const agentMapData = agentMapStats[agentId];
            let bestMap = { mapId: "", mapName: "", wins: 0, totalMatches: 0, id: '' };

            Object.entries(agentMapData).forEach(([mapId, mapStats]) => {
                if (mapStats.wins > bestMap.wins ||
                    (mapStats.wins === bestMap.wins && mapStats.totalMatches > bestMap.totalMatches)) {
                    const mapName = mapMap.get(mapId) ?? { name: 'Unknown Map', id: '' };
                    bestMap = {
                        mapId,
                        mapName: mapName.name,
                        id: mapName.id,
                        wins: mapStats.wins,
                        totalMatches: mapStats.totalMatches
                    };
                }
            });

            stats.agentStats[agentId].bestMap = bestMap;
            stats.agentStats[agentId].headshotAccuracy =
                ((stats.agentStats[agentId].headshots /
                    Math.max(stats.agentStats[agentId].totalShots, 1)) * 100).toFixed(1);
        });

        const roleStats: RoleStats[] = Object.entries(roleStatsMap).map(([role, stats]) => ({
            role: role as ValorantRole,
            matches: stats.matches,
            wins: stats.wins,
            losses: stats.losses,
            kills: stats.kills,
            deaths: stats.deaths,
            assists: stats.assists,
            kdaRatio: calculateKDA(stats.kills, stats.deaths, stats.assists),
            winPercentage: ((stats.wins / Math.max(stats.matches, 1)) * 100).toFixed(1)
        }));

        const topRoles = [...roleStats]
            .sort((a, b) => {
                const matchDiff = b.matches - a.matches;
                if (matchDiff !== 0) return matchDiff;

                const aWinRate = parseFloat(a.winPercentage);
                const bWinRate = parseFloat(b.winPercentage);
                if (bWinRate - aWinRate !== 0) return bWinRate - aWinRate;

                return parseFloat(b.kdaRatio) - parseFloat(a.kdaRatio);
            })
            .slice(0, 4);

        const processedStats: ProcessedValorantStats = {
            ...stats,
            kdRatio: (stats.totalKills / Math.max(stats.totalDeaths, 1)).toFixed(2),
            winPercentage: ((stats.totalWins / stats.totalMatches) * 100).toFixed(1),
            headshotPercentage: ((stats.totalHeadHits /
                Math.max(stats.totalHeadHits + stats.totalBodyHits + stats.totalLegHits, 1)) * 100).toFixed(1),
            topMaps: Object.values(stats.mapStats)
                .sort((a, b) => b.winRate - a.winRate)
                .slice(0, 4),
            topAgents: Object.values(stats.agentStats)
                .sort((a, b) => b.matches - a.matches)
                .slice(0, 3),
            topWeapons: Object.values(stats.weapons)
                .sort((a, b) => b.kills - a.kills)
                .slice(0, 3),
            roleStats,
            topRoles,
        };

        return processedStats;
    } catch (error: any) {
        console.error('Error fetching player stats:', error);
        return {
            totalPlaytime: 0,
            totalMatches: 0,
            totalWins: 0,
            totalLosses: 0,
            totalKills: 0,
            totalDeaths: 0,
            totalAssists: 0,
            totalAces: 0,
            totalFlawlessRounds: 0,
            totalHeadHits: 0,
            totalBodyHits: 0,
            totalLegHits: 0,
            currentRank: VALORANT_RANKS[0],
            mapStats: {},
            agentStats: {},
            weapons: {},
            topWeapons: [],
            roleStats: [],
            topRoles: [],
            averageHeadshotsPerMatch: {},
            kdRatio: "0",
            winPercentage: "0",
            headshotPercentage: "0",
            topAgents: [],
            topMaps: [],
            error: error.message
        };
    }
}