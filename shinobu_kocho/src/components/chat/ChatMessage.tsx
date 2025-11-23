
'use client';

import { motion } from 'framer-motion';
import type { Message } from '../../lib/chat';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
    message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
        >
            <div
                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: isUser ? '#A892D4' : '#F5F5F5' }}
            >
                {isUser ? (
                    <User className="w-5 h-5 text-white" />
                ) : (
                    <Bot className="w-5 h-5" style={{ color: '#6B6B6B' }} />
                )}
            </div>

            <div
                className={`flex-1 max-w-[75%] rounded-2xl px-4 py-3 ${isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'
                    }`}
                style={{
                    backgroundColor: isUser ? '#C8B7E8' : '#F5F5F5',
                    color: isUser ? '#FFFFFF' : '#1A1A1A',
                }}
            >
                <p className="text-base leading-relaxed whitespace-pre-wrap wrap-break-word">
                    {message.content}
                </p>
                <p
                    className="text-xs mt-2 opacity-70"
                    style={{ color: isUser ? '#FFFFFF' : '#6B6B6B' }}
                >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>
        </motion.div>
    );
}
