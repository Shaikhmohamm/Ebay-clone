import express from 'express'
import { addCategory, addSubcategory, getAllCategory, getCategoryWithSubcategories } from '../controller/category.controller.js'

const categoryRouter = express.Router()

// This is used for home page
categoryRouter.get(`/category`, getAllCategory)

// route to add the category
categoryRouter.post('/categories/add', addCategory)

// Route to get a category along with its subcategories 
// used in dropdown to show all the added cats and subcats
categoryRouter.get('/categories', getCategoryWithSubcategories);

// Route for adding a subcategory
categoryRouter.post('/subcategory/add', addSubcategory);



export default categoryRouter