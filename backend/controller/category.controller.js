import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
import category from '../data/categoryList.js'


export const getAllCategory = async (req, res) => {
    try {
        res.status(200).send(category)
    } catch (error) {
        console.log("error" , error)
    }
}