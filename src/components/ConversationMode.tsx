import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { ConversationModeProps } from '../types';
import AvatarCanvas from './AvatarCanvas';
import { useAppContext } from '../context/AppContext';

const ConversationMode: React.FC<ConversationModeProps> = ({ isActive }) => {
  const { setConversationMode } = useAppContext();

  return (
    <div className="h-full w-full bg-spa-background relative overflow-hidden">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        onClick={() => setConversationMode(false)}
        className="absolute top-6 left-6 p-3 bg-white rounded-full shadow-soft z-50 focus-visible"
        aria-label="Powrót do ekranu powitalnego"
      >
        <ArrowLeft size={24} className="text-spa-secondary" />
      </motion.button>

      <div className="h-full w-full flex items-center justify-center">
        <div style={{ width: '500px', height: '375px', position: 'relative' }}>
          <elevenlabs-convai 
            agent-id="agent_01jvf1xc5hecyvgym7df2g6akp"
            enable-live-transcription={true}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConversationMode;