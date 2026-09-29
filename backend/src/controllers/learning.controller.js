import Learning from "../models/Learning.js";

const getLearning = async (req, res) => {
  const learning = await Learning.find()
    .sort({ order: 1, createdAt: -1 })
    .lean();

  res.status(200).json({
    success: true,
    data: learning,
  });
};

const createLearning = async (req, res) => {
  const {
    title,
    category,
    description,
    status,
    progress,
    technologies,
    resourceUrl,
    order,
  } = req.body;

  if (!title || !category) {
    return res.status(400).json({
      success: false,
      message: "Title and category are required",
    });
  }

  const learning = await Learning.create({
    title,
    category,
    description,
    status,
    progress,
    technologies,
    resourceUrl,
    order,
  });

  res.status(201).json({
    success: true,
    message: "Learning item created successfully",
    data: learning,
  });
};

const updateLearning = async (req, res) => {
  const allowedFields = [
    "title",
    "category",
    "description",
    "status",
    "progress",
    "technologies",
    "resourceUrl",
    "order",
  ];

  const updates = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  const learning = await Learning.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!learning) {
    return res.status(404).json({
      success: false,
      message: "Learning item not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Learning item updated successfully",
    data: learning,
  });
};

const deleteLearning = async (req, res) => {
  const learning = await Learning.findByIdAndDelete(req.params.id);

  if (!learning) {
    return res.status(404).json({
      success: false,
      message: "Learning item not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Learning item deleted successfully",
  });
};

export { getLearning, createLearning, updateLearning, deleteLearning };
