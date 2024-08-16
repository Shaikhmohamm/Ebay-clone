import User from '../model/User.js';
import dotenv from 'dotenv'
dotenv.config()


export const addToWishlist = async (req, res) => {
    try {
        const { productId, title, price, image } = req.body;

        const userId = req.userId;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the item already exists in the wishlist
        const wishlistItem = user.wishlist.find(item => item.productId === productId);

        if (wishlistItem) {
            return res.status(200).json({ success: false, message: 'Item already in wishlist', wishlist: user.wishlist });
        } else {
            // If the item does not exist, add it to the wishlist
            user.wishlist.push({
                productId,
                title,
                price,
                image
            });

            // Save the updated user
            await user.save();

            return res.status(200).json({ success: true, message: 'Item added to wishlist', wishlist: user.wishlist });
        }
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// to get the cart data

export const getWishListData = async (req, res) => {
    try {
        const userId = req.userId // getting from authMiddleware after verification

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        // Send the cart data back in the response
        res.status(200).json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        console.error('Get Cart Error:', error);
        res.status(500).json({ success: false, message: 'Server error: Unable to fetch wishlist data' });
    }

}



// to remove one item from cart
export const removeOneItemFromWhishlist = async (req, res) => {
    const userId = req.userId
    const { productId } = req.params
    console.log(userId, productId)

    try {
        const user = await User.findById(userId);
        const wishlistItemIndex = user.wishlist.findIndex(item => item.productId === productId);

        if (wishlistItemIndex !== -1) {
            user.wishlist.splice(wishlistItemIndex, 1);  // Remove the item from wishlist
            await user.save();
            res.json({ message: 'Item removed from cart', wishlist: user.wishlist });
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// to remove all items from cart

export const removeAllItemFromWhishlist = async (req, res) => {
    const userId = req.userId;  // Assuming user ID is available in req.user

    try {
        const user = await User.findById(userId);

        user.wishlist = [];  // Clear the cart
        await user.save();
        res.json({ message: 'All items removed from cart', wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}