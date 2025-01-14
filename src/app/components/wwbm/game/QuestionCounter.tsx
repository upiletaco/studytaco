import { GiChiliPepper } from "react-icons/gi";

interface QuestionCounterProps {
  streak: number;
}

export const QuestionCounter = ({ streak }: QuestionCounterProps) => {
  if (streak <= 2) return null;
  
  return (
    <div className="flex items-center gap-1">
      <GiChiliPepper className="w-6 h-6 text-orange-500" />
      <span className="font-bold">{streak}</span>
    </div>
  );
};