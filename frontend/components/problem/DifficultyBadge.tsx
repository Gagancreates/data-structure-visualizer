interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const styles = {
    Easy: 'bg-green-500/20 text-green-400',
    Medium: 'bg-yellow-500/20 text-yellow-400',
    Hard: 'bg-red-500/20 text-red-400'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
}
