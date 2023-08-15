'use client';

import Link from 'next/link';
import React, { useState } from 'react';

enum StartType {
  NEW = 'NEW',
  JOIN = 'JOIN'
}

export default function NewGame() {

  const [state, setState] = useState({ newEdit: false, joinEdit: false });

  const expandToBox = (event: React.MouseEvent<HTMLElement>, type: string) => {
    event.stopPropagation();
    console.log('expand item');
    switch (type) {
      case StartType.JOIN: {
        console.log(StartType.JOIN);
        setState({ ...state, joinEdit: true });
        return;
      }
      case StartType.NEW: {
        setState({ ...state, newEdit: true });
        console.log(StartType.NEW);
      }
    }
  };

  const closeExpansion = () => {
    setState({ newEdit: false, joinEdit: false });
    console.log('close expansion');
  };

  return (
    <div className="grow flex justify-center items-center flex-col" onClick={closeExpansion}>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded block w-1/3 mb-3"
        onClick={(event) => expandToBox(event, StartType.NEW)}>
        {/*<Link href="/game">Start New Game</Link>*/}
        START NEW GAME
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded block w-1/3"
        onClick={(event) => expandToBox(event, StartType.JOIN)}>
        JOIN GAME
      </button>
    </div>
  );
}
