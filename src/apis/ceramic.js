import { IDXWeb } from '@ceramicstudio/idx-web';
import { definitions, schemas } from '@ceramicstudio/idx-constants';

import { PUBLISHED_DEFINITIONS, PUBLISHED_SCHEMAS } from 'constants/definitions';

let idx;

export function createIDX() {
  idx = new IDXWeb({
    ceramic: process.env.CERAMIC_API_HOST,
    connect: process.env.THREE_ID_CONNECT_HOST,
    definitions: {
      ...definitions,
      ...PUBLISHED_DEFINITIONS,
    },
  });
}

export async function authenticateWithEthereum(ethereumProvider, address) {
  await idx.authenticate({
    ethereum: {
      provider: ethereumProvider,
      address,
    },
  });
}

export function isIDXAuthenticated() {
  return idx.authenticated;
}

export function getDID() {
  return idx.id;
}
