import 'libs/polyfills';
import React, { useState } from 'react';
import { enums } from 'kontext-common';

import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { Button } from 'components/Button';

import {
  getDID,
  hasBookmarksIndex,
  setDefaultBookmarksIndex,
} from 'apis/ceramic';
import { useAuthWithEthereum } from 'hooks/useAuthWithEthereum';
import { storeLastAuthenticatedDID } from 'apis/storage';

import type { LoadingStatus } from 'kontext-common';

export function Options(): JSX.Element {
  const [authStatus, setAuthStatus] = useState<LoadingStatus>(
    enums.LoadingStatus.IDLE
  );
  const [did, setDID] = useState('');
  const authWithEthereum = useAuthWithEthereum();

  const handleClickContinue = async () => {
    try {
      setAuthStatus(enums.LoadingStatus.PENDING);
      await authWithEthereum();
      const isBookmarksIndexInitialized = await hasBookmarksIndex();

      if (!isBookmarksIndexInitialized) {
        await setDefaultBookmarksIndex();
      }

      setAuthStatus(enums.LoadingStatus.FULFILLED);
      const lastAuthenticatedDID = getDID();
      setDID(lastAuthenticatedDID);
      storeLastAuthenticatedDID(lastAuthenticatedDID);
    } catch (error) {
      setAuthStatus(enums.LoadingStatus.REJECTED);
      console.error(error);
    }
  };

  const isPending = authStatus === enums.LoadingStatus.PENDING;

  return (
    <Box
      display="flex"
      padding={3}
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      gridGap={3}
    >
      <Text fontSize={3}>Welcome to Kontext</Text>
      {did !== '' ? (
        <>
          <Text>You successfully logged in with your Ethereum account! 🥳</Text>
          <Text>Your DID: {did}</Text>
        </>
      ) : (
        <>
          <Text>
            To log in via an Ethereum account, click the button below.
          </Text>
          <Button onClick={handleClickContinue} disabled={isPending}>
            {isPending ? 'Authenticating...' : 'Continue'}
          </Button>
        </>
      )}
    </Box>
  );
}
