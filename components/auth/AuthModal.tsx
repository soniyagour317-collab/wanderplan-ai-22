import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ShieldAlert, Mail, Lock, User as UserIcon } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { login, signup, isDemoMode } = useAuth();
  const { showToast } = useToast();

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!email || !email.includes('@')) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (isSignUp && !name.trim()) {
      errs.name = 'Please provide your full name.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (isSignUp) {
        await signup(email, name);
        showToast(`Welcome aboard WanderPlan AI, ${name}!`, 'success');
      } else {
        await login(email, name);
        showToast('Successfully signed in!', 'success');
      }
      onClose();
    } catch {
      showToast('Authentication failed. Please check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isSignUp ? 'Create your Traveler Account' : 'Welcome back to WanderPlan AI'}
      subtitle={
        isSignUp
          ? 'Save personalized itineraries, customize activities, and sync travel notes.'
          : 'Sign in to access your saved trips, budget plans, and packing checklists.'
      }
      maxWidth="md"
    >
      {/* Demo Mode Transparency Notice */}
      {isDemoMode && (
        <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Local Demo Mode Active:</span> Authentication and trips are securely persisted in your browser's LocalStorage. This is 100% functional for testing & capstone reviews. Connect Supabase in <code>.env</code> for live cloud database authentication.
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          type="button"
          onClick={() => {
            setIsSignUp(false);
            setErrors({});
          }}
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors ${
            !isSignUp
              ? 'border-teal-600 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setIsSignUp(true);
            setErrors({});
          }}
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors ${
            isSignUp
              ? 'border-teal-600 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                  errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-white'
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-white'
              } focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
          </div>
          {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                errors.password ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-white'
              } focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
          </div>
          {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
        </div>

        <Button
          type="submit"
          variant="teal"
          className="w-full mt-2 py-3"
          isLoading={loading}
        >
          {isSignUp ? 'Create My Account' : 'Sign In to WanderPlan'}
        </Button>

        {/* Quick Demo Fill button */}
        {isDemoMode && (
          <button
            type="button"
            onClick={() => {
              setEmail('demo.traveler@example.com');
              setPassword('wanderlust2026');
              setName('Alex Explorer');
              setErrors({});
            }}
            className="w-full text-center text-xs text-slate-500 hover:text-teal-600 font-medium py-1 transition-colors"
          >
            ⚡ Click to Auto-fill Demo Credentials
          </button>
        )}
      </form>
    </Modal>
  );
};
