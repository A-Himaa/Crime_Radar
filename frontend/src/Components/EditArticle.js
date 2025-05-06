import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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



  useEffect(() => {
    axios.get(`http://localhost:8070/article/ViewArticle/${id}`) 
        .then((res) => {
            console.log("Fetched article Data:", res.data);

            const articleData = res.data;
            if (!articleData.createdAt) {
              articleData.createdAt = new Date(
                    parseInt(articleData._id.substring(0, 8), 16) * 1000
                ).toISOString(); 
            }

            setArticle(articleData);
        })
        .catch((err) => {
            console.error("Error fetching report:", err);
            alert("Error in loading report details.");
        });
}, [id]);









  useEffect(() => {
    // Fetch article by MongoDB _id
    axios
      .get(`http://localhost:8070/article/ViewArticle/${id}`)
      .then((res) => setArticle(res.data.article))
      .catch((err) => console.log(err));
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!article.theme || !article.content || !article.published_date || !article.author) {
      Swal.fire("Validation Error", "Please fill in all required fields!", "warning");
      return;
    }

    axios
      .put(`http://localhost:8070/article/updatearticle/${id}`, article)
      .then(() => {
        Swal.fire("Success", "Article Updated Successfully!", "success");
        navigate("/article");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Failed to update article", "error");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-auto relative">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[80vw] mt-[15vh]">
        <h2 className="text-2xl font-bold mb-6">Edit Article</h2>
        <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* View-only Article ID */}
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

          {/* Published Date */}
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
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          {/* Author */}
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
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          {/* View-only Category */}
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

          {/* Theme */}
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
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          {/* Content */}
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
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            ></textarea>
          </div>

          {/* Submit Button */}
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
