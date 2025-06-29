import { Inter } from 'next/font/google';
import classes from './_styles/layout.module.scss';
import { Nav } from '@/shared/components/nav';
import '../styles/globals.css';
import Script from 'next/script';
import { Analytics } from '@/shared/components/Analytics';
import SessionProvider from '../shared/components/SessionProvider';
import { headers } from 'next/headers';
import { getGeoData } from './(homepage)/_actions/poke';
import { sendMessageToWhatsUp } from '../../lib';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === 'production') {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || '8.8.8.8'; // fallback for testing
    getGeoData(ip).then((data) => {
      sendMessageToWhatsUp(
        `You have visitor in the website with ip ${data?.ip || ''} from ${data?.country_name || ''}/${data?.city || ''}`
      );
    });
  }
  return (
    <html lang='en'>
      <head>
        <meta name='theme-color' content='#7D5F6E' />
      </head>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_KEY}`}
      />
      <Script id='gtag-init' strategy='afterInteractive'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_KEY}', {
              page_path: window.location.pathname,
            });
          `}
      </Script>
      <body className={[inter.className, classes.body].join(' ')}>
        <SessionProvider>
          <header>
            <Nav />
          </header>
          <main>{children}</main>
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
