import React, { useEffect, useState } from 'react';
import { startButtonContent, StartType } from '@/app/model/start-page';

export default function Box({ type, state, onUpdate }: {
  type: StartType,
  state: boolean,
  onUpdate: (value: boolean) => void
}) {

  const buttonContent = startButtonContent.get(type);

  const expandToBox = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log('expand item: ', type);
    onUpdate(true);
  };

  return (
    <button
      className={`text-white font-bold py-2 px-4 border rounded block w-1/3 mb-3 ${buttonContent?.class}`}
      onClick={(event) => expandToBox(event)}>
      {/*<Link href="/game">Start New Game</Link>*/}
      {buttonContent?.text + state}
    </button>
  );
}
