import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  Volume2,
  Settings,
  Phone,
  Mail
} from 'lucide-react';
import { useLanguage } from '../../providers/LanguageProvider';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const quickActions: QuickAction[] = [
    {
      id: 'courses',
      label: 'View Courses',
      icon: <MessageCircle className="w-4 h-4" />,
      action: 'I want to see available courses'
    },
    {
      id: 'schedule',
      label: 'Book a Lesson',
      icon: <Phone className="w-4 h-4" />,
      action: 'I want to book a lesson'
    },
    {
      id: 'contact',
      label: 'Contact Support',
      icon: <Mail className="w-4 h-4" />,
      action: 'I need help from support'
    },
  ];

  const botResponses = {
    greeting: "Hello! 👋 I'm your Speakyz learning assistant. How can I help you today?",
    courses: "We have amazing English courses for all levels! 📚\n\n• Beginner (A1-A2)\n• Intermediate (B1-B2)\n• Advanced (C1-C2)\n• Business English\n• Conversation Practice\n\nWhich level interests you most?",
    schedule: "I'd be happy to help you book a lesson! 📅\n\nOur teachers are available:\n• Monday-Friday: 8 AM - 10 PM\n• Saturday-Sunday: 10 AM - 8 PM\n\nWould you like me to show you available time slots?",
    contact: "Our support team is here to help! 💬\n\n📧 Email: support@speakyz.com\n📞 Phone: +1 (555) 123-4567\n💬 Live Chat: Available 24/7\n\nYou can also continue chatting with me for quick questions!",
    default: "I understand you're interested in learning with Speakyz! 🌟\n\nI can help you with:\n• Course information\n• Scheduling lessons\n• Contact support\n• General questions\n\nWhat would you like to know more about?"
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(botResponses.greeting);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (content: string, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      const message: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, message]);
      setIsTyping(false);
      if (!isOpen) {
        setHasNewMessage(true);
      }
    }, delay);
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addUserMessage(userMessage);
    setInputValue('');

    // Simple response logic
    let response = botResponses.default;
    if (userMessage.toLowerCase().includes('course') || userMessage.toLowerCase().includes('learn')) {
      response = botResponses.courses;
    } else if (userMessage.toLowerCase().includes('book') || userMessage.toLowerCase().includes('schedule')) {
      response = botResponses.schedule;
    } else if (userMessage.toLowerCase().includes('contact') || userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('support')) {
      response = botResponses.contact;
    }

    addBotMessage(response);
  };

  const handleQuickAction = (action: string) => {
    addUserMessage(action);
    
    let response = botResponses.default;
    if (action.includes('courses')) {
      response = botResponses.courses;
    } else if (action.includes('book')) {
      response = botResponses.schedule;
    } else if (action.includes('support')) {
      response = botResponses.contact;
    }

    addBotMessage(response);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className={`
          fixed bottom-8 left-8 z-50 w-14 h-14 rounded-full shadow-lg
          flex items-center justify-center transition-all duration-300
          ${isOpen 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-red-500/25' 
            : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-primary-500/25'
          }
          hover:shadow-xl backdrop-blur-sm border border-white/20
        `}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              {hasNewMessage && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`
              fixed bottom-24 left-8 z-50 w-96 h-[500px] 
              bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
              rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20
              flex flex-col overflow-hidden
              ${isMinimized ? 'h-16' : 'h-[500px]'}
              transition-all duration-300
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/20 dark:border-gray-700/20 bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Speakyz Assistant
                  </h3>
                  <p className="text-xs text-green-500 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <Minimize2 className="w-4 h-4 text-gray-500" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleChat}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </motion.button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-xs ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                          ${message.type === 'user' 
                            ? 'bg-gradient-to-br from-primary-500 to-secondary-500' 
                            : 'bg-gradient-to-br from-gray-500 to-gray-600'
                          }
                        `}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className={`
                          px-3 py-2 rounded-2xl max-w-full
                          ${message.type === 'user'
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-br-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md'
                          }
                        `}>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <p className={`text-xs mt-1 opacity-70 ${message.type === 'user' ? 'text-white' : 'text-gray-500'}`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-2xl rounded-bl-md">
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2">
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action) => (
                        <motion.button
                          key={action.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleQuickAction(action.action)}
                          className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm transition-colors duration-200"
                        >
                          {action.icon}
                          <span>{action.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-gray-200/20 dark:border-gray-700/20">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;