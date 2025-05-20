import React from "react";
import creator1 from "../assets/creator1.jpeg";
import creator2 from "../assets/Creator2.jpeg"; // Fixed: Removed curly braces
import creator3 from "../assets/creator3.jpeg";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";

const creators = [
  {
    name: "Sanjayazhagan",
    role: "FullStack Developer",
    image: creator1, // Fixed: Removed curly braces
    description: "Builds scalable and interactive web applications with React and Flask   (and Django).",
    linkedIn : "http://www.linkedin.com/in/sanjay-azhagan",
    gitHub : "https://github.com/Sanjayazhagan"

  },
  {
    name: "Gokul Krishna Balaji",
    role: "Machine Learning Engineer",
    image: creator2,
    description: "Works on integrating ML models for real-time handwritten number detection.",
    linkedIn : "https://www.linkedin.com/in/gokul-krishna-balaji-434736332/",
    gitHub: "https://github.com/gokulkrishna1686"
  },
  {
    name: "Neppali Puneeth Kumar",
    role: "Machine Learning Engineer",
    image: creator3,
    description: "Works on integrating ML models for real-time handwritten number detection.",
    linkedIn : "https://www.linkedin.com/in/puneeth-kumar-824170327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    gitHub : "https://github.com/PUNEETH-npk"
  },
];

const AboutCreators = ({ref,}) => {
  return (
    <section className="bg-[#67779d] py-10 px-6" ref={ref}>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Meet the Creators</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {creators.map((creator, index) => (
          <div key={index} className="bg-[#35476A] shadow-lg rounded-2xl p-6 max-w-xs text-center">
            <img
              src={creator.image}
              alt={creator.name}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-white">{creator.name}</h3>
            <p className="text-sm text-white">{creator.role}</p>
            <p className="text-white mt-2">{creator.description}</p>
            <div className="flex justify-center mt-4">
              <a href={creator.gitHub} className="mr-4"><FaGithubSquare className="mt-4 ml-6" size={40} /></a>
              <a href={creator.linkedIn} className="mr-4"><FaLinkedin className="mt-4 ml-6" size={40} /></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutCreators;
