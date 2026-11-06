'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ onTranscript, className = '' }) => {
  const { language, t } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setIsSupported(true);
    }
  }, []);

  const toggleListening = () => {
    if (!isSupported) {
      alert(language === 'mr' ? 'तुमच्या ब्राउझरमध्ये व्हॉइस इनपुट समर्थित नाही.' : 'Voice recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    // Set voice language according to active selected language
    if (language === 'mr') {
      recognition.lang = 'mr-IN';
    } else if (language === 'hi') {
      recognition.lang = 'hi-IN';
    } else {
      recognition.lang = 'en-IN';
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        onTranscript(transcript);
      }
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`p-2.5 rounded-full transition-all duration-200 flex items-center justify-center ${
        isListening 
          ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-200' 
          : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
      } ${className}`}
      title={isListening ? t('ai.voice_stop') : t('ai.voice_start')}
    >
      {isListening ? (
        <MicOff className="w-5 h-5 animate-bounce" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  );
};
