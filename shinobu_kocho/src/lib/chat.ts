
export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export interface ChatHistory {
    userId: string;
    messages: Message[];
}

const CHAT_HISTORY_KEY = 'ai_assistant_chat_history';

export const chatService = {
    getMessages: (userId: string): Message[] => {
        if (typeof window === 'undefined') return [];

        const historyStr = localStorage.getItem(CHAT_HISTORY_KEY);
        if (!historyStr) return [];

        try {
            const allHistory: ChatHistory[] = JSON.parse(historyStr);
            const userHistory = allHistory.find(h => h.userId === userId);
            return userHistory?.messages || [];
        } catch {
            return [];
        }
    },

    addMessage: (userId: string, message: Message): void => {
        if (typeof window === 'undefined') return;

        const historyStr = localStorage.getItem(CHAT_HISTORY_KEY);
        let allHistory: ChatHistory[] = [];

        try {
            allHistory = historyStr ? JSON.parse(historyStr) : [];
        } catch {
            allHistory = [];
        }

        const userHistoryIndex = allHistory.findIndex(h => h.userId === userId);

        if (userHistoryIndex >= 0) {
            allHistory[userHistoryIndex].messages.push(message);
        } else {
            allHistory.push({
                userId,
                messages: [message],
            });
        }

        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(allHistory));
    },

    clearMessages: (userId: string): void => {
        if (typeof window === 'undefined') return;

        const historyStr = localStorage.getItem(CHAT_HISTORY_KEY);
        if (!historyStr) return;

        try {
            const allHistory: ChatHistory[] = JSON.parse(historyStr);
            const filtered = allHistory.filter(h => h.userId !== userId);
            localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(filtered));
        } catch {
            // Ignore errors
        }
    },
};
