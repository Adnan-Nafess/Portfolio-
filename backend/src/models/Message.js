import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      maxlength: 254,
    },

    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: 200,
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: 5000,
    },

    status: {
      type: String,
      enum: ["unread", "read", "replied", "archived"],
      default: "unread",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

messageSchema.index({ createdAt: -1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;
