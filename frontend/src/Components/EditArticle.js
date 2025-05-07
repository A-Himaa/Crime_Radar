// EditArticle.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const articleFields = {
    article_id: "",
    title: "",
    theme: "",
    content: "",
    published_date: "",
    author: "",
  };

  const [article, setArticle] = useState(articleFields);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8070/article/getarticle/${id}`)
      .then((res) => setArticle(res.data.article))
      .catch((err) => console.log(err));
  }, [id]);
  

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "theme" && value.length > 150) return;
    setArticle({ ...article, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!article.theme.trim()) {
      newErrors.theme = "Theme is required";
    }
    if (article.theme.length > 150) {
      newErrors.theme = "Theme must not exceed 150 characters";
    }
    if (!article.content.trim()) {
      newErrors.content = "Content is required";
    } else if (article.content.length < 200) {
      newErrors.content = "Content must be at least 200 characters";
    } else if (article.content.length > 2000) {
      newErrors.content = "Content must not exceed 2000 characters";
    }
    if (!article.published_date.trim()) {
      newErrors.published_date = "Published Date is required";
    }
    if (!article.author.trim()) {
      newErrors.author = "Author is required";
    }
    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Swal.fire("Validation Error", "Please fix the validation errors.", "warning");
      return;
    }

    axios
      .put(`http://localhost:8070/article/updatearticle/${id}`, article)
      .then(() => {
        Swal.fire("Success", "Article Updated Successfully!", "success");
        navigate("/admin/awareadmin");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Failed to update article", "error");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-auto relative">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[80vw] mt-[15vh]">
        <div className="mb-6">
          <Link
            to="/articles"
            className="text-white bg-amber-600 px-4 py-2 rounded shadow hover:bg-amber-700 transition"
          >
            Back
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-6">Edit Article</h2>
        <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="article_id" className="block text-sm font-medium text-gray-700">
              Article ID
            </label>
            <input
              type="text"
              id="article_id"
              name="article_id"
              value={article.article_id}
              disabled
              className="mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm py-2 px-3 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="published_date" className="block text-sm font-medium text-gray-700">
              Published Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="published_date"
              name="published_date"
              value={article.published_date}
              onChange={inputChangeHandler}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
            {errors.published_date && <p className="text-red-500 text-sm mt-1">{errors.published_date}</p>}
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={article.author}
              onChange={inputChangeHandler}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={article.title}
              disabled
              className="mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm py-2 px-3 cursor-not-allowed"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
              Theme <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="theme"
              name="theme"
              value={article.theme}
              onChange={inputChangeHandler}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
            <div className="text-sm text-gray-500 mt-1">{article.theme.length}/150 characters</div>
            {errors.theme && <p className="text-red-500 text-sm mt-1">{errors.theme}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              rows="6"
              value={article.content}
              onChange={inputChangeHandler}
              maxLength={2000}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
            ></textarea>
            <div className="text-sm text-gray-500 mt-1">{article.content.length}/2000 characters</div>
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-amber-500 text-white px-6 py-2 rounded-md hover:bg-amber-600"
            >
              Update Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
