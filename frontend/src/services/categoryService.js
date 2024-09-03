import axios from 'axios';

export const fetchCategories = async () => {
  try {
    const response = await axios.get('https://ebay-25ak.onrender.com/api/categories');
    return response.data.category;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};