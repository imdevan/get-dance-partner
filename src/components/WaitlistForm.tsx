import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WaitlistFormProps {
  showWaitlist: boolean;
  setShowWaitlist: (show: boolean) => void;
  isAnimatingOut: boolean;
  email: string;
  setEmail: (email: string) => void;
  formRef: React.RefObject<HTMLFormElement>;
  handleWaitlistSubmit: (e: React.FormEvent) => void;
  buttonText?: string;
  showLearnMore?: boolean;
}

const WaitlistForm = ({
  showWaitlist,
  setShowWaitlist,
  isAnimatingOut,
  email,
  setEmail,
  formRef,
  handleWaitlistSubmit,
  buttonText = "Join the Waitlist",
  showLearnMore = true,
}: WaitlistFormProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col gap-4 justify-center items-center pt-8 min-h-[88px]">
      {!showWaitlist ? (
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-up">
          <Button 
            size="lg" 
            className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
            onClick={() => setShowWaitlist(true)}
          >
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:animate-arrow-refresh" />
          </Button>
          
          {showLearnMore && (
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-lg rounded-full border-2 hover:bg-primary/5 hover:text-foreground transition-all hover:scale-105"
              onClick={() => navigate('/learn-more')}
            >
              Learn More
            </Button>
          )}
        </div>
      ) : (
        <form 
          ref={formRef}
          onSubmit={handleWaitlistSubmit} 
          className={`flex flex-col sm:flex-row gap-3 w-full max-w-md ${
            isAnimatingOut ? 'animate-slide-out-down' : 'animate-slide-in-up'
          }`}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 px-6 rounded-full border-2"
            autoFocus
          />
          <Button 
            type="submit"
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-full whitespace-nowrap"
          >
            Join
          </Button>
        </form>
      )}
    </div>
  );
};

export default WaitlistForm;
