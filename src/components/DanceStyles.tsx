const DanceStyles = () => {
  const danceStyles = [
    "Zouk",
    "West Coast Swing",
    "Salsa",
    "Bachata",
    "Lindy Hop",
    "Blues"
  ];

  return (
    <section className="py-20 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
          For Every Dance Style
        </h2>
      </div>
      
      <div className="relative">
        {/* Gradient masks for fade effect - full height */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-secondary/30 via-secondary/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-secondary/30 via-secondary/30 to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-0">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...danceStyles, ...danceStyles].map((style, index) => (
              <div
                key={`first-${index}`}
                className="inline-flex items-center justify-center mx-8 px-8 py-4 bg-primary/10 rounded-full border border-primary/20"
              >
                <span className="text-2xl md:text-3xl font-semibold text-primary">
                  {style}
                </span>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
            {[...danceStyles, ...danceStyles].map((style, index) => (
              <div
                key={`second-${index}`}
                className="inline-flex items-center justify-center mx-8 px-8 py-4 bg-primary/10 rounded-full border border-primary/20"
              >
                <span className="text-2xl md:text-3xl font-semibold text-primary">
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
