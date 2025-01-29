"use client";

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

// Define validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().required("Password required"),
});

export default function LoginForm({ setIsLoading }: any) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = (values: any, { setErrors }: { setErrors: Function }) => {
    const API_BASE_URL_LOGIN = process.env.NEXT_PUBLIC_API_BASE_URL_LOGIN;

    setIsLoading(true);
    setErrorMessage(""); // Reset error message at the beginning

    console.log("Starting login process...");
    console.log("API_BASE_URL_LOGIN:", API_BASE_URL_LOGIN);

    axios
      .post(`${API_BASE_URL_LOGIN}`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response.status === 200 && response.data.token) {
          console.log("Login successful:", response.data);
          router.push(`/${response.data.username}/counter`);

          // Necessary CORS headers to allow requests from localhost:3000
          document.cookie = `userId=${response.data.userID}; SameSite=None; Secure;`;
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          axios.defaults.headers.common["Content-Type"] = "application/json";

          axios.interceptors.request.use(
            (config) => {
              config.headers["Authorization"] = `Bearer ${response.data.token}`;
              return config;
            },
            (error) => {
              return Promise.reject(error);
            }
          );
        } else {
          // Handle case where the response is not as expected
          setErrorMessage("Invalid login credentials");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        // Type assertion to access properties of the error object
        if (axios.isAxiosError(error)) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response) {
            console.error("Login error:", error.response.data);
            setErrorMessage(
              error.response.data.message || "Invalid login credentials"
            );
          } else if (error.request) {
            // The request was made but no response was received
            console.error("Login error:", error.request);
            setErrorMessage("No response from server");
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Login error:", error.message);
            setErrorMessage("Login error");
          }
        } else {
          console.error("Unexpected error:", error);
          setErrorMessage("Unexpected error occurred");
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={{ email: "", password: "" }}
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
        }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-baby-blue focus:ring-1 focus:ring-baby-blue"
              />
              {errors.email && touched.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-baby-blue focus:ring-1 focus:ring-baby-blue"
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <FontAwesomeIcon
                    size="sm"
                    color="#7D7D7D"
                    icon={isPasswordVisible ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="mailto:support@qmaster.com"
                className="text-sm text-baby-blue hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-baby-blue text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Log in
            </button>

            {/* Error Message */}
            {errorMessage && (
              <p className="mt-2 text-sm text-center text-red-600">
                {errorMessage}
              </p>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
              onClick={() => {
                // Handle Google sign in
                console.log("Google sign in clicked");
              }}
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </button>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-baby-blue hover:underline">
                  Create account
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Looking for work?{" "}
                <Link
                  href="/worker-app"
                  className="text-baby-blue hover:underline"
                >
                  Download our worker app
                </Link>
              </p>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
