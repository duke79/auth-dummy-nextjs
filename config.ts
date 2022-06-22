export const config = {
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID as string,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN as string,
  jwtTokenKey: process.env.JWT_TOKEN_KEY as string,
  isTwoFactorEnabled: !!process.env.IS_TWO_FACTOR_ENABLED,
};
