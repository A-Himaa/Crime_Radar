const express = require("express");
const router = express.Router();
const Article = require("../models/article");


//Aware Admin Page Connection

// Add a new article
router.post("/addarticle", async (req, res) => {
  try {
    const {  title, article_id, theme, content, published_date, author } = req.body;

    const newArticle = new Article({
      title,
      article_id,
      theme,
      content,
      published_date,
      author
    });

    await newArticle.save();
    res.status(201).json({ message: "Crime Article added successfully" });
  } catch (err) {
    console.error("Error adding article:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// Retrieve all articles
router.get("/article", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve specific article data
router.get('/article/get/:id', async (req, res) => {
  const articleId = req.params.id;

  try {
    // Query the database to find the article with the given ID
    const articleDetails = await Article.findById(articleId);

    if (!articleDetails) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ article: articleDetails });

  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update article by ID
router.put("article/updatearticle/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json(article);
  } catch (err) {
    console.error("Error updating article:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete article by ID (updated route to match frontend)
router.delete("/article/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Server Error" });
  }
});




module.exports = router;
