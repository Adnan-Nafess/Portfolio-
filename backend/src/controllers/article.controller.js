import Article from "../models/Article.js";
import slugify from "../utils/slugify.js";

const getArticles = async (req, res) => {
  const { page = 1, limit = 10, category, tag, search } = req.query;

  const pageNumber = Math.max(Number(page) || 1, 1);
  const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 50);

  const filter = {
    published: true,
  };

  if (category) {
    filter.category = category;
  }

  if (tag) {
    filter.tags = tag;
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
        excerpt: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        tags: {
          $regex: search.trim(),
          $options: "i",
        },
      },
    ];
  }

  const skip = (pageNumber - 1) * limitNumber;

  const [articles, total] = await Promise.all([
    Article.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .lean(),

    Article.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: {
      articles,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber),
      },
    },
  });
};

const getArticleBySlug = async (req, res) => {
  const article = await Article.findOne({
    slug: req.params.slug,
    published: true,
  }).lean();

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article not found",
    });
  }

  res.status(200).json({
    success: true,
    data: article,
  });
};

const createArticle = async (req, res) => {
  const {
    title,
    excerpt,
    content,
    coverImage,
    category,
    tags,
    readingTime,
    published,
  } = req.body;

  if (!title || !excerpt || !content) {
    return res.status(400).json({
      success: false,
      message: "Title, excerpt and content are required",
    });
  }

  let slug = slugify(title);

  const existingArticle = await Article.findOne({ slug });

  if (existingArticle) {
    slug = `${slug}-${Date.now()}`;
  }

  const isPublished = published === true;

  const article = await Article.create({
    title,
    slug,
    excerpt,
    content,
    coverImage,
    category,
    tags,
    readingTime,
    published: isPublished,
    publishedAt: isPublished ? new Date() : null,
  });

  res.status(201).json({
    success: true,
    message: "Article created successfully",
    data: article,
  });
};

const updateArticle = async (req, res) => {
  const allowedFields = [
    "title",
    "excerpt",
    "content",
    "coverImage",
    "category",
    "tags",
    "readingTime",
    "published",
  ];

  const updates = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  if (updates.title) {
    updates.slug = slugify(updates.title);

    const existingArticle = await Article.findOne({
      slug: updates.slug,
      _id: { $ne: req.params.id },
    });

    if (existingArticle) {
      updates.slug = `${updates.slug}-${Date.now()}`;
    }
  }

  if (updates.published === true) {
    updates.publishedAt = new Date();
  }

  if (updates.published === false) {
    updates.publishedAt = null;
  }

  const article = await Article.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Article updated successfully",
    data: article,
  });
};

const deleteArticle = async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Article deleted successfully",
  });
};

export {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
};
