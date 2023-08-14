'use client';

import Link from 'next/link';
import React from 'react';

export default function NewGame() {
  const expandToBox = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log('expand item');
  };

  const tester = () => {
    console.log('test pressed');
  };

  return (
    <div className="grow flex justify-center items-center flex-col" onClick={tester}>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded block w-1/3 mb-3">
        <Link href="/game">Start New Game</Link>
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded block w-1/3"
        onClick={expandToBox}>
        Join Game
      </button>
    </div>
  );
}
