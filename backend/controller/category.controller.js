import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
import category from '../data/categoryList.js'
import Category from '../model/Category.js'
import Subcategory from '../model/SubCategory.js'



const BASE_URL = process.env.BASE_URL
const API_KEY = process.env.API_KEY
const HOST = process.env.HOST 


export const getAllCategory = async (req, res) => {
    try {
        res.status(200).send(category)
    } catch (error) {
        console.log("error" , error)
    }
}


export const getListOfProducts = async (req, res) => {
    const { name, page = 0 } = req.query;
  
    try {
        const response = await axios.get(`${BASE_URL}/item_search_2`, {
            params: {
              q: name,
              page: page,
              sort: 'default'
            },
            headers: {
              "x-rapidapi-key": API_KEY,
              "x-rapidapi-host": HOST
            }
          });
  
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }


  export const getProductDetailsById = async (req, res) => {
    const producId = req.params.id

    try {
        const response = await axios.get(`${BASE_URL}/item_detail`, {
            params: {
                itemId: producId
            },
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": HOST
            }
        })

        res.json(response.data.result)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product details' });
    }
}
  


// controller for adding the category
export const addCategory = async (req, res) => {
    try {
      const { name, subcategories } = req.body;
  
      // Create the category
      const category = new Category({ name });
  
      // Save subcategories if provided
      const formattedSubcategories = [];
      if (subcategories && subcategories.length > 0) {
        for (const subcategoryName of subcategories) {
          // Create each subcategory
          const subcategory = new Subcategory({ name: subcategoryName, catId: category._id });
          await subcategory.save();
  
          // Add the subcategory with `subcatid` and `name`
          formattedSubcategories.push({
            subcatid: subcategory._id,
            name: subcategory.name,
          });
        }
        category.subcategories = formattedSubcategories;
      }
  
      await category.save();
  
      // Format the response to include only `catid` and structured `subcategories`
      const response = {
        catid: category._id,
        name: category.name,
        subcategories: formattedSubcategories,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      };
  
      res.status(201).json({ message: 'Category created successfully', category: response });
    } catch (error) {
      res.status(500).json({ message: 'Error creating category', error });
    }
  };



// for adding sub-category seperately
export const addSubcategory = async (req, res) => {
    try {
        const { catId, subcatName } = req.body;

        // Find the existing category by catId
        const category = await Category.findOne({ catId });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Create a new subcategory
        const subcategory = new Subcategory({
            name: subcatName,
            catId: category.catId, // Reference the existing category's ID
        });

        // Push the new subcategory into the subcategories array
        category.subcategories.push({
            subcatid: subcategory._id,
            name: subcategory.name,
        });

        // Save the subcategory and the updated category
        await subcategory.save();
        await category.save();

        res.status(201).json({
            message: 'Subcategory added successfully',
            category,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding subcategory', error });
    }
};


  // Get a category along with its subcategories
export const getCategoryWithSubcategories = async (req, res) => {
    try {
      
      // get all the categories
      const category = await Category.find({}).populate('subcategories');
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({category});
    } catch (error) {
      res.status(500).json({ message: 'Error fetching category', error });
    }
  };


  // get a sub-category
  export const getSubcategory = async (req, res) => {
    try {
      const { catId } = req.params;
  
      // Find the category by catId
      const category = await Category.findOne({ catId });
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({
        message: 'Subcategory retrieved successfully',
        subcategory : category.subcategories,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving subcategory', error });
    }
  };