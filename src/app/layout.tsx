import { Inter } from 'next/font/google';
import classes from './_styles/layout.module.scss';
import { Nav } from '@/shared/components/nav';
import '../styles/globals.css';
import Script from 'next/script';
import { Analytics } from '@/shared/components/Analytics';
import SessionProvider from '../shared/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
