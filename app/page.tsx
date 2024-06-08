"use client";
import { ApiInput } from "@/components/Ui/ApiInput";
import { Button } from "@/components/Ui/Button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  console.log(session);
  if (session.status === "loading") {
    return (
      <h1 className="flex items-center justify-center h-full font-bold">Loading...</h1>
    );
  }
  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  return (
    <div className="w-full h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-[225px]">
        <Button onClick={() => signIn("google")}>Sign in with Google</Button>
      </div>
      <ApiInput />
    </div>
  );
};

export default Login;
