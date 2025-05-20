import { useState, useEffect } from "react";

const ResultCard = ({ result }) => {

    return (
      <div className="bg-[#35476A] shadow-lg rounded-2xl p-4 max-w-sm mx-auto text-center border border-gray-200 min-w-90 md:mt-10">
        <h2 className="text-lg font-semibold text-white">Prediction Result</h2>
        <p className="text-3xl font-bold text-white mt-2">{result}</p>
      </div>
    );
};

export default ResultCard;
