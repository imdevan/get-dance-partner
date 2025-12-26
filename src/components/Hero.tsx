import { Video, BookOpen, Tag, Sparkles, Music, Heart, Star, Zap, Play, Film, Radio } from "lucide-react";
import { useState, useEffect } from "react";
import { useWaitlist } from "@/hooks/use-waitlist";
import WaitlistForm from "@/components/WaitlistForm";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const waitlist = useWaitlist();
  const [iconPositions, setIconPositions] = useState<Array<{ left?: string; right?: string; top: string; size: number; parallaxSpeed: number }>>([]);

  useEffect(() => {
    // Generate random positions and sizes for icons on mount
    const icons = [
      { parallaxSpeed: 0.35 },
      { parallaxSpeed: 0.28 },
      { parallaxSpeed: 0.42 },
      { parallaxSpeed: 0.38 },
      { parallaxSpeed: 0.25 },
      { parallaxSpeed: 0.45 },
      { parallaxSpeed: 0.32 },
      { parallaxSpeed: 0.30 },
      { parallaxSpeed: 0.22 },
      { parallaxSpeed: 0.40 },
      { parallaxSpeed: 0.18 },
    ];

    const positions: Array<{ left?: string; right?: string; top: string; size: number; parallaxSpeed: number }> = [];
    const viewportWidth = window.innerWidth;
    const minPixelDistance = 32; // Minimum distance in pixels
    const viewportHeight = window.innerHeight;

    const isValidPosition = (newPos: { horizontal: number; vertical: number; size: number }) => {
      return positions.every(pos => {
        const existingHorizontal = parseFloat(pos.left || pos.right || '0');
        const existingVertical = parseFloat(pos.top);
        const existingSize = pos.size * 4; // Convert to pixels
        const newSize = newPos.size * 4;

        // Convert percentages to pixels
        const existingX = (existingHorizontal / 100) * viewportWidth;
        const existingY = (existingVertical / 100) * viewportHeight;
        const newX = (newPos.horizontal / 100) * viewportWidth;
        const newY = (newPos.vertical / 100) * viewportHeight;

        // Calculate distance between centers
        const distance = Math.sqrt(
          Math.pow(newX - existingX, 2) +
          Math.pow(newY - existingY, 2)
        );

        // Required distance is sum of radii plus minimum spacing
        const requiredDistance = (existingSize / 2) + (newSize / 2) + minPixelDistance;

        return distance >= requiredDistance;
      });
    };

    icons.forEach((icon) => {
      let attempts = 0;
      let position;

      while (attempts < 100) {
        const isLeft = Math.random() > 0.5;
        // Weight towards edges: 0-20% or 80-100% for horizontal
        const edgeZone = Math.random() > 0.5;
        const horizontal = edgeZone
          ? Math.random() * 20 // 0-20% from edge
          : Math.random() * 20 + 80; // 80-100% from edge

        // For vertical, favor top and bottom: 0-30% or 60-100%
        const topZone = Math.random() > 0.5;
        const vertical = topZone
          ? Math.random() * 30 // 0-30% from top
          : Math.random() * 40 + 60; // 60-100% from top

        const size = Math.random() * 6 + 10; // 10 to 16

        if (isValidPosition({ horizontal, vertical, size: Math.floor(size) })) {
          position = {
            ...(isLeft ? { left: `${horizontal}%` } : { right: `${horizontal}%` }),
            top: `${vertical}%`,
            size: Math.floor(size),
            parallaxSpeed: icon.parallaxSpeed,
          };
          break;
        }
        attempts++;
      }

      // If no valid position found after attempts, place it anyway (fallback)
      if (!position) {
        const isLeft = Math.random() > 0.5;
        const horizontal = Math.random() * 20;
        const vertical = Math.random() * 30;
        const size = Math.random() * 6 + 10;
        position = {
          ...(isLeft ? { left: `${horizontal}%` } : { right: `${horizontal}%` }),
          top: `${vertical}%`,
          size: Math.floor(size),
          parallaxSpeed: icon.parallaxSpeed,
        };
      }

      positions.push(position);
    });

    setIconPositions(positions);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 gradient-primary opacity-10 will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
        }}
      />

      {/* Floating icons - falling stars effect - spanning full viewport */}
      {iconPositions.length > 0 && (
        <>
          <div
            className="absolute opacity-20 hidden lg:block will-change-transform"
            style={{
              left: iconPositions[0].left,
              right: iconPositions[0].right,
              top: iconPositions[0].top,
              transform: `translate3d(0, ${scrollY * iconPositions[0].parallaxSpeed}px, 0)`
            }}
          >
            <Star className="text-primary animate-pulse" style={{ width: `${iconPositions[0].size * 4}px`, height: `${iconPositions[0].size * 4}px` }} />
          </div>
          <div
            className="absolute opacity-20 hidden lg:block will-change-transform"
            style={{
              left: iconPositions[1].left,
              right: iconPositions[1].right,
              top: iconPositions[1].top,
              transform: `translate3d(0, ${scrollY * iconPositions[1].parallaxSpeed}px, 0)`
            }}
          >
            <Sparkles className="text-secondary animate-pulse" style={{ width: `${iconPositions[1].size * 4}px`, height: `${iconPositions[1].size * 4}px` }} />
          </div>
          <div
            className="absolute opacity-20 hidden lg:block will-change-transform"
            style={{
              left: iconPositions[2].left,
              right: iconPositions[2].right,
              top: iconPositions[2].top,
              transform: `translate3d(0, ${scrollY * iconPositions[2].parallaxSpeed}px, 0)`
            }}
          >
            <Video className="text-accent animate-pulse" style={{ width: `${iconPositions[2].size * 4}px`, height: `${iconPositions[2].size * 4}px` }} />
          </div>
          <div
            className="absolute opacity-20 hidden lg:block will-change-transform"
            style={{
              left: iconPositions[3].left,
              right: iconPositions[3].right,
              top: iconPositions[3].top,
              transform: `translate3d(0, ${scrollY * iconPositions[3].parallaxSpeed}px, 0)`
            }}
          >
            <Music className="text-primary animate-pulse" style={{ width: `${iconPositions[3].size * 4}px`, height: `${iconPositions[3].size * 4}px` }} />
          </div>
          <div
            className="absolute opacity-20 hidden lg:block will-change-transform"
            style={{
              left: iconPositions[4].left,
              right: iconPositions[4].right,
              top: iconPositions[4].top,
              transform: `translate3d(0, ${scrollY * iconPositions[4].parallaxSpeed}px, 0)`
            }}
          >
            <Play className="text-secondary animate-pulse" style={{ width: `${iconPositions[4].size * 4}px`, height: `${iconPositions[4].size * 4}px` }} />
          </div>
          <div
            className="absolute opacity-20 hidden lg:block will-change-transform"
            style={{
              left: iconPositions[5].left,
              right: iconPositions[5].right,
              top: iconPositions[5].top,
              transform: `translate3d(0, ${scrollY * iconPositions[5].parallaxSpeed}px, 0)`
            }}
          >
            <Film className="text-accent animate-pulse" style={{ width: `${iconPositions[5].size * 4}px`, height: `${iconPositions[5].size * 4}px` }} />
          </div>
          <div
            className="absolute opacity-20 hidden lg:block will-change-transform"
            style={{
              left: iconPositions[6].left,
              right: iconPositions[6].right,
              top: iconPositions[6].top,
              transform: `translate3d(0, ${scrollY * iconPositions[6].parallaxSpeed}px, 0)`
            }}
          >
            <Zap className="text-primary animate-pulse" style={{ width: `${iconPositions[6].size * 4}px`, height: `${iconPositions[6].size * 4}px` }} />
          </div>
          <div
            className="absolute opacity-20 hidden lg:block will-change-transform"
            style={{
              left: iconPositions[7].left,
              right: iconPositions[7].right,
              top: iconPositions[7].top,
              transform: `translate3d(0, ${scrollY * iconPositions[7].parallaxSpeed}px, 0)`
            }}
          >
            <Radio className="text-secondary animate-pulse" style={{ width: `${iconPositions[7].size * 4}px`, height: `${iconPositions[7].size * 4}px` }} />
          </div>
          <div
            className="absolute opacity-20 hidden lg:block will-change-transform"
            style={{
              left: iconPositions[8].left,
              right: iconPositions[8].right,
              top: iconPositions[8].top,
              transform: `translate3d(0, ${scrollY * iconPositions[8].parallaxSpeed}px, 0)`
            }}
          >
            <Heart className="text-accent animate-pulse" style={{ width: `${iconPositions[8].size * 4}px`, height: `${iconPositions[8].size * 4}px` }} />
          </div>
          <div
            className="absolute opacity-20 hidden lg:block will-change-transform"
            style={{
              left: iconPositions[9].left,
              right: iconPositions[9].right,
              top: iconPositions[9].top,
              transform: `translate3d(0, ${scrollY * iconPositions[9].parallaxSpeed}px, 0)`
            }}
          >
            <BookOpen className="text-primary animate-pulse" style={{ width: `${iconPositions[9].size * 4}px`, height: `${iconPositions[9].size * 4}px` }} />
          </div>
          <div
            className="absolute opacity-20 hidden lg:block will-change-transform"
            style={{
              left: iconPositions[10].left,
              right: iconPositions[10].right,
              top: iconPositions[10].top,
              transform: `translate3d(0, ${scrollY * iconPositions[10].parallaxSpeed}px, 0)`
            }}
          >
            <Tag className="text-secondary animate-pulse" style={{ width: `${iconPositions[10].size * 4}px`, height: `${iconPositions[10].size * 4}px` }} />
          </div>
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto text-center">

        {/* Hero content */}
        <div className="space-y-6 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Coming Soon
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Master Every
            <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent selection:bg-primary/20 selection:text-primary"> Dance Class</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Never forget what you learned. Organize, annotate, and practice your dance videos
            with the intelligent companion for serious dancers.
          </p>

          <WaitlistForm {...waitlist} />

          {/* Stats */}
          {/*
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-16">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Beta Testers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-secondary">10k+</div>
              <div className="text-sm text-muted-foreground">Videos Organized</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">2x</div>
              <div className="text-sm text-muted-foreground">Faster Learning</div>
            </div>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
