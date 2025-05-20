import React, { useState } from "react";
import Logo from "../assets/logo.png";

const Header = ({ scrollToImage, scrollToCreator }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#35476a] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <a href="/">
            <img
              src={Logo}
              alt="Logo"
              className="w-48 h-10 md:h-14 object-cover rounded-lg"
            />
          </a>
        </h1>
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:block absolute md:static top-16 left-0 w-full md:w-auto bg-[#35476a] md:bg-transparent z-10`}
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-0">
            <li>
              <a
                onClick={scrollToImage}
                className="hover:text-gray-300 text-l text-xl cursor-pointer"
              >
                Image Samples
              </a>
            </li>
            <li>
              <a
                onClick={scrollToCreator}
                className="hover:text-gray-300 text-xl cursor-pointer"
              >
                About Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
