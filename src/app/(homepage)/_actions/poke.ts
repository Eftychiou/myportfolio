'use server';

export async function sayHello(ip: string) {
  const sanitizedIp = ip.replace(/[^a-zA-Z0-9]/g, '_');

  const phoneNumber = process.env.NEXT_PUBLIC_CALLMEBOT_PHONE_NUMBER;
  const apiKey = process.env.NEXT_PUBLIC_CALLMEBOT_API_KEY;
  const message = encodeURIComponent(`Someone with ip ${sanitizedIp} is saying sending his greetings`);

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${message}&apikey=${apiKey}`;

  fetch(url)
    .then((res) => {
      return res.text();
    })
    .catch((err) => console.log(err));
  return 'Greetings was send to George';
}
