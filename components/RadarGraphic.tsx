export default function RadarGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="190" fill="none" stroke="#E8432B" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 10" />
      <circle cx="200" cy="200" r="140" fill="none" stroke="#E8432B" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="220 60" />
      <circle cx="200" cy="200" r="90" fill="none" stroke="#9CA3AF" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 8" />
      <line x1="200" y1="10" x2="200" y2="60" stroke="#E8432B" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="10" y1="200" x2="60" y2="200" stroke="#E8432B" strokeOpacity="0.4" strokeWidth="1" />
    </svg>
  );
}
