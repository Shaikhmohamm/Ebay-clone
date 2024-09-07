import express from 'express'
import { addProduct, getProductById, searchProducts } from '../controller/product.controller.js'

const productRouter = express.Router()

productRouter.post('/add-product', addProduct)

// to get the product based on product id 
productRouter.get('/products/:productId', getProductById)

// to get the product based on user search
productRouter.get('/search/product', searchProducts)

export default productRouter;