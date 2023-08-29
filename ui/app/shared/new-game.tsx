'use client';

import React, { useState } from 'react';
import { StartType } from '@/app/model/start-page';
import Box from '@/app/shared/box';

export default function NewGame() {

  const [state, setState] = useState({ newEdit: false, joinEdit: false });

  const closeExpansion = () => {
    setState({ newEdit: false, joinEdit: false });
    console.log('close expansion');
  };

  const updateNewState = (value: boolean) => {
    setState({ ...state, newEdit: value });
  };

  const updateJoinState = (value: boolean) => {
    setState({ ...state, joinEdit: value });
  };

  return (
    <div className="grow flex justify-center items-center flex-col" onClick={closeExpansion}>
      <Box type={StartType.NEW} state={state.newEdit} onUpdate={updateNewState}></Box>
      <Box type={StartType.JOIN} state={state.joinEdit} onUpdate={updateJoinState}></Box>
    </div>
  );
}
