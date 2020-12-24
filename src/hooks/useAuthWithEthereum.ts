import { connectWithWeb3 } from 'apis/web3';
import { authenticateWithEthereum } from 'apis/ceramic';

export function useAuthWithEthereum(): () => Promise<void> {
  return async () => {
    const { provider, addresses } = await connectWithWeb3();
    await authenticateWithEthereum(provider, addresses[0]);
  };
}
