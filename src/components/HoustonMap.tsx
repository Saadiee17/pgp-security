interface HoustonMapProps {
  className?: string
  height?: number
}

const mapCities = [
  { cx: 240, cy: 100, label: 'Houston',       primary: true },
  { cx: 170, cy: 112, label: 'Katy' },
  { cx: 210, cy: 148, label: 'Sugar Land' },
  { cx: 268, cy:  38, label: 'The Woodlands' },
  { cx: 258, cy: 156, label: 'Pearland' },
  { cx: 185, cy:  68, label: 'Cypress' },
  { cx: 272, cy:  56, label: 'Spring' },
  { cx: 318, cy: 120, label: 'Pasadena' },
  { cx: 290, cy: 168, label: 'League City' },
  { cx: 278, cy: 178, label: 'Friendswood' },
  { cx: 215, cy: 130, label: 'Missouri City' },
  { cx: 200, cy:  48, label: 'Tomball' },
  { cx: 278, cy:  22, label: 'Conroe' },
  { cx: 330, cy:  78, label: 'Humble' },
]

export default function HoustonMap({ className = '', height = 280 }: HoustonMapProps) {
  return (
    <div
      className={`w-full flex items-center justify-center ${className}`}
      style={{
        height: `${height}px`,
        background: 'linear-gradient(135deg, #0d1f3c 0%, #0a1628 40%, #111e35 70%, #0d1f3c 100%)',
      }}
    >
      <svg
        viewBox="0 0 480 200"
        className="w-full h-full"
        style={{ maxHeight: `${height}px` }}
        aria-label="Houston Region Map"
      >
        {/* Grid lines */}
        {[40, 80, 120, 160].map(y => (
          <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="rgba(200,164,94,0.06)" strokeWidth="1" />
        ))}
        {[60, 120, 180, 240, 300, 360, 420].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="rgba(200,164,94,0.06)" strokeWidth="1" />
        ))}
        {/* Beltway ring */}
        <ellipse cx="240" cy="100" rx="110" ry="72" fill="none" stroke="rgba(200,164,94,0.15)" strokeWidth="1.5" strokeDasharray="6 4" />
        {/* Outer ring */}
        <ellipse cx="240" cy="100" rx="185" ry="85" fill="none" stroke="rgba(200,164,94,0.07)" strokeWidth="1" strokeDasharray="4 6" />
        {/* City dots */}
        {mapCities.map((city) => (
          <g key={city.label}>
            <circle
              cx={city.cx}
              cy={city.cy}
              r={city.primary ? 6 : 4}
              fill={city.primary ? 'rgba(200,164,94,0.9)' : 'rgba(200,164,94,0.5)'}
            />
            {city.primary && (
              <circle cx={city.cx} cy={city.cy} r={12} fill="none" stroke="rgba(200,164,94,0.25)" strokeWidth="1.5" />
            )}
            <text
              x={city.cx + (city.primary ? 0 : 8)}
              y={city.primary ? city.cy + 18 : city.cy - 8}
              textAnchor={city.primary ? 'middle' : 'start'}
              fill="rgba(200,164,94,0.8)"
              fontSize={city.primary ? '10' : '7'}
              fontFamily="monospace"
              letterSpacing="0.05em"
            >
              {city.label}
            </text>
          </g>
        ))}
        {/* Footer label */}
        <text x="240" y="192" textAnchor="middle" fill="rgba(200,164,94,0.25)" fontSize="9" fontFamily="monospace" letterSpacing="0.15em">
          HOUSTON REGION MAP · PGP SERVICE AREA
        </text>
      </svg>
    </div>
  )
}
