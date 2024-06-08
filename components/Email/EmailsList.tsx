"use client";

import { getEmails } from "@/lib/gmail";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Button } from "../Ui/Button";

export const EmailsList = () => {
  const { data: session } = useSession();
  const [emails, setEmails] = useState<
    { id: any; snippet: any; subject: any }[]
  >([]);
  const [emailsToShow, setEmailsToShow] = useState(5);
  const [showClassification,setShowClassification] = useState(false);

  const choiceArray = [5, 10, 15, 20, 25, 30];

  useEffect(() => {
    // @ts-ignore
    const accessToken = session?.accessToken;
    if (accessToken) {
      getEmails(accessToken)
        .then((data: { id: any; snippet: any; subject: any }[]) =>
          setEmails(data)
        )
        .catch(console.error);
    }
  }, [session]);

  function handleOnClassify() {
    setShowClassification(true);
    console.log(emailString);
  }
  let emailString = "";
  return (
    <>
      <div className="p-4 m-4">
        <div className="flex w-full items-center justify-between mb-4 px-4 gap-x-2">
          <select
            value={emailsToShow}
            onChange={(e) => {setEmailsToShow(parseInt(e.target.value)); setShowClassification(false)}}
            className="text-white text-sm bg-black p-2 rounded hover:bg-slate-900"
          >
            {choiceArray.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div>
            <Button onClick={handleOnClassify}>Classify</Button>
          </div>
        </div>
        {emails.length > 0 ? (
          emails.slice(0, emailsToShow).map((email,index) => {
            emailString += index + "-" + email.snippet.trim() + '\n\n';
            return (
              <div
                key={email.id}
                className="border p-2 m-2 border-black rounded-md"
              >
                <div className="flex items-center justify-between">
                  <div className="max-w-[90%]">
                    <h3 className="font-bold">{email.subject}</h3>
                    <p>{email.snippet}</p>
                  </div>
                  {
                    showClassification ? <h1>testing</h1> : null
                  }
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">Fetching your emails...</p>
        )}
      </div>
    </>
  );
};
