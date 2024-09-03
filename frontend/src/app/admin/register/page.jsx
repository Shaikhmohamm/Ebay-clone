// src/pages/AdminRegister.js
"use client"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AdminRegister = () => {
    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required')
    });

    const onSubmit = (values) => {
        console.log('Form data', values);
        // You can implement the API call to register the admin here
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Admin Register</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form>
                        <div className="mb-4">
                            <label className="block mb-1 text-gray-600">Username</label>
                            <Field
                                type="text"
                                name="username"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 text-gray-600">Email</label>
                            <Field
                                type="email"
                                name="email"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 text-gray-600">Password</label>
                            <Field
                                type="password"
                                name="password"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-1 text-gray-600">Confirm Password</label>
                            <Field
                                type="password"
                                name="confirmPassword"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Register
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default AdminRegister;
