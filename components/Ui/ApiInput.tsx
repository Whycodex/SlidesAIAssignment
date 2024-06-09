"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";

export const ApiInput = () => {
  const [apiKey, setApiKey] = useLocalStorage("openai-api-key", "");
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  return (
    <form>
      <input
        type="text"
        required
        placeholder="Enter Your OpenAI API Key"
        value={apiKey}
        onChange={handleApiKeyChange}
        className="border border-black rounded w-[225px] h-[35px] p-2 text-sm"
      />
    </form>
  );
};
