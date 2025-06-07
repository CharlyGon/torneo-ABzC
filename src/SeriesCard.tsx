import type { RoundSeries, TeamID } from "./types";
import { slugify } from "./utils/utils";

interface SeriesCardProps {
  serie: RoundSeries;
  teams: Record<TeamID, string>;
}

export function SeriesCard({ serie, teams }: Readonly<SeriesCardProps>) {
  return (
    <div className="series-card">
      <div className="series-card-header">
        <h3>Serie Ronda {serie.id}</h3>
      </div>

      <div className="matches-row">
        {serie.matches.map((m) => {
          const isPending = m.result === "Pendiente";

          let winnerName: string;
          let winnerColor = "#aaa";

          if (isPending) {
            winnerName = "Pendiente";
          } else {
            winnerName = teams[m.winner as TeamID];
            winnerColor = m.result === "win" ? "#4caf50" : "#f44336";
          }


          const slug = slugify(m.matchName || "default");
          const iconSrc = `/maps/${slug || "default"}.svg`;

          return (
            <div key={m.matchNumber} className="match-column">
              <label className="match-label">Match {m.matchNumber}:</label>
              <div className="map-info">
                <img
                  src={iconSrc}
                  alt={m.matchName}
                  className="map-icon"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/maps/default.svg";
                  }}
                />
                <span className="map-name">
                  {m.matchName || "Mapa pendiente"}
                </span>
              </div>

              {/* Resultado */}
              <div className="result-container">
                <div className="result-label">Resultado:</div>

                {isPending ? (
                  <div className="pending-text">Pendiente</div>
                ) : (
                  <div className="result-content">
                    <span className="team-name" style={{ color: winnerColor }}>
                      {winnerName}
                    </span>
                    <span
                      className={`result-badge ${m.result === "win" ? "win" : "loss"
                        }`}
                    >
                      {m.result.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
