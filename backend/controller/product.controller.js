import Product from '../model/Product.js';


// Controller to add a new product
export const addProduct = async (req, res) => {
    try {
        const {
            catId,
            subcatId,
            title,
            price,
            sales,
            rating,
            shippingFee,
            images,
            itemLocation,
            shippingLocation,
            properties
        } = req.body;

        // Create a new product instance
        const newProduct = new Product({
            catId,
            subcatId,
            title,
            price,
            sales,
            rating,
            shippingFee,
            images,
            itemLocation,
            shippingLocation,
            properties
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        // Respond with the saved product details
        res.status(201).json({
            message: 'Product added successfully',
            product: savedProduct
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({
            message: 'Failed to add product',
            error: error.message
        });
    }
};


export const getProductById = async (req, res) => {
    const { productId } = req.params;  // Get productId from the URL parameters
  
    console.log('Product ID:', productId);  // Log the productId for debugging
  
    try {
      // Find the product by its ID and populate category and subcategory references if needed
      const product = await Product.findById(productId)
        .populate('catId')      // Populate category details
        .populate('subcatId');  // Populate subcategory details
  
      // If product not found, return 404
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Return the product details
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).json({ error: 'Server error fetching product details' });
    }
    console.log('object')
  };
  

// Controller for searching products
export const searchProducts = async (req, res) => {
    const { name } = req.query;  // 'q' is the search term from frontend
    console.log(name)
    try {
      // If no query term is provided, return all products
      if (!name) {
        return res.status(400).json({ message: 'No search query provided.' });
      }
  
      // Find products that match the search term (using regex for partial matches)
      const products = await Product.find({
        title: { $regex: name, $options: 'i' },  // 'i' makes the search case-insensitive
      });
      console.log(products.length)
  
      // If no products are found, return a 404 status
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found.' });
      }
  
      // Return the matching products
      res.status(200).json(products);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ error: 'Server error while searching products' });
    }
  }; 
