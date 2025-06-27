'use server';

import { headers } from 'next/headers';
import { sendMessageToWhatsUp } from '../../../../lib';

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

export const getGeoData = async (ip: string): Promise<GeoIPData> =>
  await (await fetch(`https://ipapi.co/${ip}/json/`)).json();

export async function sayHello() {
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') || '8.8.8.8'; // fallback for testing
  const data = await getGeoData(ip);
  sendMessageToWhatsUp(
    `Someone clicked and said hello with ip ${data?.ip || ''} from ${data?.country_name || ''}/${
      data?.city || ''
    } sending his greetings`
  );

  return 'Greetings was send to George';
}
