import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../Images/Logo.png";

const RobberyCrimes = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://localhost:8070/article/article");
        const filtered = res.data.filter(
          (article) =>
            article.title?.toLowerCase() === "robbery crimes" ||
            article.category?.toLowerCase() === "robbery crimes"
        );
        setArticles(filtered);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

 const downloadPDF = (article) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let currentY = margin;

  // 💧 Watermark Function
  const addWatermark = () => {
    doc.saveGraphicsState();
    doc.setFontSize(70);
    doc.setTextColor(240, 240, 240);
    doc.setFont("helvetica", "bold");
    doc.text("CRIME RADAR", pageWidth / 2, pageHeight / 2, {
      angle: 30,
      align: "center",
    });
    doc.restoreGraphicsState();
  };

  // 🌀 First page watermark
  addWatermark();
  // Logo
  doc.addImage(logo, "PNG", margin, currentY, 30, 15);
  currentY += 20;

  // Title
  doc.setFontSize(18);
  doc.setTextColor(255, 191, 0);
  doc.setFont("helvetica", "bold");
  doc.text("Robbery Crime Awareness Report", pageWidth / 2, currentY, { align: "center" });

  currentY += 10;

  // Date
  const date = new Date();
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated on: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`, margin, currentY);

  currentY += 8;

  // Line separator
  doc.setDrawColor(255, 191, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);

  currentY += 10;

  // Theme
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(33);
  const themeText = `Theme: ${article.theme || "N/A"}`;
  const wrappedTheme = doc.splitTextToSize(themeText, pageWidth - 2 * margin);
  doc.text(wrappedTheme, margin, currentY);
  currentY += wrappedTheme.length * 7;

  // Content
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  doc.setTextColor(40);
  const contentLines = doc.splitTextToSize(article.content || "", pageWidth - 2 * margin);
  const lineHeight = 7;

  contentLines.forEach((line) => {
    if (currentY + lineHeight > pageHeight - margin) {
      doc.addPage();
      currentY = margin;
    }
    doc.text(line, margin, currentY, { maxWidth: pageWidth - 2 * margin });
    currentY += lineHeight;
  });

  currentY += 10;

  // Details Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(33);
  doc.text("Article Details", margin, currentY);
  currentY += 8;

  // Article Details
  const details = [
    `Published Date: ${article.published_date || "N/A"}`,
    `Author: ${article.author || "N/A"}`,
    `Category: ${article.title || "N/A"}`,
    `Article ID: ${article.article_id || "N/A"}`
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(50);

  details.forEach((line) => {
    if (currentY + 6 > pageHeight - margin) {
      doc.addPage();
      currentY = margin;
    }
    doc.text(line, margin, currentY);
    currentY += 6;
  });

  // Save PDF
  doc.save(`Robbery_Crime_Article_${article.article_id || "Unknown"}.pdf`);
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-auto relative">
      <div className="w-full max-w-5xl w-[80vw] mt-[15vh]">
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="bg-amber-600 text-white px-4 py-2 rounded shadow hover:bg-amber-700 transition"
          >
            Back
          </button>
        </div>

        <div className="flex justify-center mb-10 border-b-4 border-amber-600 pb-4">
          <h1 className="text-4xl font-extrabold text-center">
            <span className="text-amber-600">R</span>obbery <span className="text-amber-600">C</span>rimes
          </h1>
        </div>

        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div
              key={index}
              className="bg-white border-2 border-amber-600 shadow-lg rounded-xl p-6 mb-10 hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-2xl font-bold text-black border-b border-amber-600 pb-2 mb-4">
                {article.theme}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line text-justify">
                {article.content}
              </p>
              <div className="text-sm text-gray-600 space-y-1 border-t border-gray-200 pt-4">
                <p>
                  <span className="font-semibold text-black">Published Date:</span> {article.published_date}
                </p>
                <p>
                  <span className="font-semibold text-black">Author:</span> {article.author}
                </p>
                <p>
                  <span className="font-semibold text-black">Category:</span> {article.title}
                </p>
                <p>
                  <span className="font-semibold text-black">Article ID:</span> {article.article_id}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => downloadPDF(article)}
                  className="bg-amber-600 text-white px-4 py-2 rounded shadow hover:bg-amber-700 transition"
                >
                  Download Report
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-600 text-lg mt-20">
            No Robbery Crimes articles found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RobberyCrimes;