import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PriceSearch from "../components/priceSearch.tsx";

const RevSearch = () => {
  const nav = useNavigate();
  const [results, setResults] = useState<{ name: string; predicted_price: number }[]>([]);

  return (
    <div className="w-screen h-screen bg-red-500 flex justify-top items-center flex-col">
        <button className="absolute top-[2vh] left-[2vw] w-[10vw] rounded-2xl border-gray-400 bg-white hover:cursor-pointer" onClick={() => nav('/')}>Back To Home</button>
        <p className="text-[5vw]">Type a Price!</p>

        <PriceSearch onResults={setResults} />

      {results.length > 0 && (
        <div className="mt-6 w-full max-w-md space-y-3">
          {results.map((r, i) => (
            <div
              key={i}
              className="bg-white shadow p-4 rounded-xl flex justify-between items-center"
            >
              <span className="font-medium">{r.name}</span>
              <span className="text-right">${r.predicted_price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RevSearch