import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Image,
  View,
  Text,
  TextInput,
  Alert,
  StatusBar,
  I18nManager,
} from "react-native";
import { Link } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import TextButton from "@/shared/components/TextButton";
import Return from "@/shared/components/Return";
import { MyFormValues, ServerError } from "@/types";
import background from "@/assets/images/background.png";
import LoginImg from "@/assets/images/login.png";
import axios, { AxiosError } from "axios";
import { useAuth } from "@/ctx/AuthContext";
// import { API_BASE_URL_LOGIN } from "@env";

import { useDispatch } from "react-redux";
import { setEmail, setToken } from "../redux/authSlice";
import { isEmpty } from "lodash";
import { setFirstName, setLastName, setPhoneCode, setPhoneNumber, setUserId, setUsername } from "../redux/userSlice";
import SplashScreen from "../SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";
import i18n from "@/i18n";
import configConverter from "@/api/configConverter";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().required("Password required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (
    values: any,
    { setErrors }: { setErrors: Function }
  ) => {
    console.log("Button pressed");
    console.log("Logging in...", values);

    try {
      setIsLoading(true);
      // IOS Simulator
      // const response = await axios.post(
      //   `${Config.EXPO_PUBLIC_API_BASE_URL_LOGIN || "http://localhost:8080/api/v1/login/user"}`,
      //   values
      // );
      // Android Emulator
      // const response = await axios.post(
      //   "http://10.0.2.2:8080/api/v1/login/user",
      //   values
      // );

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
            console.log(response.data);            

            await AsyncStorage.setItem("token", response.data.token);
            const tokenCheck = await AsyncStorage.getItem("token");
            console.log("JWT token stored? ", tokenCheck);
            // creating an Axios instance
            // iOS Simulator

            // Android Simulator
            // http://10.0.2.2:8080/api/v1
            // Setting the default headers
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

            console.log(axios.defaults.headers);
            resolve();
          });

          auth.signIn();
        }
      } else {
        console.error("Login failed", response.data);
        Alert.alert(i18n.t("loginPage.failed"), i18n.t("loginPage.failedMessage"));
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
        <ImageBackground source={background} style={styles.container}>
          <Return href="/Onboarding" size={36} color="white" />
          <StatusBar
            translucent
            backgroundColor="rgba(000, 000, 000, 0.5)"
            barStyle="light-content"
          />
          <View style={styles.row}>
            <Text
              style={styles.title}
              className="mb-10 text-2xl text-white mt-14"
            >
              {i18n.t("loginPage.welcomeBack")}
            </Text>
            <Image source={LoginImg} className="mt-6 mb-12" />
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
                <View className="flex items-center justify-center w-full gap-4">
                  <TextInput
                    style={[
                      styles.input,
                      I18nManager.isRTL ? styles.inputRTL : styles.inputLTR,
                    ]}
                    placeholder={i18n.t("signupPage.email")}
                    placeholderTextColor={"#515151"}
                    onChangeText={handleChange("email")}
                    keyboardType="email-address"
                    value={values.email}
                    autoCapitalize="none"
                  />
                  {errors.email && touched.email && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: "red",
                        textAlign: "center",
                      }}
                    >
                      {errors.email}
                    </Text>
                  )}
                  <TextInput
                    style={[
                      styles.input,
                      I18nManager.isRTL ? styles.inputRTL : styles.inputLTR,
                    ]}
                    placeholder={i18n.t("signupPage.password")}
                    placeholderTextColor={"#515151"}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: "red",
                        textAlign: "center",
                      }}
                    >
                      {errors.password}
                    </Text>
                  )}
                  {errors.server && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: "red",
                        textAlign: "center",
                      }}
                    >
                      {errors.server}
                    </Text>
                  )}
                  <Text className="mt-2 text-sm underline text-baby-blue">
                    {i18n.t("loginPage.forgotPassword")}
                  </Text>
                  <View className="mt-8">
                    <TextButton
                      text={i18n.t("login")}
                      buttonColor={!isValid ? "#C5C5C5" : "#1DCDFE"}
                      textColor={"white"}
                      disabled={!isValid || isLoading}
                      onPress={handleSubmit}
                    />
                    <TextButton
                      text={i18n.t("googleLogin")}
                      icon={"google"}
                      buttonColor={"white"}
                      textColor={"#17222D"}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ImageBackground>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#17222D",
    color: "#FFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    width: "80%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  returnButton: {
    position: "absolute",
    top: 60,
    left: 18,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  title: {
    fontFamily: "InterBold",
    fontSize: 28,
    color: "#FFF",
    marginBottom: 16,
  },
  baseText: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#DFDFDF",
    color: "#515151",
    fontSize: 16,
    fontFamily: "InterBold",
    borderRadius: 42,
    height: 56,
    marginBottom: 5,
    paddingVertical: 4,
    paddingHorizontal: 24,
    width: "100%",
  },
  inputRTL: {
    textAlign: "right", // Align text to the right for RTL languages
  },
  inputLTR: {
    textAlign: "left", // Align text to the left for LTR languages
  },
  button: {
    borderRadius: 10,
    overflow: "hidden",
  },
  signUpButton: {
    backgroundColor: "#1DCDFE",
    marginTop: 10,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButtonText: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
  },
  googleButton: {
    backgroundColor: "#FFF",
    color: "#17222D",
    marginTop: 10,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  googleButtonText: {
    fontSize: 16,
    color: "#17222D",
    textAlign: "center",
  },
});
