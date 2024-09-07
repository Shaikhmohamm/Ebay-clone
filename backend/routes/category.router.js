import express from 'express'
import { addCategory, addSubcategory, getAllCategory, getCategoryWithSubcategories, getListOfProducts, getProductDetailsById, getSubcategory } from '../controller/category.controller.js'

const categoryRouter = express.Router()

categoryRouter.get(`/category`, getAllCategory)

// get the products list based on subcatId
categoryRouter.get(`/products`, getListOfProducts)

// route for product detail
categoryRouter.get('/product/:id' , getProductDetailsById)



// route to add the category
categoryRouter.post('/categories/add', addCategory)

// Route to get a category along with its subcategories
categoryRouter.get('/categories', getCategoryWithSubcategories);

// Route for adding a subcategory
categoryRouter.post('/subcategory/add', addSubcategory);

// to get a sub-category
categoryRouter.get('/categories/:catId/subcategories', getSubcategory)

export default categoryRouter