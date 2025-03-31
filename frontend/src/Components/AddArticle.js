import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddArticle = () => {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [content, setContent] = useState("");
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
      if (value.length <= 400) setContent(value);
      if (value.length > 400) setNotification("Content cannot exceed 400 characters.");
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
    if (content.length < 400) {
      setNotification("Content should be at least 400 characters.");
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
        theme,
        content,
      });

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

      <div className="bg-white p-8 rounded-lg shadow-lg w-[80vw] mt-[10vh]">
        <h2 className="text-4xl font-bold text-center mb-2">
          <span className="text-amber-600">A</span>dd <span className="text-amber-600">A</span>rticle
        </h2>
        <p className="text-center text-lg text-gray-600 mb-4">
          Share your stories to help create a safer society.
        </p>

        <form onSubmit={handleSubmit}>
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
          {!title && <div className="text-red-500 mb-2">Category is required.</div>}

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
            maxLength="400"
            required
          ></textarea>
          {content.length > 0 && content.length < 400 && (
            <div className="text-red-500 mb-2">Content should be at least 400 characters.</div>
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
