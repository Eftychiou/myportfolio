export const sendMessageToWhatsUp = (message: string) => {
  const phoneNumber = process.env.CALLMEBOT_PHONE_NUMBER;
  const apiKey = process.env.CALLMEBOT_API_KEY;
  const msgEncoded = encodeURIComponent(message);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${msgEncoded}&apikey=${apiKey}`;
  fetch(url);
};
