import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { storageService } from '../services/storageService';
import { isSupabaseConfigured, supabase } from '../services/supabaseClient';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  login: (email: string, name?: string) => Promise<boolean>;
  signup: (email: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfileName: (newName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => storageService.getUser());
  const isDemoMode = !isSupabaseConfigured;

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Listen to Supabase Auth State changes if configured
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const u: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Traveler',
            avatar: session.user.user_metadata?.avatar_url,
            isDemo: false
          };
          setUser(u);
          storageService.saveUser(u);
        } else {
          setUser(null);
          storageService.saveUser(null);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, name?: string): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      // Supabase magic link or password flow
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        console.error('Supabase auth error:', error.message);
        return false;
      }
      return true;
    }

    // Local Demo Mode authentication
    const cleanName = name || email.split('@')[0] || 'Traveler';
    const demoUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isDemo: true
    };
    setUser(demoUser);
    storageService.saveUser(demoUser);
    return true;
  };

  const signup = async (email: string, name: string): Promise<boolean> => {
    return login(email, name);
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
    setUser(null);
    storageService.saveUser(null);
  };

  const updateProfileName = (newName: string) => {
    if (!user) return;
    const updated = { ...user, name: newName };
    setUser(updated);
    storageService.saveUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isDemoMode,
        login,
        signup,
        logout,
        updateProfileName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
