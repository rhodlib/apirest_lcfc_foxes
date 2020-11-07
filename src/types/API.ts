//Types extracted from the API of https://www.lcfc.com/ using http://www.jsontots.com/.

export interface API {
    pageInfo: PageInfo;
    content: Content[];
}

interface Content {
    gameweek: Gameweek;
    kickoff: Kickoff;
    provisionalKickoff: Kickoff;
    teams: Team2[];
    replay: boolean;
    ground: Ground;
    neutralGround: boolean;
    status: string;
    phase: string;
    outcome: string;
    clock: Clock;
    fixtureType: string;
    extraTime: boolean;
    shootout: boolean;
    goals: Goal[];
    penaltyShootouts: any[];
    behindClosedDoors: boolean;
    id: number;
}

interface Goal {
    personId: number;
    assistId?: number;
    clock: Clock;
    phase: string;
    type: string;
    description: string;
}

interface Clock {
    secs: number;
    label: string;
}

interface Ground {
    name: string;
    city: string;
    source: string;
    id: number;
}

interface Team2 {
    team: Team;
    score: number;
}

interface Team {
    name: string;
    club: Club;
    teamType: string;
    shortName: string;
    id: number;
}

interface Club {
    name: string;
    shortName: string;
    abbr: string;
    id: number;
}

interface Kickoff {
    completeness: number;
    millis: number;
    label: string;
    gmtOffset: number;
}

interface Gameweek {
    id: number;
    compSeason: CompSeason;
    gameweek: number;
    competitionPhase: CompetitionPhase;
}

interface CompetitionPhase {
    id: number;
    type: string;
    gameweekRange: number[];
}

interface CompSeason {
    label: string;
    competition: Competition;
    id: number;
}

interface Competition {
    abbreviation: string;
    description: string;
    level: string;
    source: string;
    id: number;
}

interface PageInfo {
    page: number;
    numPages: number;
    pageSize: number;
    numEntries: number;
}
