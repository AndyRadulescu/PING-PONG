import React, { useEffect, useRef, useState } from 'react';
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

  const inputName = <input
    className={`bg-transparent text-white rounded border font-bold w-full text-center py-2 ${buttonContent?.borderClass}`}
    onClick={(event) => event.stopPropagation()} />;

  const button = <button
    className={`text-white font-bold py-2 px-4 border rounded w-full ${buttonContent?.class} ${buttonContent?.borderClass}`}
    onClick={(event) => expandToBox(event)}>
    {/*<Link href="/game">Start New Game</Link>*/}
    {buttonContent?.text}
  </button>;

  return (
    <div className={`w-1/3 mb-3 min-w-fit`}>
      {state ? inputName : button}
    </div>
  );
}
