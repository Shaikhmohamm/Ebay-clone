import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { addToCart, getCartData, removeOneItemFromCart, removeAllItemFromCart} from '../controller/cart.controller.js'

const cartRouter = express.Router()

// request to add in the cart
cartRouter.post('/cart/add', authMiddleware, addToCart)

// request to get the cart data
cartRouter.get(`/cart/data`, authMiddleware, getCartData)

// request to handle the update
// cartRouter.patch(`/cart/:productId`, authMiddleware, getUpdatedcart)

// request to remove one item from cart
cartRouter.delete(`/cart/removeone/:productId`, authMiddleware, removeOneItemFromCart)

// request to remove all items from cart
cartRouter.delete(`/cart/removeall`, authMiddleware, removeAllItemFromCart)

export default cartRouter