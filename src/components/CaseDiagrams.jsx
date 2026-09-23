import { logoFor } from '../data/resume';

/* a logo on a light tile, positioned inside an SVG diagram */
const Logo = ({ name, x, y, size = 28 }) => (
  <g>
    <rect x={x} y={y} width={size} height={size} rx={size * 0.26} className="dg__logo-bg" />
    <image href={logoFor(name)} x={x + size * 0.16} y={y + size * 0.16} width={size * 0.68} height={size * 0.68} />
  </g>
);

/* Reporting rebuild: before vs after, drawn to scale */
export function BarsDiagram() {
  return (
    <div className="bars">
      <div className="bars__row">
        <span className="bars__label">Before</span>
        <div className="bars__track"><span className="bars__fill bars__fill--before" /></div>
        <span className="bars__value">24 hours</span>
      </div>
      <div className="bars__row">
        <span className="bars__label">After</span>
        <div className="bars__track"><span className="bars__fill bars__fill--after" /></div>
        <span className="bars__value bars__value--hot">3–7 seconds</span>
      </div>
      <p className="bars__note">Drawn to scale. The second bar is less than 1/12,000th of the first, so it barely shows.</p>
    </div>
  );
}

/* Document automation: SharePoint → automated flows → client-named Blob folders */
const FOLDERS = [
  { y: 52, label: '/client-a' },
  { y: 130, label: '/client-b' },
  { y: 208, label: '/client-c' },
];
const flowPath = (fy) => `M160 150 H212 M348 150 C 390 150, 390 ${fy + 20}, 430 ${fy + 20}`;

export function FlowDiagram() {
  return (
    <svg viewBox="0 0 560 300" className="dg" role="img" aria-label="SharePoint files flow through Power Automate and Logic Apps into client-named folders in Azure Blob Storage">
      {FOLDERS.map((f) => <path key={f.y} d={flowPath(f.y)} className="dg__line" />)}

      <rect x="20" y="112" width="140" height="76" rx="14" className="dg__node" />
      <Logo name="SharePoint" x={34} y={128} />
      <text x="72" y="147" className="dg__title">SharePoint</text>
      <text x="34" y="176" className="dg__sub">source files</text>

      <rect x="212" y="104" width="136" height="92" rx="14" className="dg__node dg__node--hot" />
      <Logo name="Power Automate" x={226} y={118} />
      <Logo name="Logic Apps" x={260} y={118} />
      <text x="226" y="170" className="dg__title">Automated</text>
      <text x="226" y="186" className="dg__sub">flows</text>

      <text x="430" y="30" className="dg__sub">Azure Blob Storage</text>
      {FOLDERS.map((f) => (
        <g key={f.label}>
          <rect x="430" y={f.y} width="112" height="40" rx="10" className="dg__node" />
          <path d={`M444 ${f.y + 14} h9 l3 3 h10 v11 h-22 z`} className="dg__folder" />
          <text x="474" y={f.y + 25} className="dg__sub dg__sub--bright">{f.label}</text>
        </g>
      ))}

      {FOLDERS.map((f, i) => (
        <circle key={`dot-${f.y}`} r="4.5" className="dg__dot">
          <animateMotion dur="3.2s" begin={`-${i * 1.05}s`} repeatCount="indefinite" path={`M160 150 H348 C 390 150, 390 ${f.y + 20}, 430 ${f.y + 20}`} />
        </circle>
      ))}
    </svg>
  );
}

/* Penthara: React client → NestJS API → integrations */
const SERVICES = [
  { y: 16, name: 'Vector search', title: 'Vector DB', sub: 'semantic search' },
  { y: 92, name: 'MCP servers', title: 'MCP servers', sub: 'AI context' },
  { y: 168, name: 'Teams', title: 'MS Teams', sub: 'integration' },
  { y: 244, name: null, title: 'Email', sub: 'automated flows' },
];

export function SystemDiagram() {
  return (
    <svg viewBox="0 0 560 312" className="dg" role="img" aria-label="A React client talks to a multi-tenant NestJS API, which connects to a vector database, MCP servers, Microsoft Teams and automated email">
      <path d="M142 156 H212" className="dg__line" />
      {SERVICES.map((s) => (
        <path key={s.title} d={`M348 156 C 380 156, 380 ${s.y + 26}, 404 ${s.y + 26}`} className="dg__line" />
      ))}

      <rect x="20" y="118" width="122" height="76" rx="14" className="dg__node" />
      <Logo name="React.js" x={34} y={134} />
      <text x="72" y="153" className="dg__title">React</text>
      <text x="34" y="182" className="dg__sub">client app</text>

      <rect x="212" y="104" width="136" height="104" rx="14" className="dg__node dg__node--hot" />
      <Logo name="NestJS" x={226} y={118} />
      <text x="226" y="170" className="dg__title">NestJS API</text>
      <text x="226" y="190" className="dg__sub">multi-tenant</text>

      {SERVICES.map((s) => (
        <g key={s.title}>
          <rect x="404" y={s.y} width="150" height="52" rx="12" className="dg__node" />
          {s.name ? (
            <Logo name={s.name} x={414} y={s.y + 12} />
          ) : (
            <g>
              <rect x="414" y={s.y + 12} width="28" height="28" rx="7" className="dg__logo-bg" />
              <path d={`M421 ${s.y + 20} h14 v12 h-14 z M421 ${s.y + 20} l7 6 l7 -6`} className="dg__mail" />
            </g>
          )}
          <text x="450" y={s.y + 24} className="dg__title dg__title--sm">{s.title}</text>
          <text x="450" y={s.y + 40} className="dg__sub">{s.sub}</text>
        </g>
      ))}

      {SERVICES.map((s, i) => (
        <circle key={`dot-${s.title}`} r="4" className="dg__dot">
          <animateMotion dur="2.6s" begin={`-${i * 0.65}s`} repeatCount="indefinite" path={`M142 156 H348 C 380 156, 380 ${s.y + 26}, 404 ${s.y + 26}`} />
        </circle>
      ))}
    </svg>
  );
}
