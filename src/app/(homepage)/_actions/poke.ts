'use server';

import { headers } from 'next/headers';

export interface GeoIPData {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string | null;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}

const getGeoData = async (ip: string): Promise<GeoIPData> => await (await fetch(`https://ipapi.co/${ip}/json/`)).json();

export async function sayHello() {
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') || '8.8.8.8'; // fallback for testing
  const data = await getGeoData(ip);
  const phoneNumber = process.env.NEXT_PUBLIC_CALLMEBOT_PHONE_NUMBER;
  const apiKey = process.env.NEXT_PUBLIC_CALLMEBOT_API_KEY;
  const message = encodeURIComponent(
    `Someone with ip ${data?.ip || ''} from ${data?.country_name || ''}/${data?.city || ''} sending his greetings`
  );

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${message}&apikey=${apiKey}`;

  fetch(url)
    .then((res) => {
      return res.text();
    })
    .catch((err) => console.log(err));
  return 'Greetings was send to George';
}
