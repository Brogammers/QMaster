import React, { useContext, useEffect, useRef, useState } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { useRouter, useSegments } from "expo-router";
import _ from "lodash";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "@/app/redux/authSlice";
import axios from "axios";

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
  const [user, setUser] = useState<string | undefined | null>("");
  const [tokenState, setTokenState] = useState<string | null>(null);
  const [isTimeoutComplete, setIsTimeoutComplete] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const rootSegment = useSegments()[0];
  const router = useRouter();
  const [[isLoading, session], setSession] = useStorageState("session");
  const dispatch = useDispatch();
  const hasNavigated = useRef(false);

  const token = useSelector((state: RootState) => state.tokenSetter.token);
  

  useEffect(() => {
    const fetchToken = async () => {
      await AsyncStorage.setItem("TOKEN_KEY", "your-test-token");
      const token = await AsyncStorage.getItem("TOKEN_KEY");
      console.log("Fetched Token:", token);
      setTokenState(token);
    };

    fetchToken();
  }, []);

  const handleNavigation = async () => {
    const token = await AsyncStorage.getItem("TOKEN_KEY");

    if (!token || isLoggedOut || (!session && rootSegment !== "(auth)")) {
      console.log("Navigating to Onboarding screen");
      if (!hasNavigated.current) {
        router.replace("/(auth)/Onboarding");
        hasNavigated.current = true;
      }
    } else if (token && !isLoggedOut || (session && rootSegment !== "(app)")) {
      console.log("Navigating to root directory: app");
      if (!hasNavigated.current) {
        router.replace("/");
        hasNavigated.current = true;
      }
    }
  };

  useEffect(() => {
    hasNavigated.current = false;
  }, [session]);

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
    if (isTimeoutComplete && tokenState) {
      handleNavigation();
    }
  }, [isLoading, session, rootSegment, router, user, isTimeoutComplete, tokenState]);

  useEffect(() => {
    console.log("This is the session: ", session);
  }, [session]);

  useEffect(() => {
    const handleSignIn = async () => {
      if (token) {
        setUser(token);
        debouncedSetSession(token);
        setIsLoggedOut(false);

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
    axios.defaults.headers.common["Authorization"] = "";

    try {
      await AsyncStorage.removeItem("TOKEN_KEY");
    } catch (e) {
      console.error("Error removing token: ", e);
    } finally {
      console.log("Logged out successfully");

      setIsLoggingOut(false);
      setIsLoggedOut(true);
      setSession(null);
    }
  };

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
