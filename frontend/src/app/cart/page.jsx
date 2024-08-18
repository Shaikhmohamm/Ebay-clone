"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ShoppingCart, Trash } from "lucide-react";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

const Cart = () => {

    const [totalCost, setTotalCost] = useState(0);
    const [items, setItems] = useState([]);

    // get all products from cart-database and add them to state
    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                let token = Cookies.get('UserAuth')
                const response = await axios.get(
                    "https://ebay-25ak.onrender.com/api/cart/data",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data)
                const data = response.data.cart;
                setItems(data);
            } catch (error) {
                console.log("ERROR : ", error);
            }
        };

        fetchCartDetails();
    }, []);

    // to remove all products
    const removeAllProducts = async () => {
        try {
            let token = Cookies.get('UserAuth')
            const response = await axios.delete(
                "https://ebay-25ak.onrender.com/api/cart/removeall",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            toast({
                title: "Success",
                description: "All items removed",
                variant: "destructive",
              });
            console.log("ALL PRODUCTS REMOVED SUCCESSFULLY");
    
            const data = response.data.cart;
            setItems(data); // Update the state with the remaining items
        } catch (error) {
            console.log("ERROR : ", error);
        }
    };
    // to remove one product from cart
    const removeProductById = async (item) => {
        let token = Cookies.get('UserAuth')
        const id = item.productId; // Keep productId as it is
        try {
    
            const response = await axios.delete(
                `https://ebay-25ak.onrender.com/api/cart/removeone/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            toast({
                title: "Success",
                description: "Item removed",
                variant: "destructive",
              });

            console.log("REMOVED SUCCESSFULLY");
    
            const data = response.data.cart;
            setItems(data); // Update the state with the remaining items
        } catch (error) {
            console.log("ERROR : ", error);
        }
    };


    // update total cost after adding products to state
    useEffect(() => {
        let cost = 0;
        if (items) {
            items.forEach((item) => {
                cost += Number(item.price) * item.quantity;
            });
        }
        setTotalCost(cost);
        console.log("cart items : ", items);
    }, [items, totalCost]);

    return (
        <div className='lg:flex justify-center'>
            <Card className="w-full max-w-5xl">
                <CardHeader>
                    <CardTitle>Shopping Cart ({items ? items.length : 0})</CardTitle>
                    {items && items.length > 0 && (
                        <CardDescription className="md:self-end hover:text-red-500">
                            <button onClick={removeAllProducts} className="mt-2">
                                Remove All Products
                            </button>
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent className="flex flex-col gap-10 mt-10">
                    {items && items.length > 0 ? (
                        items.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center md:items-start gap-8 mb-5"
                            >
                                <div className="w-20 md:w-44 h-20 md:h-44 relative rounded-md flex-shrink-0">
                                    <img
                                        src={`https:${item.image}`}
                                        alt="img"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 md:gap-4 flex-1">
                                    <button
                                        // onClick={() => handleProductInfo(item)}
                                        className="text-start"
                                    >
                                        <div className="line-clamp-1 md:line-clamp-2">
                                            {item.title}
                                        </div>
                                    </button>

                                    <div className="font-bold">₹ {item.price.toFixed(2)}</div>

                                    <div className="flex flex-col gap-2">
                                        <div> Quantity: {item.quantity}</div>
                                    </div>
                                </div>
                                <button onClick={() => removeProductById(item)}>
                                    <Trash className="w-5 md:w-6 h-5 md:h-6 hover:text-red-500" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-10">
                            <ShoppingCart className="w-56 h-56 text-gray-300" />
                            <div className="font-bold text-xl text-center">
                                No items yet? Continue shopping to explore more.
                            </div>
                            <Link
                                href="/"
                                className="px-5 py-3 rounded-3xl bg-red-500 text-white hover:scale-105 hover:bg-red-600 hover:font-bold transition-all duration-300"
                            >
                                Explore More Items
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
            {/* SUMMARY / TOTAL-COST */}
            {items && items.length > 0 ? (
                <Card className="w-full lg:max-w-sm">
                    <CardHeader>
                        <CardTitle>Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-10 mt-10">
                        <div className="flex justify-between font-bold">
                            <div>Total</div>
                            <div>₹ {totalCost.toFixed(2)}</div>
                        </div>
                        <button className="w-full px-5 py-3 rounded-3xl bg-red-500 text-white font-bold hover:font-extrabold transition-all duration-300">
                            Checkout ({items ? items.length : 0})
                        </button>
                    </CardContent>
                </Card>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default Cart