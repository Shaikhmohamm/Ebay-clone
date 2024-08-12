import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
import category from '../data/categoryList.js'


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
  