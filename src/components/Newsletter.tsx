import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email must be less than 255 characters" }),
});

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse({ email });
    
    if (!result.success) {
      toast({
        title: "Invalid email",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("https://dp-signup.huapayadevan.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: result.data.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit email");
      }

      toast({
        title: "You're on the list! 🎉",
        description: "We'll keep you updated on our launch progress.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-secondary opacity-5" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-card border-2 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Be the First to Know
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our waitlist and get early access when we launch. Plus exclusive tips on 
              maximizing your dance practice.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 px-6 rounded-full border-2"
              />
              <Button 
                type="submit"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-full whitespace-nowrap transition-all hover:scale-105"
              >
                Join Waitlist
              </Button>
            </form>

            <p className="text-sm text-muted-foreground">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
