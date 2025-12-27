import { useState, useEffect } from "react";

interface ValueProp {
  icon: string;
  title: string;
  description: string;
  bgColor: "primary" | "secondary" | "accent";
}

const valueProps: ValueProp[] = [
  {
    icon: "👀",
    title: "Actually use Your Recaps",
    description: "Have a reason to revisit your recaps. <br/><br/>🌟 Be that person who is actually excited volunteer show off last weeks material. ",
    bgColor: "accent",
  },
  {
    icon: "📚",
    title: "Build Your Dance Vocabulary",
    description: "Using intentional titling, tagging, and notes you can build a dance vocabulary that will allow you accelerate your dance education.",
    bgColor: "secondary",
  },
  {
    icon: "💃🏻",
    title: "Made By Dancers",
    description: "Made by people with a passion for partner dancer who were tired of sitting on a pile of dance recaps that never got watched. I plan to work closely with my users to ensure they are getting a valuable experience.",
    bgColor: "primary",
  },
] as const;

const AppPreview = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

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

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Designed for{" "}
            <span className="bg-gradient-to-r from-secondary via-secondary/80 to-accent bg-clip-text text-transparent selection:bg-secondary/20 selection:text-secondary">
              Dancers
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A beautiful, intuitive interface that gets out of your way and lets you focus
            on what matters: improving your craft.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div
            className="space-y-6 md:-mt-8"
            style={{
              transform: isMobile ? 'none' : `translate3d(0, ${(scrollY - 1000) * 0.1}px, 0)`,
              willChange: isMobile ? 'auto' : 'transform',
            }}
          >
            {valueProps.map((prop, index) => {
              const bgColorClass = {
                primary: "bg-primary/10",
                secondary: "bg-secondary/10",
                accent: "bg-accent/10",
              }[prop.bgColor];

              return (
                <div key={index} className="space-y-3">
                  <div className={`w-12 h-12 rounded-full ${bgColorClass} flex items-center justify-center`}>
                    <span className="text-2xl">{prop.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{prop.title}</h3>
                  <p
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: prop.description }}
                  />
                </div>
              );
            })}
          </div>

          <div
            className="relative group md:mt-24"
            style={{
              transform: isMobile ? 'none' : `translate3d(0, ${(scrollY - 1000) * -0.1}px, 0)`,
              willChange: isMobile ? 'auto' : 'transform',
            }}
          >
            <div className="absolute -inset-4 gradient-primary opacity-20 rounded-3xl blur-2xl group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-card border-2 rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src="https://devan.gg/dance-partner-rough-rough-cut/"
                title="Dance Partner App Preview"
                className="w-full h-[600px] md:h-[800px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
