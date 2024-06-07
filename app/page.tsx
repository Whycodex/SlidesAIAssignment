"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const [apiKey, setApiKey] = useLocalStorage('openai-api-key', '');

  const session = useSession();
  const router = useRouter();
  console.log(session);
  if (session.status === "loading") {
    return <h1>Loading</h1>;
  }
  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col gap-x-2 items-center justify-center">
      <input
        type="text"
        placeholder="Enter OpenAI API Key"
        value={apiKey}
        onChange={handleApiKeyChange}
        className="border rounded p-2 mb-4"
      />
      <button
        className="border border-slate-950 p-2 rounded text-slate-950"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;