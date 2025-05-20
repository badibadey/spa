import React, { useEffect } from 'react';
import { useAppContext } from './context/AppContext';
import WelcomeScreen from './components/WelcomeScreen';
import ConversationMode from './components/ConversationMode';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { isConversationMode, setConversationMode } = useAppContext();

  // Handle fullscreen mode
  useEffect(() => {
    const handleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((e) => {
          console.log(`Error attempting to enable fullscreen: ${e.message}`);
        });
      }
    };

    // Prevent scrolling and zooming
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Try to enter fullscreen on user interaction
    const handleUserInteraction = () => {
      if (!document.fullscreenElement) {
        handleFullscreen();
      }
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {!isConversationMode ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <WelcomeScreen onStartConversation={() => setConversationMode(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="conversation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <ConversationMode isActive={isConversationMode} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;