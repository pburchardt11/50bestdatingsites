interface ScoreBarProps {
  label: string;
  score: number;
  max?: number;
}

export default function ScoreBar({ label, score, max = 10 }: ScoreBarProps) {
  const pct = Math.min((score / max) * 100, 100);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="font-serif text-sm font-bold text-amber-600">{score.toFixed(1)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
