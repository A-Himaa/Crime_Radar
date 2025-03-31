const express = require("express");
const router = express.Router();
const Article = require("../models/article");

// Add a new article
router.post("/addarticle", async (req, res) => {
  try {
    const { title, theme, content } = req.body;

    const newArticle = new Article({
      title,
      theme,
      content,
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

module.exports = router;
