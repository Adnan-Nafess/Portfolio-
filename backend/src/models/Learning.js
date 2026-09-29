import mongoose from "mongoose";

const learningSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    status: {
      type: String,
      enum: ["planned", "learning", "completed"],
      default: "learning",
    },

    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    technologies: {
      type: [String],
      default: [],
    },

    resourceUrl: {
      type: String,
      trim: true,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Learning = mongoose.model("Learning", learningSchema);

export default Learning;
