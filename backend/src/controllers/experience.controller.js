import Experience from "../models/Experience.js";

const getExperiences = async (req, res) => {
  const experiences = await Experience.find()
    .sort({ current: -1, startDate: -1, order: 1 })
    .lean();

  res.status(200).json({
    success: true,
    data: experiences,
  });
};

const createExperience = async (req, res) => {
  const {
    company,
    role,
    type,
    location,
    startDate,
    endDate,
    current,
    description,
    technologies,
    order,
  } = req.body;

  if (!company || !role || !startDate) {
    return res.status(400).json({
      success: false,
      message: "Company, role and start date are required",
    });
  }

  const experience = await Experience.create({
    company,
    role,
    type,
    location,
    startDate,
    endDate: current ? null : endDate,
    current,
    description,
    technologies,
    order,
  });

  res.status(201).json({
    success: true,
    message: "Experience created successfully",
    data: experience,
  });
};

const updateExperience = async (req, res) => {
  const allowedFields = [
    "company",
    "role",
    "type",
    "location",
    "startDate",
    "endDate",
    "current",
    "description",
    "technologies",
    "order",
  ];

  const updates = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  if (updates.current === true) {
    updates.endDate = null;
  }

  const experience = await Experience.findByIdAndUpdate(
    req.params.id,
    updates,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!experience) {
    return res.status(404).json({
      success: false,
      message: "Experience not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Experience updated successfully",
    data: experience,
  });
};

const deleteExperience = async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);

  if (!experience) {
    return res.status(404).json({
      success: false,
      message: "Experience not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Experience deleted successfully",
  });
};

export { getExperiences, createExperience, updateExperience, deleteExperience };
