import React from "react";
import Navbar from "./components/Navbar";
import DrawingCanvasTest from "./components/Drawtest";
import ImageGallery from "./components/SampleImageHolder";
import AboutCreators from "./components/Creators";
import { useState, useEffect,useRef } from "react";

const App = () => {
  const ImageRef = useRef(null);
  const creatorRef = useRef(null);

  const scrollToImage = () => {
    if (ImageRef.current) {
      ImageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error("Target section not found!");
    }
  };
  const scrollToCreator = () => {
    if (creatorRef.current) {
      creatorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error("Target section not found!");
    }
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/hello")  // Call Flask API
  }, []);
  return (
    <div className="bg-[#67779d] min-h-screen">
      <Navbar scrollToImage={scrollToImage} scrollToCreator={scrollToCreator} />
      <DrawingCanvasTest />
      <ImageGallery ref={ImageRef} />
      <AboutCreators ref={creatorRef} />
    </div>
  );
};

export default App ;
