import { useState } from "react";
import { useApiKey } from "../context/ApiKeyContext";
import Canvas from "../components/Canvas.jsx";
import Spinner from "../components/Spinner.jsx";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function GeneratorPage() {
  const { apiKey } = useApiKey(); // 👈 get API key
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  const handleGenerate = async (base64) => {
  try {
    setIsGenerating(true);
    setError(null);

    const res = await fetch(`${API}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doodle_data: base64,
        ...(apiKey ? { gemini_api_key: apiKey } : {}),
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Generation failed");
    }

    const data = await res.json();
    setLastResult(data); // ✅ FIX
  } catch (e) {
    setError(e.message);
  } finally {
    setIsGenerating(false);
  }
};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <Canvas onGenerate={handleGenerate} disabled={isGenerating} /> 

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center transition-colors">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
          PokAImon Result
        </h2>

        <div className="relative w-full aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-700 overflow-hidden p-2">
          {!lastResult && !isGenerating && (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Your generated PokAImon will appear here.
            </p>
          )}

          {isGenerating && <Spinner label="Generating your Pokémon…" />}

          {lastResult && !isGenerating && (
            <img
              src={`${API}${lastResult.image_url}`}
              alt={lastResult.name}
              className="object-contain w-full h-full"
            />
          )}
        </div>

        {error && (
          <div className="mt-4 text-red-500 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {lastResult && (
          <div className="w-full mt-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {lastResult.name}
            </h3>

            {lastResult.type && (
              <span className="inline-block mt-1 text-xs px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200">
                {lastResult.type}
              </span>
            )}

            {lastResult.characteristics && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                {lastResult.characteristics}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
