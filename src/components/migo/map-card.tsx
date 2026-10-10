export function MapCard({ from, to, tall }: { from: string; to: string; tall?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-[#e6eaee] ${tall ? "min-h-44 lg:min-h-80" : "min-h-44"}`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 180" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
        <g stroke="#fff" strokeWidth="10" strokeLinecap="round" vectorEffect="non-scaling-stroke">
          <path vectorEffect="non-scaling-stroke" d="M-10 60 L410 40" /><path vectorEffect="non-scaling-stroke" d="M-10 130 L410 150" /><path vectorEffect="non-scaling-stroke" d="M90 -10 L110 190" /><path vectorEffect="non-scaling-stroke" d="M250 -10 L230 190" /><path vectorEffect="non-scaling-stroke" d="M340 -10 L350 190" />
        </g>
        <rect x="120" y="70" width="70" height="50" rx="6" fill="#d5ddd2" /><rect x="262" y="62" width="60" height="30" rx="6" fill="#d5ddd2" />
        <path d="M60 135 C 100 135, 100 55, 170 55 S 300 95, 340 45" stroke="#000" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <circle cx="60" cy="135" r="9" fill="#000" /><circle cx="60" cy="135" r="3.5" fill="#fff" />
        <rect x="331" y="36" width="18" height="18" fill="#000" /><rect x="337" y="42" width="6" height="6" fill="#fff" />
      </svg>
      <div className="absolute left-3 top-3 max-w-[70%] rounded-xl bg-white/95 text-ink px-3 py-2 shadow">
        <p className="truncate text-sm font-bold">{from}</p>
        <p className="truncate text-xs text-muted">to {to}</p>
      </div>
    </div>
  );
}
