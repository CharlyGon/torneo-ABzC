import type { Team } from "./types";

interface StandingsTableProps {
    teams: Team[];
    stats: Record<"ferGonza" | "maquiJona", { puntos: number; balanceMapas: number; totalMapasGanados: number }>;
}

export function StandingsTable({ teams, stats }: Readonly<StandingsTableProps>) {
    const sorted = [...teams].sort((a, b) => {
        const sa = stats[a.id];
        const sb = stats[b.id];
        if (sa.puntos !== sb.puntos) return sb.puntos - sa.puntos;
        if (sa.balanceMapas !== sb.balanceMapas) return sb.balanceMapas - sa.balanceMapas;
        return sb.totalMapasGanados - sa.totalMapasGanados;
    });

    return (
        <table className="standings-table">
            <thead>
                <tr>
                    <th>Equipo</th>
                    <th>Puntos</th>
                    <th>Balance Matches</th>
                    <th>Matches Ganados</th>
                </tr>
            </thead>
            <tbody>
                {sorted.map((team) => {
                    const s = stats[team.id];
                    return (
                        <tr key={team.id}>
                            <td>{team.name}</td>
                            <td>{s.puntos}</td>
                            <td className={s.balanceMapas >= 0 ? "balance-positive" : "balance-negative"}>
                                {s.balanceMapas >= 0 ? `+${s.balanceMapas}` : s.balanceMapas}
                            </td>
                            <td>{s.totalMapasGanados}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
