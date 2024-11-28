'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { current: number, limit: number; }
>(({ className, value, current, limit, ...props }, ref) => {
  const percentage = (current / limit) * 100;
  let indicatorColor = 'bg-primary';

  if (percentage >= 90) {
    indicatorColor = 'bg-red-500';
  } else if (percentage >= 70) {
    indicatorColor = 'bg-orange-500';
  }

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm">
        <span>{current}</span>
        <span>{limit}</span>
      </div>
      <div className="relative w-full">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(
            "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
            className
          )}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn("h-full flex-1 transition-all", indicatorColor)}
            style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
          />
          <span
            className="absolute top-0 left-0 h-full flex items-center justify-center text-xs text-white"
            style={{ transform: `translateX(${(value ?? 0)}%)` }}
          >
          </span>
        </ProgressPrimitive.Root>
      </div>
    </div>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };