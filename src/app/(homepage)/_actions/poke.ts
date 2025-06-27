'use server';

export async function sayHello(ip: string) {
  const phoneNumber = process.env.CALLMEBOT_PHONE_NUMBER;
  const apiKey = process.env.CALLMEBOT_API_KEY;
  const message = encodeURIComponent(`Someone with ip ${ip} is saying sending his greetings`);

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${message}&apikey=${apiKey}`;

  await fetch(url);
  return 'Greetings was send to George';
}
