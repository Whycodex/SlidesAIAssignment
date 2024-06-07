"use client";

import { EmailsList } from "@/components/Email/EmailsList";
import { signOut, useSession } from "next-auth/react";
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
        <h1 className="text-4xl font-bold mb-4 mr-2">Dashboard</h1>
        <button
          className="border border-slate-950 p-2 rounded text-slate-950"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
      <EmailsList />
    </div>
  );
}
