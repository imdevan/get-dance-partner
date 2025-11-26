import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes, ReactNode, useRef, useState } from "react";

interface DirectionalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

const DirectionalButton = ({ 
  children, 
  size = "lg", 
  variant = "default",
  className = "",
  ...props 
}: DirectionalButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [gradientStyle, setGradientStyle] = useState<React.CSSProperties>({});

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate angle from entry point to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    
    // Create gradient based on entry direction
    setGradientStyle({
      background: `linear-gradient(${angle}deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.9) 100%)`,
      transition: 'background 0.3s ease',
    });
  };

  const handleMouseLeave = () => {
    setGradientStyle({
      background: '',
      transition: 'background 0.3s ease',
    });
  };

  return (
    <Button
      ref={buttonRef}
      size={size}
      variant={variant}
      className={className}
      style={gradientStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Button>
  );
};

export default DirectionalButton;
