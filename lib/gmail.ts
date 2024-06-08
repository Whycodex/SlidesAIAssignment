"use server";

import { google } from "googleapis";

export async function getEmails(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth });
  const response = await gmail.users.messages.list({ userId: "me", maxResults: 10 });

  if (!response.data.messages) {
    throw new Error("No messages found.");
  }

  const emails = await Promise.all(
    response.data.messages.map(async (message) => {
      const msg = await gmail.users.messages.get({
        userId: "me",
        id: message.id as string,
      });
      return {
        id: message.id,
        snippet: (msg as any)?.data?.snippet || "No Snippet",
        subject:
          msg?.data?.payload?.headers?.find(
            (header: any) => header.name === "Subject"
          )?.value || "No Subject",
      };
    })
  );

  return emails;
}
