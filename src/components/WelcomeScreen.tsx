import React from 'react';
import { motion } from 'framer-motion';
import { WelcomeScreenProps } from '../types';
import Avatar from './Avatar';

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

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartConversation }) => {
  return (
    <div className="gradient-bg h-full w-full flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1 
          className="text-5xl font-light text-spa-secondary mb-8"
          aria-label="Witamy w naszym SPA"
        >
          Witamy w naszym SPA
        </h1>
        
        <p className="text-xl text-spa-dark mb-12 max-w-3xl mx-auto">
          Odkryj świat relaksu i odprężenia. Nasz wirtualny asystent pomoże Ci 
          wybrać idealny zabieg dostosowany do Twoich potrzeb lub umówi wizytę w naszym salonie.
        </p>
      </motion.div>

      <Avatar />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="w-full max-w-md mx-auto mt-8"
        style={{ height: '375px' }}
      >
        <elevenlabs-convai 
          agent-id="agent_01jvf1xc5hecyvgym7df2g6akp"
          enable-live-transcription={true}
          style={{
            width: '500px',
            height: '375px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onLoad={() => onStartConversation()}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 text-spa-secondary text-sm"
      >
        Kliknij porozmawiaj aby kontynuować.
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;