import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PriceSearch from "../components/priceSearch.tsx";

const RevSearch = () => {
  const nav = useNavigate();
  const [results, setResults] = useState<{ name: string; predicted_price: number }[]>([]);

  return (
    <div className="w-screen h-screen flex justify-top items-center flex-col">
      {/* Background GIF */}
      <img
        src="/pokemon.gif"
        alt="pokemon gif"
        className="absolute top-0 left-0 w-full h-full object-cover -z-5"
      />
        <button className="absolute top-[2vh] left-[2vw] w-[10vw] rounded-2xl border-white-400 bg-white hover:cursor-pointer" onClick={() => nav('/')}>Back To Home</button>
        <p className="mt-[5vh] text-[5vw] text-white">Type a Price!</p>

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