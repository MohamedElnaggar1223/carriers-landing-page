// types/valorant.ts

// API Response Types
export type RiotAccountResponse = {
    puuid: string;
    gameName: string;
    tagLine: string;
}

export type MatchListResponse = {
    puuid: string;
    history: Array<{
        matchId: string;
        gameStartTimeMillis: number;
        queueId: string;
    }>;
}

export type MatchResponse = {
    matchInfo: {
        matchId: string;
        mapId: string;
        gameLengthMillis: number;
        gameStartMillis: number;
        isCompleted: boolean;
        customGameName: string;
        queueId: string;
        gameMode: string;
        isRanked: boolean;
        seasonId: string;
    };
    players: Array<{
        puuid: string;
        gameName: string;
        tagLine: string;
        teamId: string;
        characterId: string;
        stats: {
            score: number;
            roundsPlayed: number;
            kills: number;
            deaths: number;
            assists: number;
            playtimeMillis: number;
            abilityCasts: {
                grenadeCasts: number;
                ability1Casts: number;
                ability2Casts: number;
                ultimateCasts: number;
            };
        };
        competitiveTier: number;
        playerCard: string;
        playerTitle: string;
    }>;
    teams: Array<{
        teamId: string;
        won: boolean;
        roundsPlayed: number;
        roundsWon: number;
        numPoints: number;
    }>;
    roundResults: Array<{
        roundNum: number;
        roundResult: string;
        roundCeremony: string;
        winningTeam: string;
        playerStats: Array<{
            puuid: string;
            kills: Array<{
                timeSinceGameStartMillis: number;
                timeSinceRoundStartMillis: number;
                killer: string;
                victim: string;
            }>;
            damage: Array<{
                receiver: string;
                damage: number;
                legshots: number;
                bodyshots: number;
                headshots: number;
            }>;
            economy: {
                loadoutValue: number;
                weapon: string;
                armor: string;
                remaining: number;
                spent: number;
            };
        }>;
    }>;
}

export type RankDetail = {
    tier: number;
    rank: string;
    division: string;
    rankInDivision: string;
}

export type LocalizedNamesDto = {
    'ar-AE': string;
    'de-DE': string;
    'en-US': string;
    'es-ES': string;
    'es-MX': string;
    'fr-FR': string;
    'id-ID': string;
    'it-IT': string;
    'ja-JP': string;
    'ko-KR': string;
    'pl-PL': string;
    'pt-BR': string;
    'ru-RU': string;
    'th-TH': string;
    'tr-TR': string;
    'vi-VN': string;
    'zh-CN': string;
    'zh-TW': string;
}

export type ContentItemDto = {
    localizedNames: LocalizedNamesDto;
    id: string;
    name: string;
    assetName: string;
    assetPath?: string;
}

export type GameContentDto = {
    version: string;
    characters: ContentItemDto[];
    maps: ContentItemDto[];
    chromas: ContentItemDto[];
    skins: ContentItemDto[];
    skinLevels: ContentItemDto[];
    equips: ContentItemDto[];
    gameModes: ContentItemDto[];
    sprays: ContentItemDto[];
    sprayLevels: ContentItemDto[];
    charms: ContentItemDto[];
    charmLevels: ContentItemDto[];
    playerCards: ContentItemDto[];
    playerTitles: ContentItemDto[];
}

// Update the stats types to include names
export type MapStats = {
    mapId: string;
    mapName: string;
    wins: number;
    losses: number;
    winRate: number;
    id: string;
}

export type AgentStats = {
    agentId: string;
    agentName: string;
    matches: number;
    wins: number;
    losses: number;
    headshots: number;
    bodyshots: number;
    legshots: number;
    totalShots: number;
    headshotAccuracy: string;
    bestMap: {
        mapId: string;
        mapName: string;
        wins: number;
        totalMatches: number;
        id: string;
    };
}

export type WeaponStats = {
    weaponId: string;
    weaponName: string;
    kills: number;
    headHits: number;
    bodyHits: number;
    legHits: number;
}

export type ValorantRole = 'Duelist' | 'Initiator' | 'Controller' | 'Sentinel';

export type RoleStats = {
    role: ValorantRole;
    matches: number;
    wins: number;
    losses: number;
    kills: number;
    deaths: number;
    assists: number;
    kdaRatio: string;
    winPercentage: string;
}

// Main Stats Type
export type ProcessedValorantStats = {
    totalPlaytime: number;
    totalMatches: number;
    totalWins: number;
    totalLosses: number;
    totalKills: number;
    totalDeaths: number;
    totalAssists: number;
    totalAces: number;
    totalFlawlessRounds: number;
    totalHeadHits: number;
    totalBodyHits: number;
    totalLegHits: number;
    kdRatio: string;
    winPercentage: string;
    headshotPercentage: string;
    averageHeadshotsPerMatch: {
        [matchId: string]: {
            gameStartMillis: number;  // For ordering on graph
            headshots: number;
        }
    };
    currentRank: RankDetail;
    mapStats: Record<string, MapStats>;
    agentStats: Record<string, AgentStats>;
    weapons: Record<string, WeaponStats>;
    topMaps: MapStats[];
    topAgents: AgentStats[];
    topWeapons: WeaponStats[];
    roleStats: RoleStats[];
    topRoles: RoleStats[];
    error?: string | undefined | null;
}

export type ApiError = {
    status: number;
    message: string;
}