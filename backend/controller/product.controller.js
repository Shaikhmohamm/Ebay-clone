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
