"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import img1 from '../../../public/register.jpg';
import axios from "axios"
import { toast } from "@/components/ui/use-toast";


const SignupPage = () => {
  
  const router = useRouter();
  

  // Define the initial form values
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  // Define the form validation schema using Yup
  const validationSchema = Yup.object({
    firstname: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastname: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character")
      .required("Password is required"),
  });

  // Handle form submission
  const handleSignup = async (values, { setSubmitting }) => {
  
    try {
      const response = await axios.post(`https://ebay-25ak.onrender.com/api/user/register`, values)
      console.log(response.data)
      if (response.data.success) {

        // clear the form fields
        setSubmitting(false);

        // success message display
        toast({
          title: "Success",
          description: "User registered successfully",
          variant: "destructive",
        });

        // navigate to signin page
        router.push("/signin"); // Redirect to the signin page
      }
    } catch (error) {
      console.log(`error`, error)
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-between lg:flex-row h-screen">
      {/* Image Section */}
      <div className="hidden lg:block">
        <Image
          src={img1}
          alt="Signup Image"
          width={700}
          height={300}
          className="rounded-lg"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6 lg:p-8">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="flex space-x-2">
                  {/* First Name Field */}
                  <div className="w-1/2">
                    <Field
                      id="firstname"
                      name="firstname"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-500 bg-gray-100 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="First name"
                    />
                    <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Last Name Field */}
                  <div className="w-1/2">
                    <Field
                      id="lastname"
                      name="lastname"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-500 bg-gray-100 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Last name"
                    />
                    <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                <div>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-500 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                <div>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-500 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 py-2 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
