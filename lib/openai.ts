"use server";

export async function ClassifyEmails(emails: string, apiKey: string) {
  const apiURL = "https://api.openai.com/v1/chat/completions";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `I want these email snippets to get classified in one of these following categories -
            [Important: Emails that are personal or work-related and require immediate attention.
            Promotions: Emails related to sales, discounts, and marketing campaigns.
            Social: Emails from social networks, friends, and family.
            Marketing: Emails related to marketing, newsletters, and notifications.
            Spam: Unwanted or unsolicited emails.
            General: If none of the above are matched, use General].
            Providing you all the emails with indexes please return just a json of response that contains key as index and value will be just the type of the email at that index without any explanation in correct format. Here are the emails -
            ${emails}`,
        },
      ],
      temperature: 0.7,
    }),
  };
  try {
    const response = await fetch(apiURL, requestOptions);
    const data = await response.json();
    console.log(data.choices[0].message.content);
    return data.choices[0].message.content;
  } catch (error) {
    console.log(error);
    return null;
  }
}
