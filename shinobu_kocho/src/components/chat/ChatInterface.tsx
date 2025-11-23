
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Settings, LogOut } from 'lucide-react';
import { chatService } from '../../lib/chat';
import type { Message } from '../../lib/chat';
import { settingsService } from '../../lib/settings';
import { generateAIResponse } from '../../lib/ai-response';
import type { User } from '../../lib/auth';
import ChatMessage from './ChatMessage';

interface ChatInterfaceProps {
    user: User;
    onLogout: () => void;
    onOpenSettings: () => void;
}

export default function ChatInterface({ user, onLogout, onOpenSettings }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadedMessages = chatService.getMessages(user.id);
        setMessages(loadedMessages);
    }, [user.id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue.trim(),
            timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, userMessage]);
        chatService.addMessage(user.id, userMessage);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const personality = settingsService.getSettings(user.id);
            const aiResponse = generateAIResponse(userMessage.content, personality);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date().toISOString(),
            };

            setMessages(prev => [...prev, assistantMessage]);
            chatService.addMessage(user.id, assistantMessage);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: '#E5E5E5' }}
            >
                <div>
                    <h1 className="text-xl font-bold" style={{ color: '#1A1A1A' }}>
                        Shinobu Kocho
                    </h1>
                    <p className="text-sm" style={{ color: '#6B6B6B' }}>
                        Hello, {user.name}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onOpenSettings}
                        className="hover:bg-gray-100"
                    >
                        <Settings className="w-5 h-5" style={{ color: '#6B6B6B' }} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onLogout}
                        className="hover:bg-gray-100"
                    >
                        <LogOut className="w-5 h-5" style={{ color: '#6B6B6B' }} />
                    </Button>
                </div>
            </motion.header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
                {messages.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-full text-center"
                    >
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                            style={{ backgroundColor: '#F5F5F5' }}
                        >
                            <Send className="w-10 h-10" style={{ color: '#C8B7E8' }} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
                            Start a Conversation
                        </h2>
                        <p className="text-base max-w-md" style={{ color: '#6B6B6B' }}>
                            Send a message to begin chatting with your AI assistant. I'm here to help!
                        </p>
                    </motion.div>
                ) : (
                    <>
                        {messages.map(message => (
                            <ChatMessage key={message.id} message={message} />
                        ))}
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-3 mb-4"
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: '#F5F5F5' }}
                                >
                                    <div className="flex gap-1">
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ backgroundColor: '#6B6B6B' }}
                                        />
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ backgroundColor: '#6B6B6B' }}
                                        />
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ backgroundColor: '#6B6B6B' }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-4 border-t"
                style={{ borderColor: '#E5E5E5' }}
            >
                <div className="flex gap-3 max-w-4xl mx-auto">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 h-12 text-base"
                        style={{ borderColor: '#E5E5E5' }}
                        disabled={isTyping}
                    />
                    <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="h-12 px-6 text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: '#C8B7E8' }}
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
