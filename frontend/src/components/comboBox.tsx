import { useEffect, useState } from "react";

interface ComboProps {
  onResult?: (result: { name: string; price: number }) => void;
}

export default function ComboBox({ onResult }: ComboProps) {
  const API_BASE = import.meta.env.VITE_API_URL || '';
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/pokemon-list`)
      .then(res => {
        if (!res.ok) throw new Error("Bad status");
        return res.json();
      })
      .then(data => {
        setPokemonList(data);
        setError('');
      })
      .catch(() => setError('Failed to load Pokémon list'));
  }, [API_BASE]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedName) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/predict-price`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemon_name: selectedName }),
      });
      const data = await res.json();
      if (
        onResult &&
        pokemonList.some((name) => name.toLowerCase() === selectedName.toLowerCase())
      )   {
        onResult({ name: selectedName, price: data.predicted_price });
      }
    } catch {
      setError('Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  const filteredList = pokemonList
  .filter(name =>name.toLowerCase().startsWith(inputValue.toLowerCase()))
  .slice(0, 5);

  return (
    <form onSubmit={handleSubmit} className="flex justify-top items-center flex-row space-x-[10vw]">
      <label className="block">
        <input
          type="text"
          className="bg-white w-[15vw] px-2 py-1 rounded border border-gray-300 focus:ring-2 focus:ring-red-300"
          placeholder="Search Pokémon..."
          value={inputValue}
          onFocus={() => setFocus(true)}
          onChange={e => {
            setInputValue(e.target.value);
            setSelectedName(e.target.value);
            setFocus(true);
          }}
          list="pokemon-options"
        />
        {filteredList.length > 0 && inputValue.length > 0 && focus && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-[15vw] shadow">
            {filteredList.map(name => (
              <li
                key={name}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setInputValue(name);
                  setSelectedName(name);
                  setFocus(false);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </label>
      <button
        type="submit"
        className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 hover:cursor-pointer w-[13vw]"
        onClick={() => setFocus(false)}
        disabled={loading}
      >
        {loading ? 'Predicting...' : 'Predict Price'}
      </button>
      {error && <p className="text-blue-600">{error}</p>}
    </form>
  );
}
