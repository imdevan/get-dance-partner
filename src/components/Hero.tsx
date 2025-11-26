import { Button } from "@/components/ui/button";
import { ArrowRight, Video, BookOpen, Tag } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

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
        {/* Floating icons */}
        <div className="absolute -left-20 top-20 opacity-20 hidden lg:block will-change-transform">
          <Video 
            className="w-16 h-16 text-primary animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.2}px, 0)` }}
          />
        </div>
        <div className="absolute -right-20 top-40 opacity-20 hidden lg:block will-change-transform">
          <BookOpen 
            className="w-16 h-16 text-secondary animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.15}px, 0)` }}
          />
        </div>
        <div className="absolute left-10 bottom-20 opacity-20 hidden lg:block will-change-transform">
          <Tag 
            className="w-12 h-12 text-accent animate-pulse"
            style={{ transform: `translate3d(0, ${scrollY * 0.25}px, 0)` }}
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-lg rounded-full border-2 hover:bg-primary/5 transition-all hover:scale-105"
              onClick={() => window.location.href = '/learn-more'}
            >
              Learn More
            </Button>
          </div>
          
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
