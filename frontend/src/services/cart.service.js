// service/cartService.js
import axios from 'axios';


export const fetchCartDetails = async () => {
  try {
    const response = await axios.get('https://ebay-25ak.onrender.com/api/cart/data', {
      headers: {
        Authorization: document.cookie, // Adjust this if you use a different way to handle authentication
      },
    });
    return response.data?.cart;
  } catch (error) {
    console.error('ERROR : ', error);
    throw error; // Rethrow the error so that it can be handled in the component
  }
};
