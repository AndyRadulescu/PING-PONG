import React from 'react';
import NewGame from '@/app/shared/new-game';
import { getData } from '@/app/core/api/api';

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
