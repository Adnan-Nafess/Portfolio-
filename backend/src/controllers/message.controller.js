import Message from "../models/Message.js";

const createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const newMessage = await Message.create({
    name,
    email,
    subject,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: {
      id: newMessage._id,
    },
  });
};

const getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 }).lean();

  res.status(200).json({
    success: true,
    data: messages,
  });
};

const updateMessage = async (req, res) => {
  const allowedStatuses = ["unread", "read", "replied", "archived"];

  if (!allowedStatuses.includes(req.body.status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid message status",
    });
  }

  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Message not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Message status updated",
    data: message,
  });
};

const deleteMessage = async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Message not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
};

export { createMessage, getMessages, updateMessage, deleteMessage };
