
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/lib/auth';
import { toast } from 'sonner';

interface RegisterFormProps {
    onSuccess: () => void;
    onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = authService.register(name, email, password);

            if (result.success && result.user) {
                // Auto-login after registration
                authService.login(email, password);
                toast.success('Account created successfully!');
                onSuccess();
            } else {
                toast.error(result.error || 'Registration failed');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-sm"
        >
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
                    Create Account
                </h1>
                <p className="text-base" style={{ color: '#6B6B6B' }}>
                    Join us and start your AI conversation
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name" style={{ color: '#1A1A1A' }}>
                        Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-12 text-base"
                        style={{ borderColor: '#E5E5E5' }}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" style={{ color: '#1A1A1A' }}>
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 text-base"
                        style={{ borderColor: '#E5E5E5' }}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" style={{ color: '#1A1A1A' }}>
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="h-12 text-base"
                        style={{ borderColor: '#E5E5E5' }}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base font-medium text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#C8B7E8' }}
                >
                    {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
            </form>

            <div className="mt-6 text-center">
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-base font-medium transition-colors"
                    style={{ color: '#A892D4' }}
                >
                    Already have an account? Sign in
                </button>
            </div>
        </motion.div>
    );
}
