import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { addToWishlist, getWishListData, removeOneItemFromWhishlist, removeAllItemFromWhishlist } from '../controller/wishlist.controller.js'

const wishlistRouter = express.Router()

// request to add in the wishlist
wishlistRouter.post('/wishlist/add', authMiddleware, addToWishlist)

// request to get the cart wishlist
wishlistRouter.get(`/wishlist/data`, authMiddleware, getWishListData)

// request to remove one item from wishlist
wishlistRouter.delete(`/wishlist/removeone/:productId`, authMiddleware, removeOneItemFromWhishlist)

// request to remove all items from wishlist
wishlistRouter.delete(`/wishlist/removeall`, authMiddleware, removeAllItemFromWhishlist)


export default wishlistRouter