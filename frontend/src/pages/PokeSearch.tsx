import { useNavigate } from "react-router-dom"
import { useState } from "react";
import ComboBox from "../components/comboBox.tsx";


const PokeSearch = () => {
  const nav = useNavigate();
  const [result, setResult] = useState<{ name: string; price: number } | null>(null);
  
  return (
    <div className="w-screen h-screen">
      {/* Background GIF */}
      <img
        src="/pokemon.gif"
        alt="pokemon gif"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      
      {/* Foreground content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center z-10">
        <button
          className="absolute top-[2vh] left-[2vw] w-[10vw] rounded-2xl border-gray-400 bg-white hover:cursor-pointer"
          onClick={() => nav('/')}
        >
          Back To Home
        </button>
  
        <p className="text-[5vw] text-white mt-[10vh] drop-shadow-lg">I want to eat...</p>
  
        <ComboBox onResult={setResult} />
  
        {result && (
          <div className="bg-white/90 shadow rounded-xl p-4 mt-4 text-center">
            <h2 className="text-xl font-semibold">{result.name}</h2>
            <p className="text-lg">
              Predicted Price: <span className="font-bold">${result.price}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokeSearch