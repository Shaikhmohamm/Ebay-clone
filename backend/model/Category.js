import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
    subcatid: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,  // Automatically generate ObjectId for each subcategory
    },
    name: {
      type: String,
      required: true,
    },
  }, { _id: false });  // Disable the default `_id` field



  const categorySchema = new mongoose.Schema({
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      alias: 'id', // Alias for _id
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    subcategories: [subcategorySchema],
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
categorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
