import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
    catId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subcatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    sales: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    shippingFee: {
        type: String,
        default: 0,
    },
    images: {
        type: [String], // Array of image URLs or file paths
        required: true,
    },
    itemLocation: {
        type: String,
        required: true,
    },
    shippingLocation: {
        type: String,
        required: true,
    },
    properties: [
        {
            name: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
  
  // Middleware to update `updatedAt` before saving
  productSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });
  
  const Product = mongoose.model('Product', productSchema);
  
  export default Product;