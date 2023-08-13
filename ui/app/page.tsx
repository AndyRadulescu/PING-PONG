import Image from 'next/image';
import Link from 'next/link';

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
      <div class="container mx-auto px-4 h-screen flex flex-col">
        <div class="grow flex justify-center items-center">
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded">
            <Link href="/game">Start New Game</Link>
          </button>
        </div>
        <div class="grow-0 items-end flex justify-center">
          <p>version: {JSON.stringify(data.version)}</p>
        </div>
      </div>
    </main>
  );
}
