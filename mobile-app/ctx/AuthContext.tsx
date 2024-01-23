import React, { useContext, useEffect, useState } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { useRouter, useSegments } from 'expo-router';

import { useSelector } from 'react-redux';
import type { RootState } from '@/app/redux/store';

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

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

export function SessionProvider({ children }: React.PropsWithChildren) {
  const rootSegment = useSegments()[0];
  const router = useRouter();
  const [user, setUser] = useState<string | undefined | null>("");  
  const [[isLoading, session], setSession] = useStorageState('session');

  const email = useSelector((state: RootState) => state.emailSetter.email);

  useEffect(() => {
    console.log('User:', user); // Log the value of 'user'
    console.log('Root Segment:', rootSegment); // Log the value of 'rootSegment'

    if (!session || session) {
      if (!session && rootSegment !== "(auth)") {
        console.log('Navigating to Onboarding screen');
        router.replace("/(auth)/Onboarding");
      } else if (session && rootSegment !== "(app)") {
        console.log('Navigating to root directory' + router);
        router.replace("/");
      }
    }
  }, [isLoading, session, rootSegment, router]);

  useEffect(() => {
    console.log("This is the session: ", session);
  }, [session]);  

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          setUser(email);
          setSession(email);
          console.log("This is the session and the user: ", session)
        },
        
        signOut: () => {
          setUser(""); // Clear user state
          setSession(null);
        },
        session,
        isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// The discrepancy you're seeing is due to the asynchronous nature of the `setSession` function and the `useState` hook in React. When you call `setSession(email)`, it schedules an update to the `session` state variable. However, this update is not immediate. 

// When you log `session` right after calling `setSession(email)`, it logs the current value of `session`, not the new value that was just scheduled. This is why you're seeing the entire object logged instead of just the email.

// On the other hand, the `useEffect` hook that logs `session` is triggered whenever `session` changes. By the time this `useEffect` runs, the state update has been completed, so it logs the updated value of `session`, which is the email.

// In summary, the state update caused by `setSession` is not immediate, which is why you're seeing different values logged in different places. This is a common gotcha with React's `useState` and other similar hooks. I hope this helps! 😊