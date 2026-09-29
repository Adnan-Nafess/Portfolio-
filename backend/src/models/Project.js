import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [300, "Short description cannot exceed 300 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    liveUrl: {
      type: String,
      trim: true,
      default: "",
    },

    githubUrl: {
      type: String,
      trim: true,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    published: {
      type: Boolean,
      default: false,
      index: true,
    },

    challenges: {
      type: [String],
      default: [],
    },

    solutions: {
      type: [String],
      default: [],
    },

    learnings: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
