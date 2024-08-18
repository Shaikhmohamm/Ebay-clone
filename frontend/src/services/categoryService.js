import axios from 'axios';

export const fetchCategories = async () => {
  try {
    const response = await axios.get('https://ebay-25ak.onrender.com/api/category');
    return response.data.result.resultList.slice(2, 11);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};