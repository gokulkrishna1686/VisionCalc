const Instruction = () => {
    return (
      <div className="bg-[#35476A] shadow-lg rounded-2xl p-4 max-w-sm mx-auto text-center border border-gray-200 p-8">
        <h2 className="text-lg font-semibold text-white">Rules for Accurate Detection:</h2>
        <div className="text-left mt-4">
            <p className="text-3xl font-bold text-white mt-2">0: Thin and Long</p>
            <p className="text-3xl font-bold text-white mt-2">1: With a Hook on Top</p>
            <p className="text-3xl font-bold text-white mt-2">2: Wide</p>
            <p className="text-3xl font-bold text-white mt-2">3: Thin and Tall</p>
            <p className="text-3xl font-bold text-white mt-2">4: Slanted</p>
            <p className="text-3xl font-bold text-white mt-2">7: Slanted Line</p>
        </div>
      </div>
    );
  };
  
  export default Instruction;