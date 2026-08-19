const DOTS = [
  [40, 60], [120, 30], [210, 90], [300, 45], [380, 110],
  [460, 55], [90, 150], [180, 190], [260, 160], [340, 210],
  [420, 170], [60, 260], [150, 300], [240, 270], [330, 320],
  [410, 280], [30, 360], [110, 400], [200, 380], [290, 410],
  [370, 370], [450, 400], [500, 140], [500, 320], [20, 200],
];

const LINES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [1, 6], [6, 7], [7, 8], [8, 9], [9, 10],
  [6, 11], [11, 12], [12, 13], [13, 14], [14, 15],
  [11, 16], [16, 17], [17, 18], [18, 19], [19, 20],
  [4, 22], [10, 22], [14, 23], [19, 23], [16, 24], [11, 24],
];

export default function ConstellationBackground() {
  return (
    <svg
      viewBox="0 0 520 440"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full opacity-[0.18]"
      aria-hidden="true"
    >
      {LINES.map(([a, b], i) => (
        <line
          key={i}
          x1={DOTS[a][0]}
          y1={DOTS[a][1]}
          x2={DOTS[b][0]}
          y2={DOTS[b][1]}
          stroke="#9CA3AF"
          strokeWidth="0.6"
        />
      ))}
      {DOTS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 2.2 : 1.4} fill="#ffffff" />
      ))}
    </svg>
  );
}
