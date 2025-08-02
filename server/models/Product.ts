import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product;
