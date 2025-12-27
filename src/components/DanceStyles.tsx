import { sideSize } from "@/lib/constants";

const DanceStyles = () => {
  const danceStyles = [
    "Salsa",
    "Bachata",
    "Zouk",
    "Kiz",
    "Blues",
    "Tango",
    "Lindy Hop",
    "West Coast Swing",
    "Hip-Hop",
    "Ballet",
  ];

  // Create enough duplicates for seamless looping (3 sets)
  const duplicatedStyles = [...danceStyles, ...danceStyles, ...danceStyles];

  return (
    <section className="py-20 bg-background overflow-hidden relative">
      {/* Fog gradient masks - stronger on right for fog effect */}
      <div className={`block absolute left-0 md:left-[${sideSize.md}px]  lg:left-[${sideSize.lg}px] top-0 bottom-0 w-[1px] sm:w-[${sideSize.sm}px] md:w-[${sideSize.md}px] lg:w-[${sideSize.lg}px] bg-gradient-to-r from-background to-transparent z-10 pointer-events-none h-full`} />
      <div className={`block absolute right-0 md:right-[${sideSize.md}px] lg:right-[${sideSize.lg}px] top-0 bottom-0 w-[1px] sm:w-[${sideSize.sm}px] md:w-[${sideSize.md}px] lg:w-[${sideSize.lg}px] bg-gradient-to-l from-background to-transparent z-10 pointer-events-none h-full`} />

      <div className={`block absolute left-0 top-0 bottom-0 w-[1px] sm:w-[${sideSize.sm}px] md:w-[${sideSize.md}px] lg:w-[${sideSize.lg}px] bg-background z-20 pointer-events-none`} >{' '}</div>
      <div className={`block absolute right-0 top-0 bottom-0 w-[1px] sm:w-[${sideSize.sm}px] md:w-[${sideSize.md}px] lg:w-[${sideSize.lg}px] bg-background z-20 pointer-events-none`} >{' '}</div>

      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
          For Every Dance Style
        </h2>
      </div>

      <div className="relative h-32 md:h-40">
        {/* Side blocks to create smaller visible window */}

        <div className="absolute inset-0 flex items-center overflow-hidden">
          {/* First track */}
          <div className="absolute left-0 flex animate-dance-scroll-r2l whitespace-nowrap">
            {duplicatedStyles.map((style, index) => (
              <div
                key={`track1-${index}`}
                className="inline-flex items-center justify-center mx-6 md:mx-8 px-6 md:px-8 py-3 md:py-4 bg-primary/10 rounded-full border border-primary/20"
              >
                <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary">
                  {style}
                </span>
              </div>
            ))}
          </div>

          {/* Second track - offset for seamless loop */}
          <div className="absolute left-0 flex animate-dance-scroll-r2l-delayed whitespace-nowrap" aria-hidden="true">
            {duplicatedStyles.map((style, index) => (
              <div
                key={`track2-${index}`}
                className="inline-flex items-center justify-center mx-6 md:mx-8 px-6 md:px-8 py-3 md:py-4 bg-primary/10 rounded-full border border-primary/20"
              >
                <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary">
                  {style}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DanceStyles;
