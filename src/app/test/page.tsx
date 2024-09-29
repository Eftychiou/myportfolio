import React from 'react';

// Fetch data directly in the component (Server Component)
export default async function Page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    cache: 'no-store' // Ensures data is fetched on every request (SSR-like behavior)
  });

  const data = await res.text();

  return (
    <div>
      <h1>Server Rendered Page</h1>
      <h1>Server Rendered Page</h1>
      <h1>Server Rendered Page</h1>
      <h1>Server Rendered Page</h1>
      <ul>{data}</ul>
    </div>
  );
}
