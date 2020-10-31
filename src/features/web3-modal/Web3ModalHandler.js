import 'libs/polyfills';
import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { Button } from 'components/Button';

export function Web3ModalHandler() {
  const openWeb3Modal = async () => {
    const activeTabs = await browser.tabs.query({
      currentWindow: true,
      active: true,
    });
    const window = browser.windows.get(activeTabs[0].id);
    console.log({ web3: window.web3, ethereum: window.ethereum });
    const web3Modal = new Web3Modal({
      network: process.env.WEB3_NETWORK,
      cacheProvider: true,
      disableInjectedProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: process.env.INFURA_PROJECT_ID,
          },
        },
      },
    });

    const provider = await web3Modal.connect();

    console.log({ provider });
  };

  useEffect(() => {
    openWeb3Modal();
  }, [openWeb3Modal]);

  return (
    <Box
      display="flex"
      padding={3}
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      maxHeight={4}
    >
      <Text fontSize={3}>Welcome to Kontext</Text>
      <Text>To log in via web3, click the button below.</Text>
      <Button onClick={openWeb3Modal}>Continue</Button>
    </Box>
  );
}
