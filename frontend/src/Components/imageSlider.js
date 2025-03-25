import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import violence from "../Images/violence.jpg";
import cyber from "../Images/cyber.jpg";
import property from "../Images/property.jpg";
import drug from "../Images/drug.jpg";
import rob from "../Images/robbery.jpg";



const imgArray = [
  { src: violence, text: "Violations",link: "/violence" },
  { src: cyber, text: "Cyber Crimes",link: "/cyber" },
  { src: property, text: "Property Crimes",link: "/property" },
  { src: drug, text: "Drug-Related Crimes",link: "/drug" },
  { src: rob, text: "Robbery Crimes",link: "/robbery" }
];

const ImageSlider = () => {
  const [currIndex, setCurrIndex] = useState(0);

  const nextSlide = () => {
    if (currIndex < imgArray.length - 1) {
      setCurrIndex(currIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currIndex > 0) {
      setCurrIndex(currIndex - 1);
    }
  };

  return (
    <div className="relative w-[85vw] h-[vh] mx-auto overflow-hidden mb-20 mt-10 p-4">
      <div
        className="flex transition-transform duration-200"
        style={{ transform: `translateX(-${currIndex * 33}%)` }}
      >

        {imgArray.map((image, index) => (
          <div key={index} className="relative w-[40%] px-2 shrink-0">

          <a href={image.link} className="block w-full h-full">
            <img src={image.src} className="w-full rounded-lg h-[50vh] opacity-90" />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex justify-center items-center text-white text-3xl font-bold bg-black bg-opacity-40 rounded-xl mr-2 ml-2">
              <span>{image.text}</span>
            </div>
         </a>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800/60 p-2 rounded-full text-white hover:bg-gray-800"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800/60 p-2 rounded-full text-white hover:bg-gray-800"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

export default ImageSlider;
