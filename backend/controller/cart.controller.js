import User from "../model/User.js";
import dotenv from 'dotenv'
dotenv.config()


export const addToCart = async (req, res) => {
    try {
        const { productId, title, price, image, quantity, size } = req.body;

        const userId = req.userId;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Find the cart item with the same product ID and size
        const cartItem = user.cart.find((item) =>
            item.productId === productId && item.size === size
        );

        if (cartItem) {
            // If the same quantity is provided again, don't change anything
            if (cartItem.quantity === quantity) {
                return res.status(200).json({ success: false, message: 'Item already in cart with the same quantity', cart: user.cart });
            } else {
                // Update the quantity by adding the new quantity to the existing one
                cartItem.quantity = quantity;

                // Save the user after updating the cart
                await user.save();

                return res.status(200).json({ success: true, message: 'Quantity updated in cart', cart: user.cart });
            }
        } else {
            // If the item doesn't exist in the cart, add it
            user.cart.push({
                productId,
                title,
                price,
                image,
                quantity,
                size
            });

            // Save the user after adding the new item to the cart
            await user.save();

            return res.status(200).json({ success: true, message: 'Item added to cart', cart: user.cart });
        }
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};




// to get the cart data

export const getCartData = async (req, res) => {
    try {
        const userId = req.userId // getting from authMiddleware after verification

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        // Send the cart data back in the response
        res.status(200).json({ success: true, cart: user.cart });
    } catch (error) {
        console.error('Get Cart Error:', error);
        res.status(500).json({ success: false, message: 'Server error: Unable to fetch cart data' });
    }

}


// to handle the update cart
// export const getUpdatedcart = async (req, res) => {
//     const userId = req.userId

//     const { productId } = req.params
//     const { quantity } = req.body;
//     // console.log(productId, quantity)

//     try {
//         const user = await User.findById(userId);
//         const cartItem = user.cart.find(item => item.productId === productId);

//         if (cartItem) {
//             cartItem.quantity = quantity;
//             await user.save();
//             res.json({ message: 'Cart updated', cart: user.cart });
//         } else {
//             res.status(404).json({ message: 'Item not found in cart' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// }



// to remove one item from cart
export const removeOneItemFromCart = async (req, res) => {
    const userId = req.userId
    const { productId } = req.params

    try {
        const user = await User.findById(userId);
        const cartItemIndex = user.cart.findIndex(item => item.productId === productId);

        if (cartItemIndex !== -1) {
            user.cart.splice(cartItemIndex, 1);  // Remove the item from cart
            await user.save();
            res.json({ message: 'Item removed from cart', cart: user.cart });
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// to remove all items from cart

export const removeAllItemFromCart = async (req, res) => {
    const userId = req.userId;  // Assuming user ID is available in req.user

    try {
        const user = await User.findById(userId);

        user.cart = [];  // Clear the cart
        await user.save();
        res.json({ message: 'All items removed from cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}