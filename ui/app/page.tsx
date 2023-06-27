import Image from 'next/image';

async function getData(): Promise<{ version: number }> {
  const res = await fetch('http://localhost:8080/api');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json() as unknown as { version: number };
}

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <p>{JSON.stringify(data)}</p>
    </main>
  );
}
