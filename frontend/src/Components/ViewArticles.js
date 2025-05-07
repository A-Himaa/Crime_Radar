import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewArticles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchId, setSearchId] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);
  const [popupMessage, setPopupMessage] = useState("");
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://localhost:8070/article/article");
        setArticles(res.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory
      ? article.title?.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesId = searchId
      ? article.article_id?.toLowerCase().includes(searchId.toLowerCase())
      : true;
    return matchesCategory && matchesId;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredArticles.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = async (id) => {
    try {
      const editingArticle = articles.find((article) => article._id === id);

      if (!editingArticle) {
        alert("Article not found.");
        return;
      }

      setPopupMessage(`Redirecting to edit... Article ID: ${editingArticle.article_id}`);

      setTimeout(() => {
        setPopupMessage("");
        navigate(`/updatearticle/${editingArticle._id}`);
      }, 2000);
    } catch (error) {
      alert("Failed to proceed to edit.");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const deletedArticle = articles.find((article) => article._id === deleteId);

      if (!deletedArticle) {
        alert("Article not found.");
        return;
      }

      setConfirmDelete(false);
      setDeleteId(null);

      setPopupMessage(`Article deleted successfully! Article ID: ${deletedArticle.article_id}`);

      setTimeout(async () => {
        await axios.delete(`http://localhost:8070/article/article/${deletedArticle._id}`);
        setArticles((prev) => prev.filter((article) => article._id !== deletedArticle._id));
        setPopupMessage("");
      }, 2000);
    } catch (error) {
      alert("Failed to delete article.");
      console.error(error);
    }
  };

  const openContentPopup = (content) => {
    const popup = window.open("", "_blank", "width=600,height=400,scrollbars=yes");
    popup.document.write(`
      <html>
        <head>
          <title>Full Article Content</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
          </style>
        </head>
        <body>
          <h2>Full Article Content</h2>
          <p>${content.replace(/\n/g, "<br/>")}</p>
        </body>
      </html>
    `);
    popup.document.close();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-auto relative">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[80vw] mt-[10vh]">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate('/admin/awareadmin')}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
          >
            Back
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Crime Article Management</h1>
        </div>

        <div className="flex gap-4 mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Categories</option>
            <option value="Violent Crimes">Violent Crimes</option>
            <option value="Cyber Crimes">Cyber Crimes</option>
            <option value="Property Crimes">Property Crimes</option>
            <option value="Drug-related Crimes">Drug related Crimes</option>
            <option value="Robbery Crimes">Robbery Crimes</option>
          </select>
          <input
            type="text"
            placeholder="Search by Article ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="overflow-x-auto">
          <table ref={tableRef} className="min-w-full table-auto bg-white shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Article ID</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Theme</th>
                <th className="py-2 px-4 text-left w-[40rem]">Content</th>
                <th className="py-2 px-4 text-left">Published Date</th>
                <th className="py-2 px-4 text-left">Author</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((article, index) => (
                  <tr key={index} className="border-t align-top">
                    <td className="py-2 px-4">{article.article_id}</td>
                    <td className="py-2 px-4">{article.title}</td>
                    <td className="py-2 px-4">{article.theme}</td>
                    <td className="py-2 px-4 w-[40rem]">
                      {article.content.length > 30
                        ? (
                          <>
                            {article.content.slice(0, 30)}...
                            <button
                              onClick={() => openContentPopup(article.content)}
                              className="text-blue-500 ml-2 underline hover:text-blue-700"
                            >
                              View More
                            </button>
                          </>
                        )
                        : article.content}
                    </td>
                    <td className="py-2 px-4">{article.published_date}</td>
                    <td className="py-2 px-4">{article.author}</td>
                    <td className="py-2 px-4 flex flex-col gap-1">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(article._id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(article._id);
                            setConfirmDelete(true);
                          }}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastRecord >= filteredArticles.length}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="mb-4">Are you sure you want to delete this article?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Message */}
      {popupMessage && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow z-50 animate-bounce">
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default ViewArticles;
