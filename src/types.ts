export type TeamID = "ferGonza" | "maquiJona";

export interface Team {
  id: TeamID;
  name: string;
}

export interface MatchInfo {
  matchNumber: 1 | 2 | 3;
  matchName: string;
  result: "win" | "loss" | "Pendiente";
  winner: TeamID | "Pendiente";
}

export interface RoundSeries {
  id: number;
  teamA: TeamID;
  teamB: TeamID;
  matches: MatchInfo[];
}
