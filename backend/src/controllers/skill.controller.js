import Skill from "../models/Skill.js";

const getSkills = async (req, res) => {
  const skills = await Skill.find()
    .sort({ order: 1, createdAt: -1 })
    .lean();

  res.status(200).json({
    success: true,
    data: skills,
  });
};

const createSkill = async (req, res) => {
  const { name, category, icon, status, featured, order } = req.body;

  if (!name || !category) {
    return res.status(400).json({
      success: false,
      message: "Name and category are required",
    });
  }

  const skill = await Skill.create({
    name,
    category,
    icon,
    status,
    featured,
    order,
  });

  res.status(201).json({
    success: true,
    message: "Skill created successfully",
    data: skill,
  });
};

const updateSkill = async (req, res) => {
  const allowedFields = [
    "name",
    "category",
    "icon",
    "status",
    "featured",
    "order",
  ];

  const updates = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  const skill = await Skill.findByIdAndUpdate(
    req.params.id,
    updates,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Skill updated successfully",
    data: skill,
  });
};

const deleteSkill = async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Skill deleted successfully",
  });
};

export {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};