import { useState, useEffect } from 'react';

import { connectWithWeb3 } from 'apis/web3';
import { createIDX, authenticateWithEthereum } from 'apis/ceramic';

export function useAuthWithEthereum() {
  return async () => {
    createIDX();
    const { provider, addresses } = await connectWithWeb3();
    await authenticateWithEthereum(provider, addresses[0]);
  };
}
