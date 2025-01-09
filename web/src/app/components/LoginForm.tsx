"use client";

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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

  const handleNav = () => {
    router.push(`/AboHawa/counter`);
  } 

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
          // Store token in cookie/localStorage if needed
          document.cookie = `jwt=${response.data.token}; path=/;`;
          router.push(`/${response.data.firstName}/counter`);

          // Necessary CORS headers to allow requests from localhost:3000
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

    // if (response.status === 200 && response.data.token) {
    //   console.log("Login successful:", response.data);
    //   // Store token in cookie/localStorage if needed
    //   document.cookie = `jwt=${response.data.token}; path=/;`;
    //   router.push('/qmaster/counter');

    //   // Necessary CORS headers to allow requests from localhost:3000
    //   axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    //   axios.defaults.headers.common["Content-Type"] = "application/json";

    //   axios.interceptors.request.use(
    //     (config) => {
    //       config.headers["Authorization"] = `Bearer ${response.data.token}`;
    //       return config;
    //     },
    //     (error) => {
    //       return Promise.reject(error);
    //     }
    //   );
    // } else {
    //   // Handle case where the response is not as expected
    //   setErrorMessage("Invalid login credentials");
    //   setIsLoading(false);
    // }
    // // Type assertion to access properties of the error object
    // if (axios.isAxiosError(error)) {
    //   // The request was made and the server responded with a status code
    //   // that falls out of the range of 2xx
    //   if (error.response) {
    //     console.error("Login error:", error.response.data);
    //     setErrorMessage(
    //       error.response.data.message || "Invalid login credentials"
    //     );
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     console.error("Login error:", error.request);
    //     setErrorMessage("No response from server");
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.error("Login error:", error.message);
    //     setErrorMessage("Login error");
    //   }
    // } else {
    //   console.error("Unexpected error:", error);
    //   setErrorMessage("Unexpected error occurred");
    // }
    // setIsLoading(false);
  };

  return (
    <div className="w-1/2 my-8 flex justify-center items-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleNav} // handleLogin
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <form
            className="flex flex-col items-center justify-center w-full max-w-lg gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Enter your email"
              className="w-full rounded-full mb-2 px-4 py-3 sm:px-8 sm:py-4 bg-white text-gray-700 font-normal text-sm sm:text-lg outline-none border-none"
            />
            {errors.email && touched.email && (
              <span className="text-red-600 font-normal text-lg mb-2">
                {errors.email}
              </span>
            )}
            <div className="bg-white rounded-full mb-4 px-4 py-3 sm:px-8 sm:py-4 w-full flex justify-between items-center">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Enter your password"
                className="w-full rounded-full bg-white text-gray-700 font-normal text-sm sm:text-lg outline-none border-none"
              />
              <button
                onClick={handlePasswordVisibility}
                type="button"
                className="ml-2"
                >
                <FontAwesomeIcon size="lg" color="#7D7D7D" icon={isPasswordVisible ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.password && touched.password && (
              <span className="text-red-600 font-normal text-lg mb-2">
                {errors.password}
              </span>
            )}
            <Link
              href="mailto:hatemthedev@gmail.com"
              className="text-xs sm:text-md text-baby-blue underline mb-4"
            >
              Forgot Password
            </Link>
            <button
              type="submit"
              className="rounded-xl bg-baby-blue text-white text-md sm:text-xl font-semibold w-full px-4 py-3 sm:px-8 sm:py-4 mt-2"
            >
              Submit
            </button>
            {errorMessage && (
              <span className="text-red-600 font-normal text-md mt-4 text-center">
                {errorMessage}
              </span>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
}
