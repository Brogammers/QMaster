"use client";

import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import SplashScreen from "../shared/SplashScreen";
import axios, { AxiosError } from "axios";
import { API_BASE_URL_LOGIN } from "@env";
// import { useDispatch } from "react-redux";
// import { login, setUser } from "../redux/authSlice";

// Define validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().required("Password required"),
});

export default function LoginForm({ setIsLoading }: any) {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  // const dispatch = useDispatch();

  function extractUsername(email: string) {
    const usernamePart = email.substring(0, email.indexOf("@"));
    const username = usernamePart.replace(/[^\w\s-]/g, "");
    return username;
  }

  // const handleLogin = (values: { email: string; password: string }) => {
  const handleLogin = async (
    values: any,
    { setErrors }: { setErrors: Function }
  ) => {
    const result = await signIn('credentials', {
      redirect: false,
      username: values.email,
      password: values.password,
    });

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      router.push('../[entity]/counter'); // Redirect to your dashboard or home page
    }
  };

  return (
    <div className="w-1/2 my-8 flex justify-center items-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
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
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Enter your password"
              className="w-full rounded-full mb-4 px-4 py-3 sm:px-8 sm:py-4 bg-white text-gray-700 font-normal text-sm sm:text-lg outline-none border-none"
            />
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
              // onClick={() => handleLogin()}
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
