import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';

export enum AnimationType {
  FadeIn = 'fade-in',
  FadeOut = 'fade-out',
  FadeLeft = 'fade-left',
  FadeRight = 'fade-right',
  FadeUp = 'fade-up',
  FadeDown = 'fade-down',
}

interface FadeInContextProps {
  animation: AnimationType;
  duration: number;
}

const FadeInContext = createContext<FadeInContextProps | undefined>(undefined);

export const useFadeInContext = () => {
  const context = useContext(FadeInContext);
  if (!context) {
    throw new Error('useFadeInContext must be used within a FadeInContext');
  }
  return context;
};

interface FadeInContextProviderProps {
  children: React.ReactNode;
  animation: AnimationType;
  duration: number;
}

export const FadeInContextProvider: React.FC<FadeInContextProviderProps> = ({
  children,
  animation,
  duration,
}) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const value = useMemo(() => ({ animation, duration }), [animation, duration]);

  const getOpacity = () => (fadeIn ? 1 : 0);
  const getTransform = () => {
    if (animation === AnimationType.FadeLeft) return 'translateX(-50%)';
    if (animation === AnimationType.FadeRight) return 'translateX(50%)';
    if (animation === AnimationType.FadeUp) return 'translateY(-50%)';
    if (animation === AnimationType.FadeDown) return 'translateY(50%)';
    return 'none';
  };

  const keyframes = `
      @keyframes fadeAnimation {
        from {
          opacity: 0;
          transform: ${getTransform()};
        }
        to {
          opacity: 1;
          transform: translate(0, 0);
        }
      }
    `;

  const animationStyles = {
    opacity: getOpacity(),
    transform: 'none',
    animation: `fadeAnimation ${duration}s ease-in`,
  };

  return (
    <FadeInContext.Provider value={value}>
      <style>{keyframes}</style>
      <div style={animationStyles}>{children}</div>
    </FadeInContext.Provider>
  );
};
