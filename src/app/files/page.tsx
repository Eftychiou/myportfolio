import './styles.css';

export const dynamic = 'force-dynamic'; // Disable static rendering

export default async function FilesPage() {
  const res = await fetch('http://localhost:3003/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: '{ files }' }),
    cache: 'no-store'
  });

  const data = await res.json();

  const list = data.data.files;

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>Files</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: list // Use the `__html` key to inject the raw HTML
        }}
      />
    </div>
  );
}
