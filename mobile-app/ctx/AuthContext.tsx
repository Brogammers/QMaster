import React, { useContext, useEffect, useState } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { useRouter, useSegments } from 'expo-router';

export const AuthContext = React.createContext<{ 
  signIn: (userData: string) => void; 
  signOut: () => void; 
  updateUser: (userData: string) => void;
  session?: string | null, 
  isLoading?: boolean 
} | null>(null);

export default function useAuth() {
  return useContext(AuthContext);
}

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({children }: React.PropsWithChildren) {
  const rootSegment = useSegments()[0];
  const router = useRouter();
  const [user, setUser] = useState<string | undefined>("");  
  const [token, setToken] = useStorageState('userToken'); // Add this line
  const [[isLoading, session], setSession] = useStorageState('session');

  // Expose a function to set the user
  const updateUser = (userData: string) => {
    setUser(userData);
  };

  useEffect(() => {
    console.log('User:', user); // Log the value of 'user'
    console.log('Root Segment:', rootSegment); // Log the value of 'rootSegment'

    if (user === undefined) return;

    if (!user && rootSegment !== "(auth)") {
      console.log('Navigating to Onboarding screen');
      router.replace("/(auth)/Onboarding");
    } else if (user && rootSegment !== "(app)") {
      console.log('Navigating to root directory');
      router.replace("/");
    }
  }, [user, rootSegment]);

  return (
    <AuthContext.Provider
      value={{
        signIn: (userData) => {
          // Perform sign-in logic here
          console.log('Signing in...' + JSON.stringify(userData));
          setUser(userData);
        },
        signOut: () => {
          console.log('Signing out');
          setUser("");
          setToken(null); // Clear the token when the user signs out
        },
        updateUser,
        session,
        isLoading,
      }}>
        {children}
    </AuthContext.Provider>
  );
}
