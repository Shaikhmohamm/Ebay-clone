import express from 'express'
import { getAllCategory, getListOfProducts, getProductDetailsById } from '../controller/category.controller.js'

const categoryRouter = express.Router()

categoryRouter.get(`/category`, getAllCategory)

categoryRouter.get(`/products`, getListOfProducts)

// route for product detail
categoryRouter.get('/product/:id' , getProductDetailsById)


export default categoryRouter