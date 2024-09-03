import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // Reference to the Category model
    required: true,
  },
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

export default Subcategory;
