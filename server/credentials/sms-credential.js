import twilio from 'twilio'
export const accountSid = process.env.TWILIO_ACCOUNT_SID

export const authToken = process.env.TWILIO_AUTH_TOKEN;

export const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

export const client = new twilio(accountSid, authToken);
