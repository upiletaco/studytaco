const GeometricTaco = () => (
    <div className="relative w-32 h-32 mx-auto mb-6">
      {/* Base Taco Shell */}
      <div className="absolute top-1/2 left-1/2 w-28 h-14 -translate-x-1/2 -translate-y-1/2 
        bg-yellow-400 border-2 border-black rounded-t-[120px]">
        {/* Shell Dots */}
        <div className="grid grid-cols-3 gap-2 pt-4 px-4">
          <div className="w-1.5 h-1.5 bg-black rounded-full" />
          <div className="w-1.5 h-1.5 bg-black rounded-full" />
          <div className="w-1.5 h-1.5 bg-black rounded-full" />
        </div>
      </div>
  
      {/* Lettuce Triangles */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 flex w-full justify-center">
        <div className="w-4 h-4 bg-green-400 border-2 border-black transform rotate-45 -translate-y-1" />
        <div className="w-5 h-5 bg-green-400 border-2 border-black transform rotate-[30deg] -translate-y-2" />
        <div className="w-4 h-4 bg-green-400 border-2 border-black transform rotate-[60deg] -translate-y-1" />
        <div className="w-5 h-5 bg-green-400 border-2 border-black transform rotate-[15deg] -translate-y-2" />
        <div className="w-4 h-4 bg-green-400 border-2 border-black transform rotate-[75deg] -translate-y-1" />
      </div>
  
      {/* Tomato Triangles */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 flex w-24 justify-between">
        <div className="w-4 h-4 bg-red-400 border-2 border-black transform rotate-[45deg] -translate-y-1" />
        <div className="w-4 h-4 bg-red-400 border-2 border-black transform rotate-[30deg] -translate-y-2" />
        <div className="w-4 h-4 bg-red-400 border-2 border-black transform rotate-[60deg] -translate-y-1" />
      </div>
  
      {/* Purple Side Accents */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 flex justify-between w-28">
        <div className="w-4 h-4 bg-indigo-500 border-2 border-black transform -rotate-[30deg]" />
        <div className="w-4 h-4 bg-indigo-500 border-2 border-black transform rotate-[30deg]" />
      </div>
    </div>
  );

  export {GeometricTaco}