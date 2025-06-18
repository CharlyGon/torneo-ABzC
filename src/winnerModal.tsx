import React, { useState, useEffect } from "react";

interface WinnerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function WinnerModal({ isOpen, onClose }: WinnerModalProps) {
    const IMAGES = [
        { label: "Campeones", filename: "campeones.png" },
    ];

    const [selected, setSelected] = useState<string>(IMAGES[0].filename);

    useEffect(() => {
        const saved = localStorage.getItem("winnerImage");
        if (saved && IMAGES.some((i) => i.filename === saved)) {
            setSelected(saved);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("winnerImage", selected);
    }, [selected]);

    if (!isOpen) return null;

    const src = `/winners/${selected}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <h2>Ganadores Torneo</h2>

        {/* Aquí eliminamos completamente el <select> */}

        <div className="modal-image-container">
          <img
            src={src}
            alt="Ganadores Torneo"
            className="modal-image"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/winners/default.png";
            }}
          />
        </div>
      </div>
    </div>
  );
}
