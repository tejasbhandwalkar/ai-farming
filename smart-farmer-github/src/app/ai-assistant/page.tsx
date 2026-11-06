'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { useTranslation } from '@/context/LanguageContext';
import { VoiceInputButton } from '@/components/VoiceInputButton';
import { 
  Bot, 
  Send, 
  Upload, 
  Volume2, 
  VolumeX, 
  Trash2, 
  AlertTriangle, 
  Sparkles, 
  Image as ImageIcon, 
  HelpCircle,
  CheckCircle2,
  X
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  hasImage?: boolean;
  imageUrl?: string;
}

export default function AiAssistantPage() {
  const { t, language } = useTranslation();

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const initialMessages: Message[] = [
    {
      id: 'msg-1',
      sender: 'assistant',
      text: language === 'mr'
        ? '🌾 नमस्कार शेतकरी बंधूंनो! मी आपला कृषी मित्र AI सहाय्यक आहे. आपण मला पिकांवरील रोग, खत नियोजन, हवामान किंवा बाजारभावाबाबत मराठीत प्रश्न विचारू शकता किंवा पानांचा फोटो पाठवून रोगाचे निदान करू शकता.'
        : language === 'hi'
        ? '🌾 नमस्ते किसान भाइयों! मैं आपका कृषि मित्र AI सहायक हूँ। आप मुझसे फसलों के रोग, खाद, मौसम या मंडी भाव के बारे में प्रश्न पूछ सकते हैं या पत्ती की फोटो भेजकर रोग निदान पा सकते हैं।'
        : '🌾 Welcome to Krishi Mitra AI! I am your smart agricultural assistant. Ask queries regarding plant health, fertilizers, weather advisories, or upload crop leaf photos for disease diagnosis.',
      timestamp: 'Just now'
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickQuestions = [
    'माझ्या सोयाबीनच्या पानांचा रंग पिवळा का होत आहे?',
    'कपास की फसल में पत्ते पीले क्यों हो रहे हैं?',
    'कांद्यामध्ये करपा रोगाचे नियंत्रण कसे करावे?',
    'How can I improve my crop yield?',
    'When should I irrigate my farm?'
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() && !selectedImage) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query || 'पानांचा फोटो तपासणीसाठी पाठवला आहे.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hasImage: Boolean(selectedImage),
      imageUrl: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    const currentImg = selectedImage;
    setSelectedImage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language,
          hasImage: Boolean(currentImg),
          history: messages.slice(-4).map(m => ({ role: m.sender, content: m.text }))
        })
      });

      if (!res.ok) throw new Error('AI response error');
      const data = await res.json();

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: language === 'mr'
            ? 'माफ करा, इंटरनेट संपर्क किंवा तांत्रिक कारणास्तव अडचण आली आहे. कृपया पुन्हा विचारून पहा.'
            : 'Error communicating with assistant. Please try again.',
          timestamp: 'Now'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Text-To-Speech function
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown asterisks and emojis for speech
    const clean = text.replace(/[*_#]/g, '').slice(0, 400);
    const utterance = new SpeechSynthesisUtterance(clean);

    if (language === 'mr') utterance.lang = 'mr-IN';
    else if (language === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-IN';

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Simulated leaf image capture
  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AppShell>
      <div className="space-y-4 max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)]">
        {/* Header */}
        <div className="bg-white p-4.5 rounded-3xl border border-emerald-100 shadow-xs flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-700/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-emerald-950">
                  {t('ai.title')}
                </h1>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-200 text-amber-900">
                  मराठी / हिन्दी / EN
                </span>
              </div>
              <p className="text-xs text-gray-500">
                कृषी शास्त्रज्ञ ज्ञानावर आधारित २४x७ कृषी सहाय्यक
              </p>
            </div>
          </div>

          <button
            onClick={() => setMessages(initialMessages)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 text-xs font-semibold"
            title="चॅट स्वच्छ करा"
          >
            <Trash2 className="w-3.5 h-3.5 text-gray-400" />
            <span className="hidden sm:inline">{t('ai.clear_chat')}</span>
          </button>
        </div>

        {/* Quick Question Prompts */}
        <div className="flex gap-2 overflow-x-auto pb-1 shrink-0 no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 whitespace-nowrap shadow-xs transition-colors shrink-0"
            >
              🌱 {q}
            </button>
          ))}
        </div>

        {/* Chat Message Scroll Window */}
        <div className="flex-1 bg-white rounded-3xl border border-emerald-100 shadow-xs p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                  🤖
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-xl rounded-3xl p-4.5 space-y-2 text-sm shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-tr-none'
                    : 'bg-[#f8faf5] text-gray-900 border border-emerald-100 rounded-tl-none'
                }`}
              >
                {msg.hasImage && msg.imageUrl && (
                  <div className="rounded-2xl overflow-hidden max-h-48 border border-black/10">
                    <img src={msg.imageUrl} alt="Uploaded leaf" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="whitespace-pre-line leading-relaxed text-sm">
                  {msg.text}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-black/5 text-[10px] opacity-70">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="p-1 rounded-lg hover:bg-black/10 transition-colors flex items-center gap-1"
                      title="ऐका (Listen Voice)"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>ऐका</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-xs font-semibold text-emerald-700 bg-emerald-50/70 p-3 rounded-2xl w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>कृषी मित्र विश्लेषण करत आहे...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Selected Image Preview before sending */}
        {selectedImage && (
          <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <img src={selectedImage} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-emerald-300" />
              <div>
                <span className="text-xs font-bold text-emerald-900 block">पानांचा फोटो जोडला आहे</span>
                <span className="text-[11px] text-emerald-700">रोगाचे निदान करण्यासाठी प्रश्न विचारा</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="p-1 text-gray-400 hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Mandatory Agronomy Safety Disclaimer (PROMPT REQUIREMENT) */}
        <div className="text-[11px] text-gray-500 bg-amber-50/70 border border-amber-200/80 px-3.5 py-2 rounded-2xl flex items-center gap-2 shrink-0">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t('ai.disclaimer')}</span>
        </div>

        {/* Input Bar with Voice & Image Upload */}
        <div className="bg-white p-3 rounded-3xl border border-emerald-100 shadow-sm flex items-center gap-2 shrink-0">
          {/* Leaf Photo Upload trigger */}
          <label className="p-2.5 rounded-full bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-800 cursor-pointer transition-colors" title={t('ai.upload_leaf_photo')}>
            <ImageIcon className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImagePick}
            />
          </label>

          {/* Voice Input Button (Web Speech API) */}
          <VoiceInputButton
            onTranscript={(text) => {
              setInputQuery(text);
              handleSend(text);
            }}
          />

          {/* Text Input */}
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={t('ai.ask_placeholder')}
            className="flex-1 px-3 py-2 text-sm bg-transparent border-0 focus:outline-hidden focus:ring-0 placeholder:text-gray-400"
          />

          {/* Send Button */}
          <button
            onClick={() => handleSend()}
            disabled={(!inputQuery.trim() && !selectedImage) || loading}
            className="p-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white disabled:opacity-50 transition-all shadow-sm shadow-emerald-700/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
