import { apis } from 'kontext-common';

import type { IDX } from '@ceramicstudio/idx';
import type { CeramicApi } from '@ceramicnetwork/common';
import type { EthereumProvider } from '3id-connect';
import type { BookmarkDocContent } from 'kontext-common';

let ceramic: CeramicApi;
let idx: IDX;

export function initializeCeramic(): void {
  // @ts-ignore
  ceramic = apis.ceramic.createCeramic(process.env.CERAMIC_API_HOST);
}

export function initializeIDX(ceramic: CeramicApi): void {
  idx = apis.idx.createIDX(ceramic);
}

export async function authenticateWithEthereum(
  ethereumProvider: EthereumProvider,
  address: string
): Promise<void> {
  initializeCeramic();

  const didProvider = await apis.threeId.createThreeIdFromEthereumProvider({
    threeIdConnectHost: process.env.THREE_ID_CONNECT_HOST,
    ceramic,
    ethereumProvider,
    address,
  });
  await apis.threeId.authenticate({ ceramic, didProvider });

  initializeIDX(ceramic);
}

export function isIDXAuthenticated(): boolean {
  return idx.authenticated;
}

export function getDID(): string {
  return idx.id;
}

export async function getProfileByDID(did?: string) {
  return apis.profile.getBasicProfileDocContent(idx, did);
}

export async function getBookmarksIndexDocID(did?: string) {
  return apis.bookmarks.getBookmarksIndexDocID(idx, did);
}

export async function getBookmarksIndexDocContent(did?: string) {
  return apis.bookmarks.getBookmarksIndexDocContent(idx, did);
}

export async function hasBookmarksIndex(did?: string) {
  return apis.bookmarks.hasBookmarksIndex(idx, did);
}

export async function setDefaultBookmarksIndex() {
  return apis.bookmarks.setDefaultBookmarksIndex(idx);
}

export async function createEmptyBookmarksDoc() {
  return apis.bookmarks.createEmptyBookmarksDoc(idx);
}

export async function createEmptyBookmarksListsDoc() {
  return apis.bookmarks.createEmptyBookmarksListsDoc(idx);
}

export async function createBookmarkDoc(bookmarkToAdd: BookmarkDocContent) {
  return apis.bookmarks.createBookmarkDoc(idx, bookmarkToAdd);
}

export async function addBookmarkDocToBookmarksDoc(
  bookmarkDocID: string,
  bookmarksDocID: string
) {
  return apis.bookmarks.addBookmarkDocToBookmarksDoc(idx, {
    bookmarkDocID,
    bookmarksDocID,
  });
}
