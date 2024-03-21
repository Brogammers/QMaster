import React, { useContext, useEffect, useState } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { useRouter, useSegments } from "expo-router";
import _ from "lodash";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "@/app/redux/authSlice";

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

export function useAuth() {
  return useContext(AuthContext);
}

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider({ children }: React.PropsWithChildren) {
  const rootSegment = useSegments()[0];
  const router = useRouter();
  const [user, setUser] = useState<string | undefined | null>("");
  const [[isLoading, session], setSession] = useStorageState("session");
  const [isTimeoutComplete, setIsTimeoutComplete] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.tokenSetter.token);

  const handleNavigation = () => {
    setTimeout(() => {
      if (!session && rootSegment !== "(auth)") {
        console.log("Navigating to Onboarding screen");
        router.replace("/(auth)/Onboarding");
      } else if (session && rootSegment !== "(app)") {
        console.log("Navigating to root directory: app");
        router.replace("/");
      }
    }, 500);
  };

  const debouncedSetSession = _.debounce(setSession, 300);

  useEffect(() => {
    console.log("User:", user);
    console.log("Root Segment:", rootSegment);
    const timer = setTimeout(() => {
      setIsTimeoutComplete(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isTimeoutComplete) {
      handleNavigation();
    }
  }, [isLoading, session, rootSegment, router, user, isTimeoutComplete]);

  useEffect(() => {
    console.log("This is the session: ", session);
  }, [session]);

  useEffect(() => {
    const handleSignIn = async () => {
      if (token) {
        setUser(token);
        debouncedSetSession(token);

        try {
          await AsyncStorage.setItem("TOKEN_KEY", token);
        } catch (e) {
          console.error("Error storing the token: ", e);
        }
      }
    };

    handleSignIn();
  }, [token, debouncedSetSession]);

  const handleSignOut = async () => {
    console.log("Logging out...");
    setIsLoggingOut(true); 
    setUser(""); 
    setSession(null);
    dispatch(setToken("")); 
    await AsyncStorage.removeItem("TOKEN_KEY"); 
    console.log("Logged out successfully");
  
    setIsLoggingOut(false);
  };

  useEffect(() => {
    if (!isLoggingOut && !session) {
      console.log("Session is null. Navigating to Onboarding screen");
      router.replace("/(auth)/Onboarding");
    }
  }, [isLoggingOut, session]);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {},
        signOut: handleSignOut, 
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
