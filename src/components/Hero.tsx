import { Video, BookOpen, Tag, Sparkles, Music, Heart, Star, Zap, Play, Film, Radio } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useWaitlist } from "@/hooks/use-waitlist";
import WaitlistForm from "@/components/WaitlistForm";

interface IconState {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  vSize: number;
  targetX: number;
  targetY: number;
  targetSize: number;
  parallaxSpeed: number;
}

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const waitlist = useWaitlist();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const iconStatesRef = useRef<IconState[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    // Initialize icon states
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

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const minPixelDistance = 16;

    const isValidPosition = (newPos: { x: number; y: number; size: number }, states: IconState[]) => {
      return states.every(state => {
        const distance = Math.sqrt(
          Math.pow(newPos.x - state.x, 2) + 
          Math.pow(newPos.y - state.y, 2)
        );
        const requiredDistance = (state.size / 2) + (newPos.size / 2) + minPixelDistance;
        return distance >= requiredDistance;
      });
    };

    const initialStates: IconState[] = [];

    icons.forEach((icon) => {
      let attempts = 0;
      let state: IconState | null = null;

      while (attempts < 100) {
        const isLeft = Math.random() > 0.5;
        const edgeZone = Math.random() > 0.5;
        const horizontalPercent = edgeZone 
          ? Math.random() * 20
          : Math.random() * 20 + 80;
        
        const topZone = Math.random() > 0.5;
        const verticalPercent = topZone
          ? Math.random() * 30
          : Math.random() * 40 + 60;
        
        const x = isLeft 
          ? (horizontalPercent / 100) * viewportWidth
          : viewportWidth - (horizontalPercent / 100) * viewportWidth;
        const y = (verticalPercent / 100) * viewportHeight;
        const size = (Math.random() * 6 + 10) * 4;
        
        if (isValidPosition({ x, y, size }, initialStates)) {
          state = {
            x,
            y,
            size,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            vSize: (Math.random() - 0.5) * 0.05,
            targetX: x,
            targetY: y,
            targetSize: size,
            parallaxSpeed: icon.parallaxSpeed,
          };
          break;
        }
        attempts++;
      }

      if (!state) {
        const x = Math.random() * viewportWidth;
        const y = Math.random() * viewportHeight;
        const size = (Math.random() * 6 + 10) * 4;
        state = {
          x,
          y,
          size,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          vSize: (Math.random() - 0.5) * 0.05,
          targetX: x,
          targetY: y,
          targetSize: size,
          parallaxSpeed: icon.parallaxSpeed,
        };
      }

      initialStates.push(state);
    });

    iconStatesRef.current = initialStates;
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY + window.scrollY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      iconStatesRef.current = iconStatesRef.current.map(state => {
        const dx = mousePos.x - state.x;
        const dy = mousePos.y - state.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let newVx = state.vx;
        let newVy = state.vy;
        
        // Mouse repulsion
        if (distance < 32 && distance > 0) {
          const force = (32 - distance) / 32;
          const angle = Math.atan2(dy, dx);
          newVx -= Math.cos(angle) * force * 2;
          newVy -= Math.sin(angle) * force * 2;
        }
        
        // Update target position for meandering
        if (Math.random() < 0.01) {
          state.targetX = state.x + (Math.random() - 0.5) * 100;
          state.targetY = state.y + (Math.random() - 0.5) * 100;
        }
        
        // Update target size for meandering
        if (Math.random() < 0.01) {
          state.targetSize = state.size + (Math.random() - 0.5) * 16;
          state.targetSize = Math.max(40, Math.min(64, state.targetSize));
        }
        
        // Move towards target with damping
        const toTargetX = state.targetX - state.x;
        const toTargetY = state.targetY - state.y;
        newVx += toTargetX * 0.001;
        newVy += toTargetY * 0.001;
        
        // Size velocity
        const toTargetSize = state.targetSize - state.size;
        let newVSize = state.vSize + toTargetSize * 0.001;
        
        // Apply damping
        newVx *= 0.95;
        newVy *= 0.95;
        newVSize *= 0.95;
        
        // Update position and size
        let newX = state.x + newVx;
        let newY = state.y + newVy;
        let newSize = state.size + newVSize;
        
        // Keep within bounds
        const margin = 100;
        if (newX < -margin) newX = window.innerWidth + margin;
        if (newX > window.innerWidth + margin) newX = -margin;
        if (newY < -margin) newY = window.innerHeight + margin;
        if (newY > window.innerHeight + margin) newY = -margin;
        
        newSize = Math.max(40, Math.min(64, newSize));
        
        return {
          ...state,
          x: newX,
          y: newY,
          size: newSize,
          vx: newVx,
          vy: newVy,
          vSize: newVSize,
        };
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos]);


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 gradient-primary opacity-10 will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
        }}
      />
      
      {/* Floating icons - meandering with mouse repulsion */}
      {iconStatesRef.current.length > 0 && (
        <>
          {[Star, Sparkles, Video, Music, Play, Film, Zap, Radio, Heart, BookOpen, Tag].map((Icon, i) => {
            const state = iconStatesRef.current[i];
            if (!state) return null;
            
            const colors = ['text-primary', 'text-secondary', 'text-accent'];
            const colorClass = colors[i % colors.length];
            
            return (
              <div
                key={i}
                className="absolute opacity-20 hidden lg:block will-change-transform pointer-events-none transition-all duration-100"
                style={{
                  left: `${state.x}px`,
                  top: `${state.y - scrollY * state.parallaxSpeed}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Icon 
                  className={`${colorClass} animate-pulse`} 
                  style={{ 
                    width: `${state.size}px`, 
                    height: `${state.size}px` 
                  }} 
                />
              </div>
            );
          })}
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
