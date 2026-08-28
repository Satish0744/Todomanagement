import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  variant = 'default',
  text = '',
  className = '',
  fullScreen = false,
  overlay = false
}) => {
  const sizes = {
    sm: {
      spinner: 'w-5 h-5',
      text: 'text-sm',
      gap: 'gap-2'
    },
    md: {
      spinner: 'w-10 h-10',
      text: 'text-base',
      gap: 'gap-3'
    },
    lg: {
      spinner: 'w-16 h-16',
      text: 'text-lg',
      gap: 'gap-4'
    },
    xl: {
      spinner: 'w-24 h-24',
      text: 'text-xl',
      gap: 'gap-5'
    }
  };

  const colors = {
    primary: {
      light: 'border-blue-200',
      main: 'border-t-blue-600',
      text: 'text-blue-600'
    },
    secondary: {
      light: 'border-purple-200',
      main: 'border-t-purple-600',
      text: 'text-purple-600'
    },
    success: {
      light: 'border-green-200',
      main: 'border-t-green-600',
      text: 'text-green-600'
    },
    danger: {
      light: 'border-red-200',
      main: 'border-t-red-600',
      text: 'text-red-600'
    },
    warning: {
      light: 'border-yellow-200',
      main: 'border-t-yellow-600',
      text: 'text-yellow-600'
    },
    white: {
      light: 'border-white/20',
      main: 'border-t-white',
      text: 'text-white'
    },
    gray: {
      light: 'border-gray-200',
      main: 'border-t-gray-600',
      text: 'text-gray-600'
    }
  };

  const variants = {
    default: '',
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    beat: 'animate-[beat_1s_ease-in-out_infinite]'
  };

  const getSpinnerVariant = () => {
    switch (variant) {
      case 'pulse':
        return (
          <div className="relative">
            <div className={`${sizes[size].spinner} rounded-full border-4 ${colors[color].light} border-t-transparent animate-spin`}></div>
            <div className={`absolute inset-0 ${sizes[size].spinner} rounded-full border-4 ${colors[color].light} opacity-30 animate-ping`}></div>
          </div>
        );
      case 'bounce':
        return (
          <div className="flex gap-2">
            {[0, 0.15, 0.3].map((delay, index) => (
              <div
                key={index}
                className={`${parseInt(size) <= 2 ? 'w-2 h-2' : parseInt(size) <= 4 ? 'w-3 h-3' : 'w-4 h-4'} rounded-full ${colors[color].main.replace('border-t-', 'bg-')}`}
                style={{
                  animation: `bounce 1.4s ease-in-out infinite`,
                  animationDelay: `${delay}s`
                }}
              />
            ))}
          </div>
        );
      case 'beat':
        return (
          <div className="relative">
            <div className={`${sizes[size].spinner} rounded-full ${colors[color].main.replace('border-t-', 'bg-')} opacity-20`}></div>
            <div className={`absolute inset-0 ${sizes[size].spinner} rounded-full ${colors[color].main.replace('border-t-', 'bg-')} opacity-40 scale-75 animate-[ping_1.5s_ease-in-out_infinite]`}></div>
            <div className={`absolute inset-0 ${sizes[size].spinner} rounded-full ${colors[color].main.replace('border-t-', 'bg-')} opacity-60 scale-50 animate-[ping_1.5s_ease-in-out_infinite_0.5s]`}></div>
          </div>
        );
      default:
        return (
          <div className="relative">
            {/* Outer ring with gradient */}
            <div className={`${sizes[size].spinner} rounded-full border-4 ${colors[color].light} border-t-transparent animate-spin`}></div>
            {/* Inner ring for depth */}
            <div className={`absolute inset-0 ${sizes[size].spinner} rounded-full border-4 ${colors[color].light} border-b-transparent animate-spin`} style={{ animationDuration: '1.5s' }}></div>
            {/* Glow effect */}
            <div className={`absolute -inset-1 ${sizes[size].spinner} rounded-full blur-sm ${colors[color].main.replace('border-t-', 'bg-').replace('text-', 'bg-')} opacity-20 animate-pulse`}></div>
          </div>
        );
    }
  };

  const SpinnerContent = () => (
    <div className={`flex flex-col items-center ${sizes[size].gap}`}>
      {getSpinnerVariant()}
      {text && (
        <div className={`${sizes[size].text} font-medium ${colors[color].text} animate-pulse`}>
          {text}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <SpinnerContent />
      </div>
    );
  }

  if (overlay) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-lg z-10 ${className}`}>
        <SpinnerContent />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <SpinnerContent />
    </div>
  );
};

// Add custom CSS animations to index.css
// You'll need to add these animations to your index.css file

export default LoadingSpinner;