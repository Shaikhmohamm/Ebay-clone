"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "@/components/ui/use-toast";
import Unauthorized from "@/components/Unauthorized";


const AdminAddProduct = () => {

    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(null); // State to track authorization status
    const [imageUrls, setImageUrls] = useState([""]);

    useEffect(() => {
        const checkAdminAuth = async () => {
          try {
            const response = await axios.get('http://localhost:3001/api/admin/check-auth', { withCredentials: true });
            console.log(response.data.success)
            // If authentication fails, set isAuthorized to false
            if (!response.data.success) {
              setIsAuthorized(false);
            } else {
              // If authentication succeeds, set isAuthorized to true and fetch categories
              setIsAuthorized(true);
            }
          } catch (error) {
            console.error('Authentication error:', error);
            setIsAuthorized(false);
          }
        };
    
        checkAdminAuth();
      }, [router]);

    // Setting the initial form values
    const initialValues = {
        catId: "",
        subcatId: "",
        title: "",
        price: "",
        sales: "",
        rating: "",
        shippingFee: "",
        images: imageUrls,
        itemLocation: "",
        shippingLocation: "",
        properties: [
            { name: "", value: "" }
        ]
    };

    // Setting the form validation schema using Yup
    const validationSchema = Yup.object({
        catId: Yup.string().required("Category ID is required"),
        subcatId: Yup.string().required("Subcategory ID is required"),
        title: Yup.string().required("Title is required"),
        price: Yup.number().required("Price is required").positive("Price must be positive"),
        sales: Yup.number().required("Sales count is required").positive("Sales must be positive"),
        rating: Yup.number().required("Rating is required").min(0, "Rating cannot be less than 0").max(5, "Rating cannot be more than 5"),
        shippingFee: Yup.number().required("Shipping fee is required").positive("Shipping fee must be positive"),
        images: Yup.array().of(Yup.string().url("Invalid URL")).required("At least one image is required"),
        itemLocation: Yup.string().required("Item location is required"),
        shippingLocation: Yup.string().required("Shipping location is required"),
        properties: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required("Property name is required"),
                value: Yup.string().required("Property value is required")
            })
        )
    });

    // Handle form submission
    const handleAddProduct = async (values, { setSubmitting }) => {
        console.log(values)
        try {
            const response = await axios.post('https://ebay-25ak.onrender.com/api/add-product', values);
            if (response.data.success) {
                setSubmitting(false);
                // Redirect or show success message
                toast({
                    title: "Success",
                    description: "Product added sucessfully",
                    variant: "destructive",
                });
                // router.push("/admin/products");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };


    // Show unauthorized page if the user is not authorized
    if (isAuthorized === false) {
        return <Unauthorized />;
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleAddProduct}
            >
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form className="space-y-4">
                        {/* Category and Subcategory */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Field name="catId" type="text" placeholder="Category ID" className="w-full p-2 border border-gray-300 rounded" />
                                <ErrorMessage name="catId" component="div" className="text-red-600 text-sm" />
                            </div>
                            <div>
                                <Field name="subcatId" type="text" placeholder="Subcategory ID" className="w-full p-2 border border-gray-300 rounded" />
                                <ErrorMessage name="subcatId" component="div" className="text-red-600 text-sm" />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <Field name="title" type="text" placeholder="Title" className="w-full p-2 border border-gray-300 rounded" />
                            <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
                        </div>

                        {/* Price */}
                        <div>
                            <Field name="price" type="number" placeholder="Price" className="w-full p-2 border border-gray-300 rounded" />
                            <ErrorMessage name="price" component="div" className="text-red-600 text-sm" />
                        </div>

                        {/* Sales */}
                        <div>
                            <Field name="sales" type="number" placeholder="Sales Count" className="w-full p-2 border border-gray-300 rounded" />
                            <ErrorMessage name="sales" component="div" className="text-red-600 text-sm" />
                        </div>

                        {/* Rating */}
                        <div>
                            <Field name="rating" type="number" step="0.1" placeholder="Rating (0-5)" className="w-full p-2 border border-gray-300 rounded" />
                            <ErrorMessage name="rating" component="div" className="text-red-600 text-sm" />
                        </div>

                        {/* Shipping Fee */}
                        <div>
                            <Field name="shippingFee" type="number" placeholder="Shipping Fee" className="w-full p-2 border border-gray-300 rounded" />
                            <ErrorMessage name="shippingFee" component="div" className="text-red-600 text-sm" />
                        </div>

                        {/* Item Location */}
                        <div>
                            <Field name="itemLocation" type="text" placeholder="Item Location" className="w-full p-2 border border-gray-300 rounded" />
                            <ErrorMessage name="itemLocation" component="div" className="text-red-600 text-sm" />
                        </div>

                        {/* Shipping Location */}
                        <div>
                            <Field name="shippingLocation" type="text" placeholder="Shipping Location" className="w-full p-2 border border-gray-300 rounded" />
                            <ErrorMessage name="shippingLocation" component="div" className="text-red-600 text-sm" />
                        </div>

                        {/* Images */}
                        <div>
                            <FieldArray name="images">
                                {({ push, remove }) => (
                                    <div>
                                        {values.images.map((image, index) => (
                                            <div key={index} className="flex space-x-2 mb-2">
                                                <Field name={`images.${index}`} type="text" placeholder="Image URL" className="w-full p-2 border border-gray-300 rounded" />
                                                <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => push("")} className="text-blue-500">Add Image</button>
                                    </div>
                                )}
                            </FieldArray>
                            <ErrorMessage name="images" component="div" className="text-red-600 text-sm" />
                        </div>

                        {/* Properties */}
                        <div>
                            <FieldArray name="properties">
                                {({ push, remove }) => (
                                    <div>
                                        {values.properties.map((property, index) => (
                                            <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                                                <Field
                                                    name={`properties.${index}.name`}
                                                    type="text"
                                                    placeholder="Property Name"
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                                <Field
                                                    name={`properties.${index}.value`}
                                                    type="text"
                                                    placeholder="Property Value"
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="text-red-500 col-span-2"
                                                >
                                                    Remove Property
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => push({ name: "", value: "" })}
                                            className="text-blue-500"
                                        >
                                            Add Property
                                        </button>
                                    </div>
                                )}
                            </FieldArray>

  
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-6 py-2 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            {isSubmitting ? "Adding Product..." : "Add Product"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AdminAddProduct;
