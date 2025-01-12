import {
  StyleSheet,
  ImageBackground,
  Alert,
  StatusBar,
  ScrollView,
  Pressable,
  Platform,
  Dimensions,
  I18nManager,
} from "react-native";
import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Link, useRouter } from "expo-router";
import { Formik, FormikErrors } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import TextButton from "@/shared/components/TextButton";
import Return from "@/shared/components/Return";
import background from "@/assets/images/background.png";
import { useAuth } from "@/ctx/AuthContext";
import SplashScreen from "../SplashScreen";
import DropDownPicker from "react-native-dropdown-picker";
// import { API_BASE_URL } from "@env";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { setEmail } from "../redux/authSlice";
import { countries } from "@/constants";
import PhoneInput from "react-native-phone-input";
import { isValidPhoneNumber } from "libphonenumber-js";
// import EXPO_PUBLIC_API_BASE_URL from ""
import Config from "react-native-config";
import i18n from "@/i18n";
import configConverter from "@/api/configConverter";

interface ServerError {
  message: string;
}

const window = Dimensions.get("window");

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .nullable()
    .matches(/^[a-zA-Z\u0600-\u06FF\s]+$/, "Full name must contain only letters")
    .required("First name required"),
  lastName: Yup.string()
    .nullable()
    .matches(/^[a-zA-Z\u0600-\u06FF\s]+$/, "Full name must contain only letters")
    .required("Last name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z\u0600-\u06FF])(?=.*[A-Z\u0600-\u06FF])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one numeric digit"
    )
    .required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation required"),
  dateOfBirth: Yup.date()
    .nullable()
    // .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  phoneNumber: Yup.string()
    .test("is-valid-phone-number", "Invalid phone number", (value) => {
      return isValidPhoneNumber(value || "");
    })
    .required("Phone number required"),
  countryOfOrigin: Yup.string().required("Country of origin required"),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const router = useRouter();
  const windowWidth = window.width * 0.7;

  const [isStateUpdateComplete, setStateUpdateComplete] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [displayDate, setDisplayDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  const handleSignUp = async (values: any) => {
    console.log("Form values:", values);

    try {
      setIsLoading(true);
      // const url =
      //   Config.EXPO_PUBLIC_API_BASE_URL ||
      //   "http://localhost:8080/api/v1/registration/user";

      const url = configConverter("EXPO_PUBLIC_API_BASE_URL");

      console.log("This is the URL: ", url);

      if (!url) {
        console.error("API base URL is not set.");
        Alert.alert(
          "Configuration Error",
          "API base URL is not set. Please configure the environment correctly."
        );
        return; // Exit the function early if the URL is not set
      }

      const response = await axios.post(url, values);

      if (response.status === 200 || response.status === 201) {
        console.log("Signup successful", values);
        console.log("Signup response:", response.data);

        if (auth && auth.signIn) {
          console.log("This is the type of response: " + typeof response.data);
          console.log(
            "This is the email of the user: ",
            response.data.email,
            " and type: ",
            typeof response.data.email
          );

          await new Promise<void>((resolve) => {
            dispatch(setEmail(response.data.email));
            resolve();
          });

          router.replace("/(auth)/VerificationSent");
          auth.signIn();
        }
      } else {
        console.error("SignUp failed", response.data);
        Alert.alert(i18n.t("signupPage.failed"), i18n.t("loginPage.failedMessage"));
      }
    } catch (error) {
      console.error("Signup error:", error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ServerError>;

        if (axiosError.response) {
          console.error("Axios error status:", axiosError.response.status);
          console.error("Axios error data:", axiosError.response.data);
          
          // Map backend error messages to our translation keys
          let errorMessage = axiosError.response.data.message;
          if (errorMessage.includes("Email is already in use")) {
            errorMessage = i18n.t("signupPage.emailInUse");
          } else if (errorMessage.includes("Invalid email")) {
            errorMessage = i18n.t("signupPage.invalidEmail");
          } else if (errorMessage.includes("Password")) {
            errorMessage = i18n.t("signupPage.invalidPassword");
          } else if (errorMessage.includes("phone")) {
            errorMessage = i18n.t("signupPage.invalidPhone");
          }
          
          Alert.alert(
            i18n.t("signupPage.failed"),
            errorMessage || i18n.t("signupPage.failedMessage")
          );
        } else if (axiosError.request) {
          console.error("Axios error request:", axiosError.request);
          Alert.alert(
            i18n.t("signupPage.error"),
            i18n.t("signupPage.networkError")
          );
        } else {
          console.error("Axios error message:", axiosError.message);
          Alert.alert(
            i18n.t("signupPage.error"),
            i18n.t("signupPage.errorMessage")
          );
        }
      } else {
        console.error("Non-Axios error:", error);
        Alert.alert(
          i18n.t("signupPage.error"),
          i18n.t("signupPage.errorMessage")
        );
      }
      // It might be better to handle the error without throwing it, depending on your error handling strategy
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const confirmDateIOS =
    (setFieldValue: {
      (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
      ): Promise<void | FormikErrors<{
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        counrtyOfOrigin: string;
        email: string;
        phoneNumber: string;
        password: string;
        username: null;
        confirmPassword: string;
      }>>;
      (arg0: string, arg1: Date): void;
    }) =>
      () => {
        const formattedDate = formatDate(date);
        setDisplayDate(formattedDate); // Set the display date
        setFieldValue("dateOfBirth", date); // Use the Date object for Formik
        toggleDatePicker();
      };

  const formatDate = (rawData: Date | undefined) => {
    if (!rawData) return "";

    let date = new Date(rawData);

    let year = date.getFullYear();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

  const onDateChange =
    (setFieldValue: {
      (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
      ): Promise<void | FormikErrors<{
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        counrtyOfOrigin: string;
        email: string;
        phoneNumber: string;
        password: string;
        username: null;
        confirmPassword: string;
      }>>;
      (arg0: string, arg1: Date): void;
    }) =>
      ({ type }: any, dateOfBirth: Date | undefined) => {
        if (type === "set" && dateOfBirth) {
          const currentDate: Date = dateOfBirth;
          setDate(currentDate);

          const formattedDate = formatDate(currentDate);
          setDisplayDate(formattedDate); // Set the display date
          setFieldValue("dateOfBirth", currentDate); // Use the Date object for Formik

          if (Platform.OS === "android") {
            toggleDatePicker();
          }
        } else {
          toggleDatePicker();
        }
      };

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
          <View style={styles.row} className="relative">
            <Text
              style={styles.title}
              className="mt-10 mb-4 text-2xl text-white"
            >
              {i18n.t("signupPage.welcome")}
            </Text>
            <Text
              className="mb-16 text-base text-white"
              style={styles.subTitle}
            >
              {i18n.t("signupPage.welcomeComment")}
            </Text>
            <ScrollView
              horizontal={false}
              contentContainerStyle={styles.form}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="never"
              showsVerticalScrollIndicator={false}
              scrollEnabled={isScrollEnabled}
              nestedScrollEnabled={true}
              style={{ width: "100%" }}
            >
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  dateOfBirth: "",
                  countryOfOrigin: "",
                  email: "",
                  phoneNumber: "",
                  password: "",
                  username: null,
                  confirmPassword: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSignUp}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  touched,
                  errors,
                  isValid,
                }) => (
                  <View className="flex items-center justify-center w-3/4 gap-4">
                    <TextInput
                      style={[
                        styles.input,
                        I18nManager.isRTL ? styles.inputRTL : styles.inputLTR,
                      ]}
                      placeholder={i18n.t("signupPage.firstName")}
                      placeholderTextColor={"#515151"}
                      onChangeText={handleChange("firstName")}
                      value={values.firstName}
                      autoCapitalize="words"
                    />
                    {errors.firstName && touched.firstName && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        {errors.firstName}
                      </Text>
                    )}
                    <TextInput
                      style={[
                        styles.input,
                        I18nManager.isRTL ? styles.inputRTL : styles.inputLTR,
                      ]}
                      placeholder={i18n.t("signupPage.lastName")}
                      placeholderTextColor={"#515151"}
                      onChangeText={handleChange("lastName")}
                      value={values.lastName}
                      autoCapitalize="words"
                    />
                    {errors.lastName && touched.lastName && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        {errors.lastName}
                      </Text>
                    )}
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
                    <TextInput
                      style={[
                        styles.input,
                        I18nManager.isRTL ? styles.inputRTL : styles.inputLTR,
                      ]}
                      placeholder={i18n.t("signupPage.confirmPassword")}
                      placeholderTextColor={"#515151"}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      secureTextEntry
                      value={values.confirmPassword}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        {errors.confirmPassword}
                      </Text>
                    )}
                    {showPicker && (
                      <View style={{ width: "110%" }}>
                        <DateTimePicker
                          textColor="white"
                          mode="date"
                          display="spinner"
                          value={date}
                          onChange={onDateChange(setFieldValue)}
                          style={styles.datePicker}
                          maximumDate={new Date()}
                          minimumDate={new Date(1900, 1, 1)}
                        />
                      </View>
                    )}
                    {showPicker && Platform.OS === "ios" && (
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <TextButton
                          text={"Cancel"}
                          buttonColor={"white"}
                          textColor={"#17222D"}
                          textSize="text-md"
                          padding={8}
                          width={100}
                          onPress={toggleDatePicker}
                        />
                        <TextButton
                          text={"Confirm"}
                          buttonColor={"#1DCDFE"}
                          textColor={"white"}
                          textSize="text-md"
                          padding={8}
                          width={100}
                          onPress={confirmDateIOS(setFieldValue)}
                        />
                      </View>
                    )}
                    {!showPicker && (
                      <Pressable onPress={toggleDatePicker}>
                        <TextInput
                          style={[
                            styles.input,
                            I18nManager.isRTL ? styles.inputRTL : styles.inputLTR,
                          ]}
                          placeholder={i18n.t("signupPage.dateOfBirth")}
                          placeholderTextColor={"#515151"}
                          onChangeText={handleChange("dateOfBirth")}
                          value={displayDate}
                          editable={false}
                          onPressIn={toggleDatePicker}
                        />
                      </Pressable>
                    )}
                    {errors.dateOfBirth && touched.dateOfBirth && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        {errors.dateOfBirth}
                      </Text>
                    )}
                    <View>
                      <DropDownPicker
                        open={open}
                        onChangeValue={(value) => {
                          handleChange("countryOfOrigin")(value || "");
                          setFieldValue("countryOfOrigin", value || ""); // Update Formik state
                        }}
                        value={value}
                        items={countries}
                        setOpen={(isOpen) => {
                          setOpen(isOpen);
                          setIsScrollEnabled(!isOpen);
                        }}
                        setValue={setValue}
                        style={[
                          styles.dropDownPicker,
                          { zIndex: 1000, height: 56 },
                        ]}
                        dropDownDirection="TOP"
                        dropDownContainerStyle={[styles.dropDownPicker]}
                        placeholder={i18n.t("signupPage.country")}
                        textStyle={{
                          color: "#515151",
                          fontSize: 16,
                          fontFamily: "JostBold",
                        }}
                      />
                      {errors.countryOfOrigin && touched.countryOfOrigin && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: "red",
                            textAlign: "center",
                          }}
                        >
                          {errors.countryOfOrigin}
                        </Text>
                      )}
                    </View>
                    <PhoneInput
                      style={styles.input}
                      onChangePhoneNumber={(value) => {
                        handleChange("phoneNumber")(value || "");
                        setFieldValue("phoneNumber", value || ""); // Update Formik state
                      }}
                      initialValue={values.phoneNumber}
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        {errors.phoneNumber}
                      </Text>
                    )}
                    <View className="my-4" />
                    <View className="my-16">
                      <TextButton
                        text={i18n.t("signup")}
                        buttonColor={!isValid ? "#C5C5C5" : "#1DCDFE"}
                        textColor={"white"}
                        onPress={handleSubmit}
                        disabled={!isValid || isLoading}
                        width={windowWidth}
                      />
                      <TextButton
                        text={i18n.t("googleSignup")}
                        icon={"google"}
                        buttonColor={"white"}
                        textColor={"#17222D"}
                        width={windowWidth}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </ScrollView>
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
    width: window.width,
  },
  row: {
    width: window.width,
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
    marginTop: 104,
    marginBottom: 16,
  },
  subTitle: {
    fontFamily: "JostReg",
  },
  baseText: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 40,
  },
  form: {
    alignItems: "center",
  },
  input: {
    backgroundColor: "#DFDFDF",
    color: "#515151",
    fontSize: 16,
    fontFamily: "JostBold",
    borderRadius: 42,
    height: 56,
    marginBottom: 5,
    paddingVertical: 4,
    paddingHorizontal: 24,
    width: window.width * 0.75,
  },
  inputRTL: {
    textAlign: "right", // Align text to the right for RTL languages
  },
  inputLTR: {
    textAlign: "left", // Align text to the left for LTR languages
  },
  datePicker: {
    height: 120,
    marginTop: -10,
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
  dropDownPicker: {
    backgroundColor: "#DFDFDF",
    color: "#515151",
    fontFamily: "JostBold",
    borderRadius: 42,
    marginBottom: 5,
    paddingVertical: 4,
    paddingHorizontal: 24,
    alignSelf: "center",
    width: window.width * 0.75,
  },
});
