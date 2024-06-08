"use client";
import { Button } from "@/components/Ui/Button";
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
    return <h1 className="flex items-center justify-center h-full">Loading...</h1>;
  }
  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-[225px]">
        <Button onClick={()=>signIn("google")}>Sign in with Google</Button>
      </div>
      <input
        type="text"
        placeholder="Enter Your OpenAI API Key"
        value={apiKey}
        onChange={handleApiKeyChange}
        className="border border-black rounded w-[225px] p-2 mb-4"
      />
    </div>
  );
};

export default Login;