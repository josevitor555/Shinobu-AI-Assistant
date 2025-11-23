import type { PersonalitySettings } from '../lib/settings';

const responses = {
  greetings: [
    "Hello! How can I assist you today?",
    "Hi there! What can I help you with?",
    "Hey! I'm here to help. What's on your mind?",
    "Greetings! How may I be of service?",
  ],
  humor: {
    low: [
      "I understand. Let me help you with that.",
      "I see. I'll do my best to assist.",
      "Noted. I'm here to help.",
    ],
    medium: [
      "Sure thing! Let's tackle this together.",
      "Absolutely! I'm on it.",
      "You got it! Let me help you out.",
    ],
    high: [
      "Oh, this is going to be fun! Let's do this!",
      "Awesome question! I love it!",
      "Ha! Great minds think alike. Let's figure this out!",
    ],
  },
  formality: {
    low: [
      "Yeah, totally! Here's what I think...",
      "For sure! So basically...",
      "Yep! Here's the deal...",
    ],
    medium: [
      "Certainly. Here's my response...",
      "Of course. Let me explain...",
      "Sure. Here's what you need to know...",
    ],
    high: [
      "Indeed. I shall provide you with the following information...",
      "Certainly. Allow me to elucidate...",
      "Most assuredly. Permit me to explain...",
    ],
  },
  sarcasm: {
    low: [
      "That's a great question.",
      "I appreciate your inquiry.",
      "Thank you for asking.",
    ],
    medium: [
      "Well, that's an interesting way to put it!",
      "Oh, I see what you did there.",
      "Clever question!",
    ],
    high: [
      "Oh wow, never heard that one before... just kidding!",
      "Well, aren't we full of surprises today?",
      "That's... certainly one way to look at it!",
    ],
  },
};

export function generateAIResponse(userMessage: string, personality: PersonalitySettings): string {
  const lowerMessage = userMessage.toLowerCase();

  // Greeting detection
  if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
    return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
  }

  // Determine personality level
  const humorLevel = personality.humor < 33 ? 'low' : personality.humor < 66 ? 'medium' : 'high';
  const formalityLevel = personality.formality < 33 ? 'low' : personality.formality < 66 ? 'medium' : 'high';
  const sarcasmLevel = personality.sarcasm < 33 ? 'low' : personality.sarcasm < 66 ? 'medium' : 'high';

  // Build response based on personality
  const parts: string[] = [];

  // Add sarcasm element
  if (Math.random() < personality.sarcasm / 100) {
    parts.push(responses.sarcasm[sarcasmLevel][Math.floor(Math.random() * responses.sarcasm[sarcasmLevel].length)]);
  }

  // Add formality element
  parts.push(responses.formality[formalityLevel][Math.floor(Math.random() * responses.formality[formalityLevel].length)]);

  // Add humor element
  if (Math.random() < personality.humor / 100) {
    parts.push(responses.humor[humorLevel][Math.floor(Math.random() * responses.humor[humorLevel].length)]);
  }

  // Generate contextual response
  const contextResponses = [
    `Regarding "${userMessage}", I think that's a fascinating topic. Based on my understanding, there are several perspectives to consider.`,
    `That's an excellent question about "${userMessage}". Let me share some insights with you.`,
    `I appreciate you asking about "${userMessage}". Here's what I can tell you about that.`,
    `When it comes to "${userMessage}", there's quite a bit to unpack. Let me break it down for you.`,
  ];

  parts.push(contextResponses[Math.floor(Math.random() * contextResponses.length)]);

  return parts.join(' ');
}