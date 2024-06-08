"use client";

import { EmailsList } from "@/components/Email/EmailsList";
import { ApiInput } from "@/components/Ui/ApiInput";
import { Button } from "@/components/Ui/Button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [emails, setEmails] = useState<{ subject: string; snippet: string }[]>(
    []
  );

  useEffect(() => {
    const fetchEmails = async () => {
      const res = await fetch("/api/emails");
      const data = await res.json();

      if (data.success) {
        setEmails(data.emails);
      }
    };

    fetchEmails();
  }, []);

  const router = useRouter();

  const { data: session } = useSession();
  const user = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image
  }

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col items-center mt-4 min-h-screen py-2">
      <div className="flex items-center w-full justify-between px-4 border-b-2">
        <div className="flex">
          <img src={user.image!} alt="image" className="w-[60px] h-[60px] mr-2 rounded-full"/>
          <div>
            <p className="text-xl font-bold">{user.name}</p>
            <p className="text-md mb-4">{user.email}</p>
        </div>
        </div>
        <div className="flex items-start gap-x-2">
          <ApiInput />
          <div>
            <Button onClick={handleSignOut}>Sign out</Button>
          </div>
        </div>
      </div>
      <EmailsList />
    </div>
  );
}
