import React, { useState, useEffect } from 'react';
import { enums } from 'kontext-common';

import { LogIn } from 'features/popup/LogIn';
import { AddBookmark } from 'features/popup/AddBookmark';

import { getLastAuthenticatedDID } from 'apis/storage';

export function Popup(): JSX.Element {
  const [lastAuthenticatedDID, setLastAuthenticatedDID] = useState<string>(
    enums.LoadingStatus.IDLE
  );

  useEffect(() => {
    getLastAuthenticatedDID().then((did: string) => {
      console.log({ lastAuthenticatedDID: did });
      setLastAuthenticatedDID(did);
    });
  }, []);

  if (
    typeof lastAuthenticatedDID === 'string' &&
    lastAuthenticatedDID !== enums.LoadingStatus.IDLE
  ) {
    return <AddBookmark lastAuthenticatedDID={lastAuthenticatedDID} />;
  }

  return <LogIn />;
}
