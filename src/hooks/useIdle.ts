import { useEffect, useState, useCallback } from 'react';

interface UseIdleOptions {
  timeout?: number;
  onIdle?: () => void;
  onActive?: () => void;
}

export const useIdle = ({
  timeout = 60000, // 1 minute by default
  onIdle,
  onActive,
}: UseIdleOptions = {}): boolean => {
  const [isIdle, setIsIdle] = useState(false);

  const handleUserActivity = useCallback(() => {
    if (isIdle) {
      setIsIdle(false);
      onActive?.();
    }
    
    // Reset the idle timer
    resetIdleTimer();
  }, [isIdle, onActive]);

  let idleTimer: number | undefined;

  const resetIdleTimer = useCallback(() => {
    if (idleTimer) {
      window.clearTimeout(idleTimer);
    }
    
    idleTimer = window.setTimeout(() => {
      setIsIdle(true);
      onIdle?.();
    }, timeout);
  }, [timeout, onIdle]);

  useEffect(() => {
    // Set up activity listeners
    const events = [
      'mousedown', 'mousemove', 'keydown',
      'touchstart', 'touchmove', 'click'
    ];
    
    // Start the initial timer
    resetIdleTimer();
    
    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });
    
    // Clean up
    return () => {
      if (idleTimer) {
        window.clearTimeout(idleTimer);
      }
      
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [handleUserActivity, resetIdleTimer]);
  
  return isIdle;
};