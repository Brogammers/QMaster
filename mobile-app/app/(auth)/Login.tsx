import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  StatusBar,
  I18nManager,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import TextButton from "@/shared/components/TextButton";
import { MyFormValues, ServerError } from "@/types";
import axios, { AxiosError } from "axios";
import { useAuth } from "@/ctx/AuthContext";

import { useDispatch } from "react-redux";
import { setEmail, setToken } from "../redux/authSlice";
import { isEmpty } from "lodash";
import {
  setFirstName,
  setLastName,
  setPhoneCode,
  setPhoneNumber,
  setUserId,
  setUsername,
} from "../redux/userSlice";
import SplashScreen from "../SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "@/i18n";
import configConverter from "@/api/configConverter";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().required("Password required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (
    values: any,
    { setErrors }: { setErrors: Function }
  ) => {
    console.log("Button pressed");
    console.log("Logging in...", values);

    try {
      setIsLoading(true);

      const response = await axios.post(
        configConverter("EXPO_PUBLIC_API_BASE_URL_LOGIN"),
        values
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Login successful", values);
        if (auth && auth.signIn) {
          console.log("This is the type of response: " + typeof response.data);
          console.log(
            "This is the email of the user: ",
            response.data.email,
            " and type: ",
            typeof response.data.email
          );
          // Update the session state and wait for the update to complete
          await new Promise<void>(async (resolve) => {
            dispatch(setEmail(values.email));
            dispatch(setToken(response.data.token));
            dispatch(
              setUsername(
                response.data.firstName + " " + response.data.lastName
              )
            );
            dispatch(setUserId(response.data.userID));
            dispatch(setFirstName(response.data.firstName));
            dispatch(setLastName(response.data.lastName));
            dispatch(setPhoneCode(response.data.phoneCode));
            dispatch(setPhoneNumber(response.data.phoneNumber));

            await AsyncStorage.setItem("token", response.data.token);

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.token}`;
            axios.defaults.headers.common["Content-Type"] = "application/json";

            axios.interceptors.request.use(
              (config) => {
                config.headers[
                  "Authorization"
                ] = `Bearer ${response.data.token}`;
                return config;
              },
              (error) => {
                return Promise.reject(error);
              }
            );

            resolve();
          });

          auth.signIn();
        }
      } else {
        console.error("Login failed", response.data);
        Alert.alert(
          i18n.t("loginPage.failed"),
          i18n.t("loginPage.failedMessage")
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ServerError>;

        if (axiosError.response) {
          console.error("Axios error status:", axiosError.response.status);
          console.error("Axios error data:", axiosError.response.data);

          // Map backend error messages to our translation keys
          let errorMessage = axiosError.response.data.message;
          if (errorMessage.includes("Invalid credentials")) {
            errorMessage = i18n.t("loginPage.invalidCredentials");
          } else if (errorMessage.includes("not verified")) {
            errorMessage = i18n.t("loginPage.accountNotVerified");
          } else if (errorMessage.includes("locked")) {
            errorMessage = i18n.t("loginPage.accountLocked");
          }

          Alert.alert(
            i18n.t("loginPage.failed"),
            errorMessage || i18n.t("loginPage.failedMessage")
          );

          setErrors({
            server: errorMessage,
          });
        } else if (axiosError.request) {
          console.error("Axios error request:", axiosError.request);
          Alert.alert(
            i18n.t("loginPage.error"),
            i18n.t("loginPage.networkError")
          );
        } else {
          console.error("Axios error message:", axiosError.message);
          Alert.alert(
            i18n.t("loginPage.error"),
            i18n.t("loginPage.errorMessage")
          );
        }
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
        Alert.alert(
          i18n.t("loginPage.error"),
          i18n.t("loginPage.errorMessage")
        );
      } else {
        console.error("Non-Axios error:", error);
        Alert.alert(
          i18n.t("loginPage.error"),
          i18n.t("loginPage.errorMessage")
        );
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isEmpty(errorMessage)) {
      Alert.alert("Error", errorMessage);
    }
  }, [errorMessage]);

  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <SafeAreaView className="flex-1 bg-white">
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />

          {/* Gradient background */}
          <LinearGradient
            colors={["rgba(29, 205, 254, 0.1)", "rgba(255, 255, 255, 0)"]}
            className="absolute top-0 w-full h-64"
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />

          <SafeAreaView className="w-full pt-4 px-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-white shadow-sm rounded-full p-3 w-10 h-10 justify-center items-center"
            >
              <Text
                style={{
                  transform: [{ scaleX: I18nManager.isRTL ? 1 : -1 }],
                  fontWeight: "bold",
                }}
              >
                →
              </Text>
            </TouchableOpacity>
          </SafeAreaView>

          <View className="px-6 pt-8">
            <Text className="text-2xl font-bold text-ocean-blue mb-4">
              {i18n.t("loginPage.welcomeBack")}
            </Text>
            <Text className="text-lg font-medium text-slate-grey mb-8">
              {i18n.t("loginPage.continueWithEmail")}
            </Text>

            <Formik<MyFormValues>
              initialValues={{
                email: "",
                password: "",
                server: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
                isValid,
              }) => (
                <View className="space-y-4">
                  <View>
                    <TextInput
                      style={styles.input}
                      placeholder={i18n.t("signupPage.email")}
                      placeholderTextColor={"#888888"}
                      onChangeText={handleChange("email")}
                      keyboardType="email-address"
                      value={values.email}
                      autoCapitalize="none"
                    />
                    {errors.email && touched.email && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {errors.email}
                      </Text>
                    )}
                  </View>

                  <View>
                    <View className="flex-row items-center">
                      <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder={i18n.t("signupPage.password")}
                        placeholderTextColor={"#888888"}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        secureTextEntry={!showPassword}
                        value={values.password}
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <MaterialIcons
                          name={showPassword ? "visibility" : "visibility-off"}
                          size={24}
                          color="#888888"
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.password && touched.password && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {errors.password}
                      </Text>
                    )}
                  </View>

                  {errors.server && (
                    <Text className="text-red-500 text-xs ml-1">
                      {errors.server}
                    </Text>
                  )}

                  <View className="flex-row justify-between pt-2">
                    <TouchableOpacity>
                      <Text className="text-sm text-baby-blue">
                        {i18n.t("loginPage.forgotPassword")}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/SignUp")}>
                      <Text className="text-sm text-baby-blue">
                        {i18n.t("loginPage.createAccount")}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="pt-8">
                    <TouchableOpacity
                      className={`${
                        !isValid ? "bg-gray-300" : "bg-baby-blue"
                      } py-4 rounded-xl items-center my-2 shadow-sm`}
                      onPress={() => handleSubmit()}
                      disabled={!isValid || isLoading}
                    >
                      <Text className="text-white font-medium">
                        {i18n.t("login")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    height: 56,
    justifyContent: "center",
  },
});
