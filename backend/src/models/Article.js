import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Article title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    excerpt: {
      type: String,
      required: [true, "Article excerpt is required"],
      trim: true,
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },

    content: {
      type: String,
      required: [true, "Article content is required"],
    },

    coverImage: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    tags: {
      type: [String],
      default: [],
    },

    readingTime: {
      type: Number,
      default: 1,
      min: 1,
    },

    published: {
      type: Boolean,
      default: false,
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
