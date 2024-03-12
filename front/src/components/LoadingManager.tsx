import React, { createContext, useContext, useState, ReactNode, FunctionComponent } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  handleLoading: (val?: boolean) => void;
  handleLoadingTimer: (timer?: number, callback?: () => void) => void;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('Cannot find LoadingContext');
  }
  return context;
};

interface LoadingManagerProps {
  children: ReactNode;
}

const LoadingManager: FunctionComponent<LoadingManagerProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoading = (val: boolean = true) => {
    setIsLoading(val);
  };

  const handleLoadingTimer = (timer: number = 3000, callback: (() => void) | null = null) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (callback) {
        callback();
      }
    }, timer);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, handleLoading, handleLoadingTimer }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingManager;
