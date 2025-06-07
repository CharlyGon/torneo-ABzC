import  { useState, useMemo } from "react";
import type { Team, RoundSeries } from "./types";

type TeamID = Team["id"];

import { SeriesCard } from "./SeriesCard";
import { StandingsTable } from "./StandingsTable";
import "./styles.css";

export const INITIAL_TEAMS: Team[] = [
  { id: "ferGonza", name: "Fer y Gonza" },
  { id: "maquiJona", name: "Maqui y Jona" },
];

export const INITIAL_SERIES: RoundSeries[] = [
  {
    id: 1,
    teamA: "ferGonza",
    teamB: "maquiJona",
    matches: [
      { matchNumber: 1, matchName: "Valle", result: "win", winner: "maquiJona" },
      { matchNumber: 2, matchName: "", result: "Pendiente", winner: "Pendiente" },
      { matchNumber: 3, matchName: "", result: "Pendiente", winner: "Pendiente" },
    ],
  },
  {
    id: 2,
    teamA: "ferGonza",
    teamB: "maquiJona",
    matches: [
      { matchNumber: 1, matchName: "", result: "Pendiente", winner: "Pendiente" },
      { matchNumber: 2, matchName: "", result: "Pendiente", winner: "Pendiente" },
      { matchNumber: 3, matchName: "", result: "Pendiente", winner: "Pendiente" },
    ],
  },
  {
    id: 3,
    teamA: "ferGonza",
    teamB: "maquiJona",
    matches: [
      { matchNumber: 1, matchName: "", result: "Pendiente", winner: "Pendiente" },
      { matchNumber: 2, matchName: "", result: "Pendiente", winner: "Pendiente" },
      { matchNumber: 3, matchName: "", result: "Pendiente", winner: "Pendiente" },
    ],
  },
];

export function TournamentPage() {
  const [seriesList] = useState<RoundSeries[]>(INITIAL_SERIES);

  const teamsRecord: Record<TeamID, string> = {
    ferGonza: "Fer y Gonza",
    maquiJona: "Maqui y Jona",
  };

  const standings = useMemo(() => {
    type Stats = {
      puntos: number;
      balanceMapas: number;
      totalMapasGanados: number;
    };
    const stats: Record<TeamID, Stats> = {
      ferGonza: { puntos: 0, balanceMapas: 0, totalMapasGanados: 0 },
      maquiJona: { puntos: 0, balanceMapas: 0, totalMapasGanados: 0 },
    };

    seriesList.forEach((serie) => {
      serie.matches.forEach((m) => {
        const isWinA = m.winner === serie.teamA;
        const isWinB = m.winner === serie.teamB;

        if (isWinA) stats[serie.teamA].puntos += 3;
        if (isWinB) stats[serie.teamB].puntos += 3;

        if (isWinA) {
          stats[serie.teamA].balanceMapas += 1;
          stats[serie.teamB].balanceMapas -= 1;
          stats[serie.teamA].totalMapasGanados += 1;
        }
        if (isWinB) {
          stats[serie.teamB].balanceMapas += 1;
          stats[serie.teamA].balanceMapas -= 1;
          stats[serie.teamB].totalMapasGanados += 1;
        }
      });
    });

    return stats;
  }, [seriesList]);

  const tieTeams = useMemo(() => {
    const ptsA = standings.ferGonza.puntos;
    const ptsB = standings.maquiJona.puntos;
    return ptsA === ptsB;
  }, [standings]);

  return (
    <div>
      {/* HEADER con logo y título */}
      <div className="header">
        <img className="clan-logo" src="/logo-clan.svg" alt="Logo del clan ABzC" />
        <h1 className="header-title">
          Torneo “Duos Conquistadores”{" "}
          <span className="header-subtitle">
            [AB<span className="subtitle-small-z">Z</span>C]
          </span>
        </h1>
      </div>

      {/* Series en modo solo lectura */}
      <section>
        <h2>Fase de Liga</h2>
        {seriesList.map((serie) => (
          <SeriesCard key={serie.id} serie={serie} teams={teamsRecord} />
        ))}
      </section>

      {/* Tabla de Puntuaciones */}
      <section>
        <h2>Tabla de Puntuaciones</h2>
        <StandingsTable teams={INITIAL_TEAMS} stats={standings} />
      </section>

      {/* Tie-break si hay empate */}
      {tieTeams && (
        <section className="tie-break">
          <h2>¡Hay empate! Serie de desempate (Mejor de 3)</h2>
          <ol>
            <li>Balance de matches (matches ganados – matches perdidos).</li>
            <li>Total de matches ganados.</li>
            <li>Si persiste, se juega una serie adicional.</li>
          </ol>
          <p>
            Actualmente <strong>Fer y Gonza</strong> y <strong>Maqui y Jona</strong> tienen{" "}
            <strong>{standings.ferGonza.puntos} pts</strong> cada uno. Deben disputar desempate.
          </p>
        </section>
      )}
    </div>
  );
}
