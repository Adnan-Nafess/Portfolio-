import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      maxlength: 100,
    },

    category: {
      type: String,
      required: [true, "Skill category is required"],
      trim: true,
      maxlength: 50,
    },

    icon: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["experienced", "working", "learning"],
      default: "working",
    },

    featured: {
      type: Boolean,
      default: false,
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

skillSchema.index({ category: 1, order: 1 });

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
