import React, { useContext, useEffect, useState } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { useRouter, useSegments } from 'expo-router';

const AuthContext = React.createContext<{ 
  signIn: (userData: string) => void; 
  signOut: () => void; 
  updateUser: (userData: string) => void;
  session?: string | null, 
  isLoading?: boolean 
} | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

// This hook can be used to access the user info.
// export function useSession() {
//   const value = React.useContext(AuthContext);
//   if (process.env.NODE_ENV !== 'production') {
//     if (!value) {
//       throw new Error('useSession must be wrapped in a <SessionProvider />');
//     }
//   }

//   return value;
// }

export function AuthProvider({children }: React.PropsWithChildren) {
  const rootSegment = useSegments()[0];
  const router = useRouter();
  const [user, setUser] = useState<string | undefined>("");  

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
          console.log('Signing in');
          setUser(userData);
        },
        signOut: () => {
          console.log('Signing out');
          setUser("");
        },
        updateUser
      }}>
        {children}
    </AuthContext.Provider>
  );
}
