import { Video, BookOpen, Tag, Sparkles, Music, Heart, Star, Zap, Play, Film, Radio } from "lucide-react";
import { useState, useEffect } from "react";
import { useWaitlist } from "@/hooks/use-waitlist";
import WaitlistForm from "@/components/WaitlistForm";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const waitlist = useWaitlist();

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
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Floating icons - falling stars effect - spread throughout header */}
        {/* Top row - above "Coming Soon" */}
        <div className="absolute left-10 top-5 opacity-20 hidden lg:block will-change-transform">
          <Star 
            className="w-12 h-12 text-primary animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.35}px, 0)` }}
          />
        </div>
        <div className="absolute left-1/4 top-8 opacity-20 hidden lg:block will-change-transform">
          <Play 
            className="w-10 h-10 text-secondary animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.25}px, 0)` }}
          />
        </div>
        <div className="absolute left-1/3 top-3 opacity-20 hidden lg:block will-change-transform">
          <Sparkles 
            className="w-11 h-11 text-accent animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.28}px, 0)` }}
          />
        </div>
        <div className="absolute right-1/3 top-6 opacity-20 hidden lg:block will-change-transform">
          <Music 
            className="w-13 h-13 text-primary animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.38}px, 0)` }}
          />
        </div>
        <div className="absolute right-1/4 top-10 opacity-20 hidden lg:block will-change-transform">
          <Heart 
            className="w-10 h-10 text-secondary animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.22}px, 0)` }}
          />
        </div>
        <div className="absolute right-10 top-4 opacity-20 hidden lg:block will-change-transform">
          <Zap 
            className="w-12 h-12 text-accent animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.32}px, 0)` }}
          />
        </div>
        
        {/* Middle row - around "Master Every Dance Class" */}
        <div className="absolute left-5 top-1/3 opacity-20 hidden lg:block will-change-transform">
          <Video 
            className="w-14 h-14 text-primary animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.42}px, 0)` }}
          />
        </div>
        <div className="absolute left-20 top-1/2 opacity-20 hidden lg:block will-change-transform">
          <Film 
            className="w-12 h-12 text-secondary animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.45}px, 0)` }}
          />
        </div>
        <div className="absolute left-1/4 top-2/5 opacity-20 hidden lg:block will-change-transform">
          <Radio 
            className="w-11 h-11 text-accent animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.30}px, 0)` }}
          />
        </div>
        <div className="absolute right-1/4 top-2/5 opacity-20 hidden lg:block will-change-transform">
          <BookOpen 
            className="w-13 h-13 text-primary animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.40}px, 0)` }}
          />
        </div>
        <div className="absolute right-20 top-1/2 opacity-20 hidden lg:block will-change-transform">
          <Tag 
            className="w-12 h-12 text-secondary animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.18}px, 0)` }}
          />
        </div>
        <div className="absolute right-5 top-1/3 opacity-20 hidden lg:block will-change-transform">
          <Star 
            className="w-14 h-14 text-accent animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.36}px, 0)` }}
          />
        </div>
        
        {/* Bottom row */}
        <div className="absolute left-10 bottom-20 opacity-20 hidden lg:block will-change-transform">
          <Sparkles 
            className="w-12 h-12 text-primary animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.20}px, 0)` }}
          />
        </div>
        <div className="absolute left-1/3 bottom-32 opacity-20 hidden lg:block will-change-transform">
          <Play 
            className="w-10 h-10 text-secondary animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.27}px, 0)` }}
          />
        </div>
        <div className="absolute right-1/3 bottom-32 opacity-20 hidden lg:block will-change-transform">
          <Music 
            className="w-11 h-11 text-accent animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.33}px, 0)` }}
          />
        </div>
        <div className="absolute right-10 bottom-20 opacity-20 hidden lg:block will-change-transform">
          <Heart 
            className="w-12 h-12 text-primary animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.24}px, 0)` }}
          />
        </div>
        
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
