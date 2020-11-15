import 'libs/polyfills';
import React, { useState } from 'react';

import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { Button } from 'components/Button';

import { getDID } from 'apis/ceramic';
import { LoadingStatus } from 'constants/enums';
import { useAuthWithEthereum } from 'hooks/useAuthWithEthereum';
import { storeLastAuthenticatedDID } from 'apis/storage';

export function Options() {
  const [authStatus, setAuthStatus] = useState(LoadingStatus.IDLE);
  const [did, setDID] = useState('');
  const authWithEthereum = useAuthWithEthereum();

  const handleClickContinue = async () => {
    try {
      setAuthStatus(LoadingStatus.PENDING);
      await authWithEthereum();
      setAuthStatus(LoadingStatus.SUCCESS);
      const lastAuthenticatedDID = getDID();
      setDID(lastAuthenticatedDID);
      storeLastAuthenticatedDID(lastAuthenticatedDID);
    } catch (error) {
      setAuthStatus(LoadingStatus.FAIL);
      console.error(error);
    }
  };

  const isPending = authStatus === LoadingStatus.PENDING;

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
          <Text>To log in via an Ethereum account, click the button below.</Text>
          <Button onClick={handleClickContinue} disabled={isPending}>
            {isPending ? 'Authenticating...' : 'Continue'}
          </Button>
        </>
      )}
    </Box>
  );
}
