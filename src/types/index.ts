export interface AppContextType {
  isConversationMode: boolean;
  setConversationMode: (isActive: boolean) => void;
}

export interface WelcomeScreenProps {
  onStartConversation: () => void;
}

export interface ConversationModeProps {
  isActive: boolean;
}

export interface AvatarCanvasProps {
  isActive: boolean;
}

export interface ConversationPanelProps {
  isActive: boolean;
}