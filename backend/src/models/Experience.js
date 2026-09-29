import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    type: {
      type: String,
      enum: ["internship", "full-time", "part-time", "freelance"],
      default: "full-time",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    current: {
      type: Boolean,
      default: false,
    },

    description: {
      type: [String],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
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

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
