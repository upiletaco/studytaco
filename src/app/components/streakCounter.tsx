import { Flame } from 'lucide-react';
import React, { useEffect, useState } from 'react'


const StreakCounter = () => {
  const [streak, setStreak] = useState(0);
  useEffect(() => {
    const checkAndUpdateStreak = () => {
      const today = new Date()
      const lastVisited = localStorage.getItem('lastVisited');
      const currentStreak = Number(localStorage.getItem('streakCount') || '0');

      if (!lastVisited) {
        localStorage.setItem('lastVisited', today.toISOString());
        localStorage.setItem('streakCount', '0');
        setStreak(0);
        return;
      }

      const lastDate = new Date(lastVisited)
      const diffTime = Math.abs(today.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffDates = today.getDate() - lastDate.getDate()
      console.log(`Last Date: ${lastDate.getDate()} and current date: ${today.getDate()}`)

      console.log(`Diff time: ${diffTime} and diffDays: ${diffDays}`)
      if (diffDates > 1 || diffDates < 0) {
        localStorage.setItem('lastVisited', today.toISOString());
        localStorage.setItem('streakCount', '0');
        setStreak(0);
      } else if (
        diffDates === 1
      ) {
        const newStreak = currentStreak + 1;
        localStorage.setItem('lastVisited', today.toISOString());
        localStorage.setItem('streakCount', newStreak.toString());
        setStreak(newStreak);
      } else {
        setStreak(currentStreak);
      }
    }
    checkAndUpdateStreak();
  }, [])

  if (streak === 0) return null;

  return (
    <div className='relative'>
    <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-3 rounded-full">
      <Flame className="w-4 h-4" />
      <span className="text-xs font-xs">{streak}</span>
    </div>
    </div>

    )
}

export default StreakCounter