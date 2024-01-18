import React, { useContext, useEffect, useState } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { useRouter, useSegments } from 'expo-router';

const AuthContext = React.createContext<{ 
  signIn: () => void; 
  signOut: () => void; 
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
  const [user, setUser] = useState<string | undefined>("Hatem");  

  useEffect(() => {
    if (user === undefined) return;

    if (!user && rootSegment !== "(auth)") {
      router.replace("/(auth)/Onboarding");
    } else if (user && rootSegment !== "(app)") {
      router.replace("/");
    }
  }, [user, rootSegment]);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          setUser("Hatem");
        },
        signOut: () => {
          setUser("");
        },
      }}>
        {children}
    </AuthContext.Provider>
  );
}
