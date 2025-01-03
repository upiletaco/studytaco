import { Flame } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
}

export const StreakCounter = ({ streak }: StreakCounterProps) => {
  if (streak <= 2) return null;
  
  return (
    <div className="flex items-center gap-1">
      <Flame className="w-6 h-6 text-orange-500" />
      <span className="font-bold">{streak}</span>
    </div>
  );
};