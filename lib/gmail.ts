import { google } from 'googleapis';

export async function getEmails(accessToken:any) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const response = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
  const messages = response.data.messages || [];

  const emailPromises = messages.map(async (message) => {
    // @ts-ignore
    const msg = await gmail.users.messages.get({ userId: 'me', id: message.id });
    // @ts-ignore
    return msg.data;
  });

  return Promise.all(emailPromises);
}