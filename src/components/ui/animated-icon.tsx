
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  animation?: 'pulse' | 'bounce' | 'spin' | 'float' | 'glow';
  size?: number;
  color?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon: Icon,
  className,
  animation = 'float',
  size = 24,
  color = 'currentColor'
}) => {
  const animationClasses = {
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    spin: 'animate-spin',
    float: 'floating-animation',
    glow: 'pulse-glow'
  };

  return (
    <div className={cn(
      'inline-flex items-center justify-center',
      animationClasses[animation],
      className
    )}>
      <Icon size={size} color={color} />
    </div>
  );
};

export default AnimatedIcon;
