import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email must be less than 255 characters" }),
});

export const useWaitlist = () => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node) && showWaitlist && !isAnimatingOut) {
        handleCloseWaitlist();
      }
    };

    if (showWaitlist) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showWaitlist, isAnimatingOut]);

  const handleCloseWaitlist = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setShowWaitlist(false);
      setIsAnimatingOut(false);
      setEmail("");
    }, 300);
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
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
        title: "You're on the waitlist! 🎉",
        description: "We'll notify you when Dance Partner launches.",
      });
      
      handleCloseWaitlist();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return {
    showWaitlist,
    setShowWaitlist,
    isAnimatingOut,
    email,
    setEmail,
    formRef,
    handleWaitlistSubmit,
  };
};
