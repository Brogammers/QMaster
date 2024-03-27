"use client";

import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { login, setUser } from "../redux/authSlice";

// Define validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().required("Password required"),
});

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  // const dispatch = useDispatch();

  function extractUsername(email: string) {
    const usernamePart = email.substring(0, email.indexOf("@"));
    const username = usernamePart.replace(/[^\w\s-]/g, "");
    return username;
  }

  const handleLogin = async (values: { email: string; password: string }) => {
    // try {
    //   const response = await signInWithEmailAndPassword(
    //     auth,
    //     values.email,
    //     values.password
    //   );
    //   console.log({ response });
    //   const username = extractUsername(values.email);
    //   dispatch(login(username));
    //   router.push(`/${username}`);
    // } catch (error) {
    //   console.error(error);
    //   setErrorMessage(
    //     "An error has occurred, please try again. If the error persists, please contact us at hatemthedev@gmail.com"
    //   );
    // }
    console.log("Logging in...");
  };

  return (
    <div className="w-1/2 max-w-md my-8">
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
            className="flex flex-col items-center justify-center w-full gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Enter your email"
              className="w-full rounded-full mb-2 px-8 py-4 bg-blue-100 text-gray-700 font-normal text-lg outline-none border-none"
            />
            {errors.email && touched.email && (
              <span className="text-red-500 font-normal text-lg mb-2">
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
              className="w-full rounded-full mb-4 px-8 py-4 bg-blue-100 text-gray-700 font-normal text-lg outline-none border-none"
            />
            {errors.password && touched.password && (
              <span className="text-red-500 font-normal text-lg mb-2">
                {errors.password}
              </span>
            )}
            <Link
              href="mailto:hatemthedev@gmail.com"
              className="text-[#1DCDFE] underline mb-4"
            >
              Forgot Password
            </Link>
            <button
              type="submit"
              className="rounded-xl bg-[#1DCDFE] text-white text-xl font-semibold w-full px-8 py-4 mt-2"
            >
              Submit
            </button>
            {errorMessage && (
              <span className="text-red-500 font-normal text-md mt-4 text-center">
                {errorMessage}
              </span>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
}
