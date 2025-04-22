import './styles.css';

export const dynamic = 'force-dynamic'; // Disable static rendering

export default async function FilesPage() {
  const res = await fetch('http://localhost:3003/api/files', {
    cache: 'no-store' // Ensures data is fetched on every request (SSR-like behavior)
  });
  const data: string = await res.text();

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>Files</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: data // Use the `__html` key to inject the raw HTML
        }}
      />
    </div>
  );
}
