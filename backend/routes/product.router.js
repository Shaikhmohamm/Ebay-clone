import express from 'express'
import { addProduct, getListOfProducts, getProductById } from '../controller/product.controller.js'

const productRouter = express.Router()

productRouter.post('/add-product', addProduct)

// to get the product based on product id 
productRouter.get('/products', getListOfProducts)

// route for product detail
productRouter.get('/products/:id' , getProductById)

export default productRouter;