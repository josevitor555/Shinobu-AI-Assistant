
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

const USERS_KEY = 'ai_assistant_users';
const CURRENT_USER_KEY = 'ai_assistant_current_user';

export const authService = {
    register: (name: string, email: string, password: string): { success: boolean; error?: string; user?: User } => {
        if (typeof window === 'undefined') {
            return { success: false, error: 'Not available on server' };
        }

        const users = authService.getAllUsers();

        if (users.find(u => u.email === email)) {
            return { success: false, error: 'Email already exists' };
        }

        const newUser: User = {
            id: Date.now().toString(),
            name,
            email,
            password,
            createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        return { success: true, user: newUser };
    },

    login: (email: string, password: string): { success: boolean; error?: string; user?: User } => {
        if (typeof window === 'undefined') {
            return { success: false, error: 'Not available on server' };
        }

        const users = authService.getAllUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, error: 'Invalid email or password' };
        }

        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return { success: true, user };
    },

    logout: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    getCurrentUser: (): User | null => {
        if (typeof window === 'undefined') return null;

        const userStr = localStorage.getItem(CURRENT_USER_KEY);
        if (!userStr) return null;

        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    },

    getAllUsers: (): User[] => {
        if (typeof window === 'undefined') return [];

        const usersStr = localStorage.getItem(USERS_KEY);
        if (!usersStr) return [];

        try {
            return JSON.parse(usersStr);
        } catch {
            return [];
        }
    },
};
