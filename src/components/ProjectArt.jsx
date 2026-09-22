/* Diagram for the Smart Notice Board: sender portal wired to the Pi-hosted display. */
export default function ProjectArt() {
  return (
    <svg viewBox="0 0 320 240" className="art art--board">
      <rect x="20" y="70" width="90" height="120" rx="10" className="box" />
      <rect x="36" y="90" width="58" height="8" rx="4" className="ink" /><rect x="36" y="108" width="40" height="8" rx="4" className="ink" />
      <path d="M112 130 H 166" className="wire" />
      <rect x="170" y="40" width="130" height="150" rx="10" className="screen" />
      <rect x="186" y="62" width="98" height="10" rx="5" className="glow" /><rect x="186" y="84" width="70" height="10" rx="5" className="glow" />
      <rect x="186" y="106" width="86" height="10" rx="5" className="glow" />
    </svg>
  );
}
