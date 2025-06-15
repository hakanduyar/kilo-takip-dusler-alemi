
import { cn } from "@/lib/utils"

interface EnhancedSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'text' | 'circle' | 'button';
  lines?: number;
  width?: string;
  height?: string;
}

function EnhancedSkeleton({
  className,
  variant = 'default',
  lines = 1,
  width,
  height,
  ...props
}: EnhancedSkeletonProps) {
  const baseClasses = "animate-shimmer bg-gray-200 rounded";
  
  const variantClasses = {
    default: "h-4 w-full",
    card: "h-32 w-full rounded-xl",
    text: "h-4 w-3/4",
    circle: "h-12 w-12 rounded-full",
    button: "h-10 w-24 rounded-lg"
  };

  const skeletonClasses = cn(
    baseClasses,
    variantClasses[variant],
    className
  );

  const style = {
    ...(width && { width }),
    ...(height && { height })
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2" {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              skeletonClasses,
              index === lines - 1 && "w-1/2" // Last line is shorter
            )}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={skeletonClasses}
      style={style}
      {...props}
    />
  );
}

export { EnhancedSkeleton };
