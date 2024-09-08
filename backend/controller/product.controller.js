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

export const getListOfProducts = async (req, res) => {
  const { subcatid, name } = req.query;  // Get subcatid and name (search input) from query parameters
  // console.log('Subcategory ID:', subcatid);
  // console.log('Search Name:', name);

  try {
    // Build a dynamic query object based on the available query parameters
    let query = {};

    // If subcatid is provided, filter by subcategory ID
    if (subcatid) {
      query.subcatId = subcatid;
    }

    // If name is provided, perform a case-insensitive search on the product title
    if (name) {
      query.title = { $regex: name, $options: 'i' };  // Case-insensitive search using regex
    }

    // Find products based on the constructed query
    const products = await Product.find(query);

    console.log(`Found ${products.length} products`);

    // If no products are found, return a 404 status
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found.' });
    }

    // Return the found products
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
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