import React, { useState, useRef, useEffect } from 'react';

interface TooltipPosition {
  left?: string;
  right?: string;
  transform: string;
}

const CategoryTitle = ({ title }: { title: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    left: '50%',
    transform: 'translateX(-50%)'
  });

  useEffect(() => {
    if (!tooltipRef.current || !containerRef.current) return;

    const updatePosition = () => {
      const tooltip = tooltipRef.current;
      const container = containerRef.current;
      if (!tooltip || !container) return;

      const tooltipRect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      let newPosition: TooltipPosition = {
        left: '50%',
        transform: 'translateX(-50%)'
      };

      // Check if tooltip goes off the left side
      if (tooltipRect.left < 10) {
        newPosition = {
          left: '0',
          transform: 'translateX(0)'
        };
      }
      
      // Check if tooltip goes off the right side
      if (tooltipRect.right > viewportWidth - 10) {
        newPosition = {
          right: '0',
          transform: 'translateX(0)'
        };
      }

      setTooltipPosition(newPosition);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [showTooltip]);

  return (
    <div 
      ref={containerRef}
      className="relative h-16 sm:h-24 bg-[#000080] border-2 border-[#FFCC00] rounded-lg p-2 sm:p-4
        flex items-center justify-center text-center group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <h2 className="text-[#FFCC00] font-bold text-xs sm:text-lg uppercase
        overflow-hidden text-ellipsis line-clamp-2 max-w-full px-1">
        {title}
      </h2>
      
      {showTooltip && (
        <div 
          ref={tooltipRef}
          className="absolute bottom-full mb-2 bg-[#000080] border-2 border-[#FFCC00] rounded p-2 z-10 
            max-w-[200px] text-[#FFCC00] text-sm whitespace-normal break-words"
          style={{
            left: tooltipPosition.left,
            right: tooltipPosition.right,
            transform: tooltipPosition.transform
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
};

export default CategoryTitle;