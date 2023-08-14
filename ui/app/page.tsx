import React from 'react';
import NewGame from '@/app/shared/new-game';

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
      <div className="container mx-auto px-4 h-screen flex flex-col">
        <NewGame></NewGame>
        <div className="grow-0 items-end flex justify-center">
          <p>version: {JSON.stringify(data.version)}</p>
        </div>
      </div>
    </main>
  );
}
