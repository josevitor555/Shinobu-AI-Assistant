
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/lib/auth';
import { toast } from 'sonner';

interface LoginFormProps {
    onSuccess: () => void;
    onSwitchToRegister: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = authService.login(email, password);

            if (result.success) {
                toast.success('Welcome back!');
                onSuccess();
            } else {
                toast.error(result.error || 'Login failed');
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
                    Welcome Back
                </h1>
                <p className="text-base" style={{ color: '#6B6B6B' }}>
                    Sign in to continue your conversation
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
            </form>

            <div className="mt-6 text-center">
                <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-base font-medium transition-colors"
                    style={{ color: '#A892D4' }}
                >
                    Create account
                </button>
            </div>
        </motion.div>
    );
}
