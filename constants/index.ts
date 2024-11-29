import { RankDetail, ValorantRole } from "@/lib/types/valorant.types";

export const VALORANT_RANKS: Record<number, RankDetail> = {
    0: { tier: 0, rank: 'Unranked', division: 'Unranked', rankInDivision: 'Unranked' },
    3: { tier: 3, rank: 'Iron 1', division: 'Iron', rankInDivision: 'Iron 1' },
    4: { tier: 4, rank: 'Iron 2', division: 'Iron', rankInDivision: 'Iron 2' },
    5: { tier: 5, rank: 'Iron 3', division: 'Iron', rankInDivision: 'Iron 3' },
    6: { tier: 6, rank: 'Bronze 1', division: 'Bronze', rankInDivision: 'Bronze 1' },
    7: { tier: 7, rank: 'Bronze 2', division: 'Bronze', rankInDivision: 'Bronze 2' },
    8: { tier: 8, rank: 'Bronze 3', division: 'Bronze', rankInDivision: 'Bronze 3' },
    9: { tier: 9, rank: 'Silver 1', division: 'Silver', rankInDivision: 'Silver 1' },
    10: { tier: 10, rank: 'Silver 2', division: 'Silver', rankInDivision: 'Silver 2' },
    11: { tier: 11, rank: 'Silver 3', division: 'Silver', rankInDivision: 'Silver 3' },
    12: { tier: 12, rank: 'Gold 1', division: 'Gold', rankInDivision: 'Gold 1' },
    13: { tier: 13, rank: 'Gold 2', division: 'Gold', rankInDivision: 'Gold 2' },
    14: { tier: 14, rank: 'Gold 3', division: 'Gold', rankInDivision: 'Gold 3' },
    15: { tier: 15, rank: 'Platinum 1', division: 'Platinum', rankInDivision: 'Platinum 1' },
    16: { tier: 16, rank: 'Platinum 2', division: 'Platinum', rankInDivision: 'Platinum 2' },
    17: { tier: 17, rank: 'Platinum 3', division: 'Platinum', rankInDivision: 'Platinum 3' },
    18: { tier: 18, rank: 'Diamond 1', division: 'Diamond', rankInDivision: 'Diamond 1' },
    19: { tier: 19, rank: 'Diamond 2', division: 'Diamond', rankInDivision: 'Diamond 2' },
    20: { tier: 20, rank: 'Diamond 3', division: 'Diamond', rankInDivision: 'Diamond 3' },
    21: { tier: 21, rank: 'Ascendant 1', division: 'Ascendant', rankInDivision: 'Ascendant 1' },
    22: { tier: 22, rank: 'Ascendant 2', division: 'Ascendant', rankInDivision: 'Ascendant 2' },
    23: { tier: 23, rank: 'Ascendant 3', division: 'Ascendant', rankInDivision: 'Ascendant 3' },
    24: { tier: 24, rank: 'Immortal 1', division: 'Immortal', rankInDivision: 'Immortal 1' },
    25: { tier: 25, rank: 'Immortal 2', division: 'Immortal', rankInDivision: 'Immortal 2' },
    26: { tier: 26, rank: 'Immortal 3', division: 'Immortal', rankInDivision: 'Immortal 3' },
    27: { tier: 27, rank: 'Radiant', division: 'Radiant', rankInDivision: 'Radiant' },
};

export const AGENT_ROLES: Record<string, ValorantRole> = {
    // Duelists
    'Jett': 'Duelist',
    'Phoenix': 'Duelist',
    'Neon': 'Duelist',
    'Raze': 'Duelist',
    'Reyna': 'Duelist',
    'Yoru': 'Duelist',
    'Iso': 'Duelist',

    // Controllers
    'Brimstone': 'Controller',
    'Viper': 'Controller',
    'Omen': 'Controller',
    'Astra': 'Controller',
    'Harbor': 'Controller',

    // Initiators
    'Sova': 'Initiator',
    'Breach': 'Initiator',
    'Skye': 'Initiator',
    'KAY/O': 'Initiator',
    'Fade': 'Initiator',
    'Gekko': 'Initiator',

    // Sentinels
    'Killjoy': 'Sentinel',
    'Cypher': 'Sentinel',
    'Sage': 'Sentinel',
    'Chamber': 'Sentinel',
    'Deadlock': 'Sentinel',
};