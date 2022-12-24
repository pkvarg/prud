import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    author: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    excerpt: {
      type: Object,
    },

    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    catalog: { type: String },
    weight: { type: String },
    related: { type: Object },
    related2: { type: Object },
    related3: { type: Object },
    discount: { type: Number },
    discountedPrice: { type: Number },
    tags: { type: String },
    language: { type: String },
    binding: { type: String },
    pages: { type: String },
    isbn: { type: String },
    year: { type: Number },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
