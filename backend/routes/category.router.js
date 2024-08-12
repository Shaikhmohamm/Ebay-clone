import express from 'express'
import { getAllCategory, getListOfProducts } from '../controller/category.controller.js'

const categoryRouter = express.Router()

categoryRouter.get(`/category`, getAllCategory)

categoryRouter.get(`/products`, getListOfProducts)




export default categoryRouter