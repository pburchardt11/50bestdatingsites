const ADSENSE_ENABLED = false;

interface AdUnitProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

export default function AdUnit({ format = 'horizontal', className = '' }: AdUnitProps) {
  if (ADSENSE_ENABLED) {
    return (
      <div className={`ad-unit ${className}`}>
        {/* Google AdSense code would go here */}
      </div>
    );
  }

  const sizeClasses = {
    horizontal: 'h-24',
    rectangle: 'h-64',
    vertical: 'h-[600px] w-[160px]',
  };

  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-card-border bg-card-bg/50 text-xs text-text/20 ${sizeClasses[format]} ${className}`}
    >
      Ad Space
    </div>
  );
}
