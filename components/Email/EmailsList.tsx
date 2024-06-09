"use client";

import { getEmails } from "@/lib/gmail";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Button } from "../Ui/Button";
import { ClassifyEmails } from "@/lib/openai";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CountFilter } from "./CountFilter";

export const EmailsList = () => {
  const { data: session } = useSession();
  const [emails, setEmails] = useState<
    { id: any; snippet: any; subject: any }[]
  >([]);
  const [emailsToShow, setEmailsToShow] = useState(5);
  const [showClassification, setShowClassification] = useState(false);
  const [classification, setClassification] = useState<Record<string, string>>(
    {}
  );
  const [apiKey, setApiKey] = useLocalStorage("openai-api-key", "");

  let emailString = "";

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

  async function handleOnClassify() {
    setShowClassification(true);
    console.log(emailString);
    ClassifyEmails(emailString, apiKey).then((res: any) => {
      if (res) {
        setClassification(JSON.parse(res));
        console.log(Object.keys(classification).length);
      } else {
        for (let i = 0; i < emailsToShow; i++) {
          setClassification((prev) => ({ ...prev, [`${i}`]: "Unclassified" }));
        }
      }
    });
  }

  return (
    <>
      <div className="p-4 m-4">
        <div className="flex w-full items-center justify-between mb-4 px-4 gap-x-2">
          <CountFilter
            emailsToShow={emailsToShow}
            setEmailsToShow={setEmailsToShow}
            setShowClassification={setShowClassification}
          />
          <div>
            <Button onClick={handleOnClassify}>Classify</Button>
          </div>
        </div>
        {emails.length > 0 ? (
          emails.slice(0, emailsToShow).map((email, index) => {
            emailString += index + "-" + email.snippet.trim() + "\n\n";
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
                  {showClassification &&
                  classification &&
                  Object.keys(classification).length == emailsToShow ? (
                    <h1>{classification[`${index}`]}</h1>
                  ) : null}
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
