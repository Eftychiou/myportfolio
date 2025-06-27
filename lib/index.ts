export const sendMessageToWhatsUp = (message: string) => {
  const phoneNumber = process.env.NEXT_PUBLIC_CALLMEBOT_PHONE_NUMBER;
  const apiKey = process.env.NEXT_PUBLIC_CALLMEBOT_API_KEY;
  const msgEncoded = encodeURIComponent(message);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${msgEncoded}&apikey=${apiKey}`;
  fetch(url);
};
