// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import twilio from 'twilio';
import type { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';
const client = twilio(accountSid, authToken);

export const sendSMS = async (options: MessageListInstanceCreateOptions) => {
  return await client.messages.create({
    from: '+13074634687',
    ...options,
  }) // {body: 'Hi there', from: '+15017122661', to: '+15558675310'}
};
