import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface RankChangePopupProps {
  newRank: number;
  show: boolean;
  isImprovement: boolean;
}

export const RankChangePopup = ({ newRank, show, isImprovement }: RankChangePopupProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <Card className="rounded-[48px] p-8 bg-gradient-to-tr from-blue-50 via-white to-orange-50 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-orange-300/20"></div>
        <div className="relative z-10 flex flex-col items-center">
          {isImprovement ? (
            <TrendingUp className="w-16 h-16 text-emerald-500 mb-4" />
          ) : (
            <TrendingDown className="w-16 h-16 text-red-500 mb-4" />
          )}
          <div className="w-fit bg-white px-6 py-2 rounded-full mb-2 text-center border-2 border-blue-100">
            <span className="text-black text-2xl font-bold">
              {isImprovement ? 'Moved Up' : 'Moved Down'} to Rank #{newRank}!
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};