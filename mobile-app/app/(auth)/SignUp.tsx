import {
  StyleSheet,
  Alert,
  StatusBar as RNStatusBar,
  ScrollView,
  Pressable,
  Platform,
  Dimensions,
  I18nManager,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import i18n from "@/i18n";
import configConverter from "@/api/configConverter";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";

// Get the screen dimensions
const { width } = Dimensions.get("window");

type SignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  phoneCode: string;
  dob: Date;
  accept: boolean;
};

export default function SignUp() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);

  // Define validation schema
  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(
        /^[a-zA-Z\u0600-\u06FF\s]+$/,
        i18n.t("signupPage.validation.firstNameFormat")
      )
      .required(i18n.t("signupPage.validation.firstName")),
    lastName: Yup.string()
      .matches(
        /^[a-zA-Z\u0600-\u06FF\s]+$/,
        i18n.t("signupPage.validation.lastNameFormat")
      )
      .required(i18n.t("signupPage.validation.lastName")),
    email: Yup.string()
      .email(i18n.t("signupPage.validation.emailInvalid"))
      .required(i18n.t("signupPage.validation.emailRequired")),
    password: Yup.string()
      .min(8, i18n.t("signupPage.validation.passwordMin"))
      .matches(
        /^(?=.*[a-z\u0600-\u06FF])(?=.*[A-Z\u0600-\u06FF])(?=.*\d)/,
        i18n.t("signupPage.validation.passwordFormat")
      )
      .required(i18n.t("signupPage.validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        i18n.t("signupPage.validation.passwordMatch")
      )
      .required(i18n.t("signupPage.validation.confirmPasswordRequired")),
    phoneNumber: Yup.string()
      .matches(/^\d{8}$/, i18n.t("signupPage.validation.phoneNumberFormat"))
      .required(i18n.t("signupPage.validation.phoneNumberRequired")),
    phoneCode: Yup.string().required(
      i18n.t("signupPage.validation.phoneCodeRequired")
    ),
    dob: Yup.date().required(i18n.t("signupPage.validation.dobRequired")),
    accept: Yup.boolean().oneOf(
      [true],
      i18n.t("signupPage.validation.acceptTerms")
    ),
  });

  const handleSignUp = async (values: SignUpFormValues, actions: any) => {
    try {
      const formData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
        phoneCode: values.phoneCode,
        dob: values.dob,
      };

      const response = await axios.post(
        configConverter("EXPO_PUBLIC_API_BASE_URL_REGISTER"),
        formData
      );

      if (response.status === 201) {
        console.log("Registration successful");
        // Navigate to Login
        router.push("/Login");
      }
    } catch (error: any) {
      console.error("Registration error:", error.response?.data || error);
      if (error.response?.data?.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError(i18n.t("signupPage.error.general"));
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <RNStatusBar
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingHorizontal: 24 },
        ]}
      >
        {/* Back button repositioned and aligned with content */}
        <View className="pt-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white shadow-sm rounded-full p-3 w-10 h-10 justify-center items-center mb-6"
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

          <Text className="text-2xl font-bold text-ocean-blue mb-4">
            {i18n.t("signupPage.welcome")}
          </Text>
          <Text className="text-lg font-medium text-slate-grey mb-6">
            {i18n.t("signupPage.createAccount")}
          </Text>

          {serverError ? (
            <View className="bg-red-100 border border-red-200 rounded-md p-3 mb-4">
              <Text className="text-red-500">{serverError}</Text>
            </View>
          ) : null}

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              phoneNumber: "",
              phoneCode: "+971",
              dob: new Date(2000, 0, 1),
              accept: false,
            }}
            validationSchema={SignUpSchema}
            onSubmit={handleSignUp}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
              isValid,
              isSubmitting,
            }) => (
              <View className="space-y-3">
                {/* Name fields */}
                <View className="flex-row space-x-3">
                  <View className="flex-1">
                    <TextInput
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3"
                      placeholder={i18n.t("signupPage.firstName")}
                      placeholderTextColor="#888"
                      value={values.firstName}
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                    />
                    {errors.firstName && touched.firstName && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {errors.firstName}
                      </Text>
                    )}
                  </View>
                  <View className="flex-1">
                    <TextInput
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3"
                      placeholder={i18n.t("signupPage.lastName")}
                      placeholderTextColor="#888"
                      value={values.lastName}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                    />
                    {errors.lastName && touched.lastName && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {errors.lastName}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Email */}
                <View>
                  <TextInput
                    className="bg-white border border-gray-200 rounded-xl px-4 py-3"
                    placeholder={i18n.t("signupPage.email")}
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                  {errors.email && touched.email && (
                    <Text className="text-red-500 text-xs mt-1 ml-1">
                      {errors.email}
                    </Text>
                  )}
                </View>

                {/* Password */}
                <View>
                  <View className="relative">
                    <TextInput
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 pr-12"
                      placeholder={i18n.t("signupPage.password")}
                      placeholderTextColor="#888"
                      secureTextEntry={securePassword}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                    />
                    <TouchableOpacity
                      className="absolute right-4 top-0 h-full justify-center"
                      onPress={() => setSecurePassword(!securePassword)}
                    >
                      <MaterialIcons
                        name={securePassword ? "visibility-off" : "visibility"}
                        size={24}
                        color="#888"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password && (
                    <Text className="text-red-500 text-xs mt-1 ml-1">
                      {errors.password}
                    </Text>
                  )}
                  <Text className="text-gray-500 text-xs mt-1 ml-1">
                    {i18n.t("signupPage.passwordHint")}
                  </Text>
                </View>

                {/* Confirm Password */}
                <View>
                  <View className="relative">
                    <TextInput
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 pr-12"
                      placeholder={i18n.t("signupPage.confirmPassword")}
                      placeholderTextColor="#888"
                      secureTextEntry={secureConfirmPassword}
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                    />
                    <TouchableOpacity
                      className="absolute right-4 top-0 h-full justify-center"
                      onPress={() =>
                        setSecureConfirmPassword(!secureConfirmPassword)
                      }
                    >
                      <MaterialIcons
                        name={
                          secureConfirmPassword
                            ? "visibility-off"
                            : "visibility"
                        }
                        size={24}
                        color="#888"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text className="text-red-500 text-xs mt-1 ml-1">
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>

                {/* Phone Number */}
                <View className="flex-row space-x-3">
                  <View className="w-1/4">
                    <TextInput
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3"
                      placeholder="+971"
                      placeholderTextColor="#888"
                      keyboardType="phone-pad"
                      value={values.phoneCode}
                      onChangeText={handleChange("phoneCode")}
                      onBlur={handleBlur("phoneCode")}
                    />
                    {errors.phoneCode && touched.phoneCode && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {errors.phoneCode}
                      </Text>
                    )}
                  </View>
                  <View className="flex-1">
                    <TextInput
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3"
                      placeholder={i18n.t("signupPage.phoneNumber")}
                      placeholderTextColor="#888"
                      keyboardType="phone-pad"
                      value={values.phoneNumber}
                      onChangeText={handleChange("phoneNumber")}
                      onBlur={handleBlur("phoneNumber")}
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {errors.phoneNumber}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Date of Birth */}
                <View>
                  <Pressable onPress={() => setShowDatepicker(true)}>
                    <View
                      pointerEvents="none"
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3"
                    >
                      <TextInput
                        editable={false}
                        placeholder={i18n.t("signupPage.dob")}
                        placeholderTextColor="#888"
                        value={dateSelected ? formatDate(values.dob) : ""}
                      />
                    </View>
                  </Pressable>
                  {showDatepicker && (
                    <DateTimePicker
                      value={values.dob}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || values.dob;
                        setShowDatepicker(Platform.OS === "ios");
                        setFieldValue("dob", currentDate);
                        setDateSelected(true);
                      }}
                      maximumDate={new Date()}
                    />
                  )}
                  {errors.dob && touched.dob && (
                    <Text className="text-red-500 text-xs mt-1 ml-1">
                      {typeof errors.dob === "string"
                        ? errors.dob
                        : i18n.t("signupPage.validation.dobRequired")}
                    </Text>
                  )}
                </View>

                {/* Terms and Privacy Policy */}
                <View className="flex-row items-center mt-2">
                  <TouchableOpacity
                    onPress={() => setFieldValue("accept", !values.accept)}
                    className="mr-2"
                  >
                    <View
                      className={`w-5 h-5 border rounded ${
                        values.accept
                          ? "bg-baby-blue border-baby-blue"
                          : "border-gray-400"
                      } justify-center items-center`}
                    >
                      {values.accept && (
                        <MaterialIcons name="check" size={16} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                  <Text className="text-xs text-gray-700 flex-1">
                    {i18n.t("signupPage.acceptTerms")}{" "}
                    <Text className="text-baby-blue">
                      {i18n.t("signupPage.termsOfService")}
                    </Text>{" "}
                    {i18n.t("signupPage.and")}{" "}
                    <Text className="text-baby-blue">
                      {i18n.t("signupPage.privacyPolicy")}
                    </Text>
                  </Text>
                </View>
                {errors.accept && touched.accept && (
                  <Text className="text-red-500 text-xs mt-1 ml-1">
                    {errors.accept}
                  </Text>
                )}

                {/* Sign Up Button */}
                <View className="pt-4">
                  <TouchableOpacity
                    className={`${
                      !isValid || isSubmitting ? "bg-gray-300" : "bg-baby-blue"
                    } py-4 rounded-xl items-center my-2 shadow-sm`}
                    onPress={() => handleSubmit()}
                    disabled={!isValid || isSubmitting}
                  >
                    <Text className="text-white font-medium">
                      {i18n.t("signupPage.signUp")}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Login option */}
                <View className="flex-row justify-center my-4">
                  <Text className="text-gray-600">
                    {i18n.t("signupPage.haveAccount")}{" "}
                  </Text>
                  <TouchableOpacity onPress={() => router.push("/Login")}>
                    <Text className="text-baby-blue font-medium">
                      {i18n.t("login")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
});
