import Project from "../models/Project.js";
import slugify from "../utils/slugify.js";

// GET /api/projects
const getProjects = async (req, res) => {
  const { page = 1, limit = 10, category, featured, search, admin } = req.query;

  const pageNumber = Math.max(Number(page) || 1, 1);
  const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 50);

  const filter = {};

  // Public users only see published projects
  if (admin !== "true") {
    filter.published = true;
  }

  if (category) {
    filter.category = category;
  }

  if (featured !== undefined) {
    filter.featured = featured === "true";
  }

  if (search?.trim()) {
    filter.$or = [
      {
        title: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        shortDescription: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        technologies: {
          $regex: search.trim(),
          $options: "i",
        },
      },
    ];
  }

  const skip = (pageNumber - 1) * limitNumber;

  const [projects, total] = await Promise.all([
    Project.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .lean(),

    Project.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: {
      projects,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber),
      },
    },
  });
};

// GET /api/projects/:slug
const getProjectBySlug = async (req, res) => {
  const project = await Project.findOne({
    slug: req.params.slug,
    published: true,
  }).lean();

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  res.status(200).json({
    success: true,
    data: project,
  });
};

// POST /api/projects
const createProject = async (req, res) => {
  const {
    title,
    shortDescription,
    description,
    thumbnail,
    images,
    technologies,
    category,
    liveUrl,
    githubUrl,
    featured,
    published,
    challenges,
    solutions,
    learnings,
  } = req.body;

  if (!title || !shortDescription || !description) {
    return res.status(400).json({
      success: false,
      message: "Title, short description and description are required",
    });
  }

  let slug = slugify(title);

  const existingProject = await Project.findOne({ slug });

  if (existingProject) {
    slug = `${slug}-${Date.now()}`;
  }

  const project = await Project.create({
    title,
    slug,
    shortDescription,
    description,
    thumbnail,
    images,
    technologies,
    category,
    liveUrl,
    githubUrl,
    featured,
    published,
    challenges,
    solutions,
    learnings,
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
};

// PATCH /api/projects/:id
const updateProject = async (req, res) => {
  const allowedFields = [
    "title",
    "shortDescription",
    "description",
    "thumbnail",
    "images",
    "technologies",
    "category",
    "liveUrl",
    "githubUrl",
    "featured",
    "published",
    "challenges",
    "solutions",
    "learnings",
  ];

  const updates = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  if (updates.title) {
    updates.slug = slugify(updates.title);

    const existingProject = await Project.findOne({
      slug: updates.slug,
      _id: { $ne: req.params.id },
    });

    if (existingProject) {
      updates.slug = `${updates.slug}-${Date.now()}`;
    }
  }

  const project = await Project.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: project,
  });
};

// DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
};

export {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
