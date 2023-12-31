import React, { FormEvent } from 'react';
import { startButtonContent, StartType } from '@/app/model/start-page';
import { useRouter } from 'next/navigation';
import { makeId } from '@/app/shared/utils';
import { useGameStateStore } from '@/app/core/store/game-state.store';
import { ThisPlayer } from '@/app/core/model/game-message';

export default function Box({ type, state, onUpdate }: {
  type: StartType,
  state: boolean,
  onUpdate: (value: boolean) => void
}) {
  const updateThisPlayer = useGameStateStore((state) => state.updateThisPlayer);

  const buttonContent = startButtonContent.get(type);
  const router = useRouter();

  const expandToBox = (event: React.MouseEvent<HTMLElement>) => {
    if (type === StartType.NEW) {
      updateThisPlayer(ThisPlayer.PLAYER1);
      const id = makeId(4);
      router.push(`game?id=${id}`);
      return;
    }

    event.stopPropagation();
    onUpdate(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = (e.currentTarget.elements[0] as HTMLInputElement).value;
    updateThisPlayer(ThisPlayer.PLAYER2);
    router.push(`game?id=${id}`);
  };

  const inputName = <form onSubmit={handleSubmit}><input
    className={`bg-transparent text-white rounded border font-bold w-full text-center py-2 ${buttonContent?.borderClass}`}
    onClick={(event) => event.stopPropagation()} /></form>;

  const button = <button
    className={`text-white font-bold py-2 px-4 border rounded w-full ${buttonContent?.class} ${buttonContent?.borderClass}`}
    onClick={(event) => expandToBox(event)}>
    {buttonContent?.text}
  </button>;

  return (
    <div className={`w-1/3 mb-3 min-w-fit`}>
      {state ? inputName : button}
    </div>
  );
}
