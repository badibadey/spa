import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { ConversationPanelProps } from '../types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-id': string;
          'enable-live-transcription'?: boolean;
          'on-message'?: string;
          'on-transcription'?: string;
        },
        HTMLElement
      >;
    }
  }
}

const ConversationPanel: React.FC<ConversationPanelProps> = ({ isActive }) => {
  const widgetRef = useRef<HTMLElement>(null);
  const [userTranscript, setUserTranscript] = useState('');
  const [botTranscript, setBotTranscript] = useState('');

  useEffect(() => {
    if (isActive) {
      const messageHandler = (e: any) => {
        setBotTranscript(e.detail.text);
      };

      const transcriptionHandler = (e: any) => {
        setUserTranscript(e.detail.text);
      };

      window.addEventListener('elevenlabs-convai:message', messageHandler);
      window.addEventListener('elevenlabs-convai:transcription', transcriptionHandler);

      return () => {
        window.removeEventListener('elevenlabs-convai:message', messageHandler);
        window.removeEventListener('elevenlabs-convai:transcription', transcriptionHandler);
      };
    }
  }, [isActive]);

  return (
    <div className="w-full h-full p-4 pb-6 flex flex-col">
      <h2 className="text-2xl font-medium text-spa-secondary mb-3 pl-2">
        Rozmowa z asystentem
      </h2>
      
      {isActive ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex-1 bg-spa-light rounded-2xl shadow-soft p-4 overflow-hidden"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div 
              className="relative"
              style={{
                width: '500px',
                height: '375px'
              }}
            >
              <elevenlabs-convai 
                ref={widgetRef}
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
        </motion.div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "linear" 
            }}
          >
            <Loader size={36} className="text-spa-primary opacity-70" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ConversationPanel;