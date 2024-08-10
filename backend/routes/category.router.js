import express from 'express'
import { getAllCategory } from '../controller/category.controller.js'

const categoryRouter = express.Router()

categoryRouter.get(`/category`, getAllCategory)







export default categoryRouter