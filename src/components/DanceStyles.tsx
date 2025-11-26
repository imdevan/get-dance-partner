import { useEffect, useRef, useState } from "react";

const DanceStyles = () => {
  const [styles, setStyles] = useState([
    "Zouk",
    "West Coast Swing",
    "Salsa",
    "Bachata",
    "Lindy Hop",
    "Blues",
    "Zouk",
    "West Coast Swing",
    "Salsa",
    "Bachata",
    "Lindy Hop",
    "Blues"
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setStyles(prev => {
        const newStyles = [...prev];
        const first = newStyles.shift();
        if (first) newStyles.push(first);
        return newStyles;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative py-20 bg-secondary/30 overflow-hidden">
      {/* Gradient masks for fade effect - full height */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
          For Every Dance Style
        </h2>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-8 whitespace-nowrap transition-all duration-500 ease-in-out"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {styles.map((style, index) => (
          <div
            key={`${style}-${index}`}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary/10 rounded-full border border-primary/20 flex-shrink-0"
          >
            <span className="text-2xl md:text-3xl font-semibold text-primary">
              {style}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DanceStyles;
