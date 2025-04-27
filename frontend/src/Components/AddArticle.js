import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddArticle = () => {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [content, setContent] = useState("");
  const [article_id, setArticleId] = useState("");
  const [published_date, setPublishedDate] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const crimeCategories = [
    "Violent Crimes",
    "Cyber Crimes",
    "Property Crimes",
    "Drug-Related Crimes",
    "Robbery Crimes",
  ];

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "theme") {
      if (value.length <= 200) setTheme(value);
      if (value.length > 200) setNotification("Theme cannot exceed 200 characters.");
    } else if (name === "content") {
      setContent(value); // Allow unlimited characters
    }else if (name === "article_id") {
      const allowedPrefixes = ["VC", "CC", "PC", "DC", "RC"];
      const input = e.target.value.toUpperCase();
    
      // Max 6 characters
      if (input.length <= 6) {
        // If typing first 1–2 letters
        if (input.length <= 2) {
          if (allowedPrefixes.some((prefix) => prefix.startsWith(input))) {
            setArticleId(input);
            setNotification("");
          } else {
            setNotification("Article ID must start with VC, CC, PC, DC, or RC.");
          }
        } else {
          const prefix = input.slice(0, 2);
          const numberPart = input.slice(2);
    
          if (!allowedPrefixes.includes(prefix)) {
            setNotification("Article ID must begin with VC, CC, PC, DC, or RC.");
            return;
          }
    
          if (!/^\d{0,4}$/.test(numberPart)) {
            setNotification("Only digits are allowed after the prefix.");
            return;
          }
    
          const number = parseInt(numberPart, 10);
          if (isNaN(number) || number > 1000) {
            setNotification("Number must be between 0 and 1000.");
            return;
          }
    
          setArticleId(input);
          setNotification("");
        }
      }
        
    
    } else if (name === "published_date") {
      setPublishedDate(value);
    } else if (name === "author") {
      setAuthor(value);
    }
  };

  const validateForm = () => {
    if (!title) {
      setNotification("Category is required.");
      return false;
    }
    if (theme.length < 20 || theme.length > 200) {
      setNotification("Theme must be between 20 and 200 characters.");
      return false;
    }
    if (content.length < 200) {
      setNotification("Content should be at least 200 characters.");
      return false;
    }
    if (!article_id || !published_date || !author) {
      setNotification("Please fill in all fields.");
      return false;
    }
    setNotification("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:8070/article/addarticle", {
        title,
        article_id,
        theme,
        content,
        published_date,
        author,
      });
      if (!/^[A-Za-z]{2}\d{1,4}$/.test(article_id) || isNaN(article_id.slice(2)) || Number(article_id.slice(2)) > 1000) {
        setNotification("Invalid Article ID format.");
        return false;
      }
      

      if (response.status === 201) {
        setNotification("Article added successfully!");
        setTimeout(() => {
          setNotification("");
          navigate("/");
        }, 3000);
      } else {
        setError("Failed to add article. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while adding the article.");
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-auto relative">
      
      {/* Top-right Notifications */}
      <div className="absolute top-4 right-4 space-y-2">
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded shadow-lg">
            {error}
          </div>
        )}
        {notification && (
          <div className="bg-yellow-500 text-white p-3 rounded shadow-lg">
            {notification}
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-[80vw] mt-[20vh]">
        {/* ← Back to awareadmin page */}
  <button
    onClick={() => navigate('/awareadmin')}
    className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
  >
    ← Back
  </button>
        <h2 className="text-4xl font-bold text-center mb-2">
          <span className="text-amber-600">A</span>dd <span className="text-amber-600">A</span>rticle
        </h2>
        <p className="text-center text-lg text-gray-600 mb-4">
          Share your stories to help create a safer society.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-800 font-semibold">Article ID</label>
          <input
            type="text"
            name="article_id"
            value={article_id}
            onChange={handleInputChange}
            placeholder="Enter article ID"
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
            required
          />

          <label className="block text-gray-800 font-semibold">Published Date</label>
          <input
            type="date"
            name="published_date"
            value={published_date}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
            required
          />

          <label className="block text-gray-800 font-semibold">Author</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleInputChange}
            placeholder="Enter author name"
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
            required
          />

          <label className="block text-gray-800 font-semibold">Category</label>
          <select
            name="title"
            value={title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
            required
          >
            <option value="">Select Crime Category</option>
            {crimeCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label className="block text-gray-800 font-semibold">Theme</label>
          <input
            type="text"
            name="theme"
            value={theme}
            onChange={handleInputChange}
            placeholder="Enter theme"
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
            maxLength="200"
            required
          />
          {theme.length > 0 && (theme.length < 20 || theme.length > 200) && (
            <div className="text-red-500 mb-2">Theme must be between 20 and 200 characters.</div>
          )}

          <label className="block text-gray-800 font-semibold">Content</label>
          <textarea
            name="content"
            value={content}
            onChange={handleInputChange}
            placeholder="Enter article content"
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
            rows="6"
            required
          ></textarea>
          {content.length > 0 && content.length < 200 && (
            <div className="text-red-500 mb-2">Content should be at least 200 characters.</div>
          )}

          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
