import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import createMetaMaskProvider from 'metamask-extension-provider';

const web3Modal = new Web3Modal({
  network: process.env.REACT_APP_WEB3_NETWORK,
  cacheProvider: true,
  disableInjectedProvider: false,
  providerOptions: {
    'custom-metamask': {
      display: {
        logo: 'data:image/gif;base64,INSERT_BASE64_STRING',
        name: 'MetaMask',
        description: 'Connect with MetaMask',
      },
      package: createMetaMaskProvider,
      connector: async (createMetaMaskProvider) => {
        const provider = createMetaMaskProvider();
        await provider.enable();
        return provider;
      },
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.INFURA_PROJECT_ID,
      },
    },
  },
});

export async function connectWithWeb3() {
  const provider = await web3Modal.connect();
  const addresses = await provider.enable();

  return {
    provider,
    addresses,
  };
}
