import {
  StyleSheet,
  ImageBackground,
  Alert,
  StatusBar,
  ScrollView,
  Pressable,
  Platform,
	Dimensions,
} from "react-native";
import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import TextButton from "@/shared/components/TextButton";
import Return from "@/shared/components/Return";
import background from "@/assets/images/background.png";
import { useAuth } from "@/ctx/AuthContext";
import { API_BASE_URL } from "@env";

import DateTimePicker from "@react-native-community/datetimepicker";

import { useDispatch } from "react-redux";
import { setEmail } from "../redux/authSlice"; 
import { countries } from "@/constants";

const window = Dimensions.get('window');

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .nullable()
    .matches(/^[a-zA-Z]+$/, "Full name must contain only letters")
    .required("First name required"),
	lastName: Yup.string()
    .nullable()
    .matches(/^[a-zA-Z]+$/, "Full name must contain only letters")
    .required("Last name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one numeric digit"
    )
    .required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation required"),
	dateOfBirth: Yup.date()
    .nullable()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const router = useRouter();
	const windowWidth = window.width * 0.7

  const [isStateUpdateComplete, setStateUpdateComplete] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleSignUp = async (values: any) => {
    console.log("Form values:", values);

    try {
      // IOS Simulator
      const response = await axios.post(`${API_BASE_URL}`, values);
      // Android Emulator
      // const response = await axios.post(
      // 	"http://10.0.2.2:8080/api/v1/registration",
      // 	values
      // );

      if (response.status === 200 || response.status === 201) {
        console.log("Signup successful", values);
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
        console.error("Signup failed", response.data);
        Alert.alert("Signup Failed", "Please check your input and try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      );

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          console.error("Axios error status:", axiosError.response.status);
          console.error("Axios error data:", axiosError.response.data);
        } else if (axiosError.request) {
          console.error("Axios error request:", axiosError.request);
        } else {
          console.error("Axios error message:", axiosError.message);
        }
      } else {
        console.error("Non-Axios error:", error);
      }
      throw error;
    }
  };

  function setFieldValue(arg0: string, date: Date | null): void {
    throw new Error("Function not implemented.");
  }

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const confirmDateIOS = () => {
    setDateOfBirth(formatDate(date));
    toggleDatePicker();
		console.log(dateOfBirth);
  };

  const formatDate = (rawData: Date | undefined) => {
		if (!rawData) return '';

    let date = new Date(rawData);

    let year = date.getFullYear();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

		return `${day}/${month}/${year}`;
  };

  const onDateChange = (
    { type }: any,
    dateOfBirth: Date | undefined
  ) => {
    if (type === "set" && dateOfBirth) {
      const currentDate: Date = dateOfBirth;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      <Link href="/Onboarding" style={styles.returnButton}>
        <Return size={36} color="white" />
      </Link>
      <StatusBar
        translucent
        backgroundColor="rgba(000, 000, 000, 0.5)"
        barStyle="light-content"
      />
      <View style={styles.row} className="relative">
        <Text style={styles.title} className="mt-10 mb-4 text-2xl text-white">
          Welcome!
        </Text>
        <Text className="mb-16 text-base text-white" style={styles.subTitle}>
          Let's help you save more time.
        </Text>
        <ScrollView
					horizontal={false}
          contentContainerStyle={styles.form}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="never"
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              dateOfBirth: "",
              counrtyOfOrigin: "",
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
              values,
              touched,
              errors,
              isValid,
            }) => (
              <View className="flex items-center justify-center w-3/4 gap-4">
                <TextInput
                  style={styles.input}
                  placeholder="Enter your first name"
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
                  style={styles.input}
                  placeholder="Enter your last name"
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
                  style={styles.input}
                  placeholder="Enter your email"
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
                  style={styles.input}
                  placeholder="Enter new password"
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
                  style={styles.input}
                  placeholder="Confirm new password"
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
											onChange={onDateChange}
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
                      onPress={confirmDateIOS}
                    />
                  </View>
                )}
                {!showPicker && (
                  <Pressable onPress={toggleDatePicker}>
                    <TextInput
                      style={styles.input}
                      placeholder="Date of birth           03/10/2023"
                      placeholderTextColor={"#515151"}
                      onChangeText={handleChange("dateOfBirth")}
											value={values.dateOfBirth}
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
                <View className="my-4" />
                <View className="my-16">
                  <TextButton
                    text={"Sign Up"}
                    buttonColor={!isValid ? "#C5C5C5" : "#1DCDFE"}
                    textColor={"white"}
                    onPress={handleSubmit}
                    disabled={!isValid}
										width={windowWidth}
                  />
                  <TextButton
                    text={"Continue with Google"}
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
		width: window.width * .75,
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
});
