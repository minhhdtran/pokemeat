import { useState } from "react";

interface ReverseSearchProps {
  onResults?: (matches: { name: string; predicted_price: number }[]) => void;
}

export default function ReverseSearch({ onResults }: ReverseSearchProps) {
  const API_BASE = import.meta.env.VITE_API_URL || '';
  const [priceInput, setPriceInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let price = parseFloat(priceInput);
    if (isNaN(price) || price <= 0) {
      return;
    }
    price = Math.round(price * 100) / 100;
    setPriceInput(price.toFixed(2));

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/closest-match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_price: price }),
      });
      const data = await res.json();
      if (onResults) onResults(data.matches);
    } catch {
      setError('Failed to fetch matches.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-top items-center flex-row space-x-[10vw]">
      <label className="block">
        <input
          type="text" 
          inputMode="decimal"
          className="bg-white w-[15vw] px-2 py-1 rounded border border-gray-300 focus:ring-2 focus:ring-red-300"
          placeholder="Enter a target price..."
          value={priceInput}
          onChange={e => {
            const val = e.target.value;
            if (/^\d*\.?\d*$/.test(val) || val === '') {
                setPriceInput(val);
            }
           }}
        />
      </label>
      <button
        type="submit"
        className="px-4 py-2 bg-white text-black rounded-2xl hover:bg-gray-200 hover:cursor-pointer w-[13vw]"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Find Closest Matches'}
      </button>
      {error && <p className="text-blue-600">{error}</p>}
    </form>
  );
}
