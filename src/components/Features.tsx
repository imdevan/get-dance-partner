import { Folder, Tag, Lightbulb, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const features = [
  {
    icon: Folder,
    title: "Smart Organization",
    description: "Automatically organize your dance videos by class, instructor, or style. Find any video in seconds.",
    gradient: "from-primary to-primary/50",
  },
  {
    icon: Tag,
    title: "Intelligent Tagging",
    description: "Tag moves, techniques, and fundamentals. Build your personal dance knowledge base effortlessly.",
    gradient: "from-secondary to-secondary/50",
  },
  {
    icon: Lightbulb,
    title: "Practice Suggestions",
    description: "Get smart recommendations on what to practice next based on your learning patterns.",
    gradient: "from-accent to-accent/50",
  },
  {
    icon: FileText,
    title: "Rich Annotations",
    description: "Add timestamped notes, highlights, and reminders directly on your videos.",
    gradient: "from-success to-success/50",
  },
];

const Features = () => {
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
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent selection:bg-primary/20 selection:text-primary">
              Excel
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop letting your dance videos collect digital dust. Turn them into your personal 
            practice powerhouse.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
