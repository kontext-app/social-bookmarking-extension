import React, { useState, useEffect } from 'react';

import { LogIn } from 'features/popup/LogIn';
import { AddBookmark } from 'features/popup/AddBookmark';

import { LoadingStatus } from 'constants/enums';

import { getLastAuthenticatedDID } from 'apis/storage';

export function Popup() {
  const [lastAuthenticatedDID, setLastAuthenticatedDID] = useState(LoadingStatus.IDLE);

  useEffect(() => {
    getLastAuthenticatedDID().then(did => {
      console.log({ lastAuthenticatedDID: did });
      setLastAuthenticatedDID(did);
    });
  }, []);

  if (typeof lastAuthenticatedDID === 'string' && lastAuthenticatedDID !== '') {
    return <AddBookmark lastAuthenticatedDID={lastAuthenticatedDID} />;
  }

  return <LogIn />;
}
