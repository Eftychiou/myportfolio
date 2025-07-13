export const dynamic = 'force-dynamic'; // Disable static rendering

export default function GeoPage() {
  console.log('NEXT_PUBLIC_IFRAME_URL:', process.env.NEXT_PUBLIC_IFRAME_URL);
  console.log('NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);
  console.log('NEXT_PUBLIC_IFRAME_WIDTH:', process.env.NEXT_PUBLIC_IFRAME_WIDTH);
  console.log('NEXT_PUBLIC_IFRAME_HEIGHT:', process.env.NEXT_PUBLIC_IFRAME_HEIGHT);

  console.log('STATIC_FILES_LOCATION:', process.env.STATIC_FILES_LOCATION);
  console.log('DATABASE_LOCATION:', process.env.DATABASE_LOCATION);
  console.log('CALLMEBOT_PHONE_NUMBER:', process.env.CALLMEBOT_PHONE_NUMBER);
  console.log('CALLMEBOT_API_KEY:', process.env.CALLMEBOT_API_KEY);
  console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
  console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
  console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);
  console.log('ADMIN_ALLOWED_EMAIL:', process.env.ADMIN_ALLOWED_EMAIL);
  console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
  console.log('OAUTH_REDIRECT_URI:', process.env.OAUTH_REDIRECT_URI);
  console.log('GOOGLE_ANALYTICS_KEY:', process.env.GOOGLE_ANALYTICS_KEY);

  return (
    <div>
      <h1>Geo Page</h1>
    </div>
  );
}
