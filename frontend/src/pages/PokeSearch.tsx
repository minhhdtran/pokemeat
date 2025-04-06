import { useNavigate } from "react-router-dom"
import { useState } from "react";
import ComboBox from "../components/comboBox.tsx";

const PokeSearch = () => {
  const nav = useNavigate();
  const [result, setResult] = useState<{ name: string; price: number } | null>(null);
  
  return (
    <div className="w-screen h-screen bg-red-500 flex flex-col justify-top items-center">
        <button className="absolute top-[2vh] left-[2vw] w-[10vw] rounded-2xl border-gray-400 bg-white hover:cursor-pointer hover:bg-gray-200" onClick={() => nav('/')}>Back To Home</button>
        <p className="text-[5vw]">Select a Pokemon!</p>

        <ComboBox onResult={setResult} />

        {result && (
        <div className="bg-white shadow rounded-xl p-4 mt-4 text-center">
          <h2 className="text-xl font-semibold">{result.name}</h2>
          <p className="text-lg">
            Predicted Price per Pound: <span className="font-bold">${result.price}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default PokeSearch