
export interface PersonalitySettings {
    humor: number;
    formality: number;
    sarcasm: number;
}

export interface UserSettings {
    userId: string;
    personality: PersonalitySettings;
}

const SETTINGS_KEY = 'ai_assistant_settings';

const DEFAULT_PERSONALITY: PersonalitySettings = {
    humor: 50,
    formality: 50,
    sarcasm: 30,
};

export const settingsService = {
    getSettings: (userId: string): PersonalitySettings => {
        if (typeof window === 'undefined') return DEFAULT_PERSONALITY;

        const settingsStr = localStorage.getItem(SETTINGS_KEY);
        if (!settingsStr) return DEFAULT_PERSONALITY;

        try {
            const allSettings: UserSettings[] = JSON.parse(settingsStr);
            const userSettings = allSettings.find(s => s.userId === userId);
            return userSettings?.personality || DEFAULT_PERSONALITY;
        } catch {
            return DEFAULT_PERSONALITY;
        }
    },

    saveSettings: (userId: string, personality: PersonalitySettings): void => {
        if (typeof window === 'undefined') return;

        const settingsStr = localStorage.getItem(SETTINGS_KEY);
        let allSettings: UserSettings[] = [];

        try {
            allSettings = settingsStr ? JSON.parse(settingsStr) : [];
        } catch {
            allSettings = [];
        }

        const userSettingsIndex = allSettings.findIndex(s => s.userId === userId);

        if (userSettingsIndex >= 0) {
            allSettings[userSettingsIndex].personality = personality;
        } else {
            allSettings.push({
                userId,
                personality,
            });
        }

        localStorage.setItem(SETTINGS_KEY, JSON.stringify(allSettings));
    },
};
