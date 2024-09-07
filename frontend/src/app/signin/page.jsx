"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../../public/images.png"
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { login } from "@/redux/slice/authSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";


const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  // Setting the initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Setting the form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

// Handle form submission
const handleLogin = async (values, { setSubmitting }) => {
  try {
    const response = await axios.post(`https://ebay-25ak.onrender.com/api/user/login`, values);
    // console.log(response.data)

    const { success, loginToken, role, isVerified } = response.data;
    // if (!isVerified) { 
    //   console.log("not verified")
    // }

    if (role === 'user' && success) {
      // set isauthenticate to true
      dispatch(login())
      // Store the token in a cookie
      Cookies.set('UserAuth', loginToken, {
        expires: 7, // Token will expire in 7 days
      });

      // display a toast notification
      toast({
        title: "Success",
        description: "User logged in successfully",
        variant: "destructive",
      });

      setSubmitting(false);
      router.push("/"); // Redirect
    } 
    else if (!isVerified) {
      console.log("Not a verified admin")
      // display a toast notification
      toast({
        title: "Success",
        description: "You are not a verified admin",
        variant: "destructive",
      });
      // router.push(`/admin/dashboard`)
    }
    else if (role === 'admin' && success && isVerified) {
      // set isauthenticate to true
      dispatch(login())
      // Store the token in a cookie
      Cookies.set('UserAuth', loginToken, {
        expires: 7, // Token will expire in 7 days
      });
      console.log(`you are verified now`)
      // display a toast notification
      toast({
        title: "Success",
        description: "admin logged in successfully",
        variant: "destructive",
      });
      router.push(`/welcome`)
    }
    else {
      toast({
        title: "Failed",
        description: "Enter correct email/password",
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong. Please try again later.",
      variant: "destructive",
    });

  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="flex items-center w-full justify-center min-h-screen">   
      <Link href="/" passHref legacyBehavior>
        <a>
          <Image
            src={logo}
            alt="logo"
            width={150}
            height={100}
            className="absolute top-0 left-0 hidden lg:block"
          />
        </a>
      </Link>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Sign In</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-2 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center text-sm text-gray-600 mt-4">
          Do not have an account?{" "}
          <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
