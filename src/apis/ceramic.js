import { IDXWeb } from '@ceramicstudio/idx-web';
import { definitions, schemas } from '@ceramicstudio/idx-constants';

import { PUBLISHED_DEFINITIONS, PUBLISHED_SCHEMAS } from 'constants/definitions';

let idx;

export const DefaultBookmarksIndexKeys = {
  UNSORTED: 'unsorted',
  PUBLIC: 'public',
  PRIVATE: 'private',
  LISTS: 'lists',
};

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

export async function getProfileByDID(did) {
  return idx.get('basicProfile', did);
}

export async function getBookmarksIndexDocID(did) {
  const idxDocContent = await idx.getIDXContent(did);

  if (!idxDocContent) {
    return null;
  }

  const bookmarksIndexDocID = idxDocContent[PUBLISHED_DEFINITIONS.BookmarksIndex];
  return bookmarksIndexDocID;
}

export async function getBookmarksIndexDocContent(did) {
  return idx.get('BookmarksIndex', did);
}

export async function hasBookmarksIndex(did) {
  return idx.has('BookmarksIndex', did);
}

export async function setDefaultBookmarksIndex() {
  const defaultBookmarksIndexKeyToDocID = {};

  for (const defaultBookmarksIndexKey of Object.values(DefaultBookmarksIndexKeys)) {
    const docID =
      defaultBookmarksIndexKey === DefaultBookmarksIndexKeys.LISTS
        ? await createEmptyBookmarksListsDoc()
        : await createEmptyBookmarksDoc();
    defaultBookmarksIndexKeyToDocID[defaultBookmarksIndexKey] = docID;
  }

  await idx.remove('BookmarksIndex');
  const bookmarksIndexDocID = await idx.set('BookmarksIndex', defaultBookmarksIndexKeyToDocID);

  return bookmarksIndexDocID.toUrl('base36');
}

export async function createEmptyBookmarksDoc() {
  const { id } = await idx.ceramic.createDocument('tile', {
    content: [],
    metadata: {
      schema: PUBLISHED_SCHEMAS.Bookmarks,
      controllers: [getDID()],
      tags: ['bookmarks'],
      isUnique: true,
    },
  });

  return id.toUrl('base36');
}

export async function createEmptyBookmarksListsDoc() {
  const { id } = await idx.ceramic.createDocument('tile', {
    content: [],
    metadata: {
      schema: PUBLISHED_SCHEMAS.BookmarksLists,
      controllers: [getDID()],
      tags: ['bookmarks'],
      isUnique: true,
    },
  });

  return id.toUrl('base36');
}

export async function createBookmarkDoc(bookmarkToAdd) {
  const { id } = await idx.ceramic.createDocument('tile', {
    content: bookmarkToAdd,
    metadata: {
      schema: PUBLISHED_SCHEMAS.Bookmark,
      controllers: [getDID()],
      tags: ['bookmarks'],
    },
  });
  return id.toUrl('base36');
}

export async function addBookmarkDocToBookmarksDoc(bookmarkDocID, bookmarksDocID) {
  const bookmarksDoc = await idx.ceramic.loadDocument(bookmarksDocID);
  const existingBookmarkDocIDs = bookmarksDoc.content;
  const updatedBookmarkDocIDs = [bookmarkDocID, ...existingBookmarkDocIDs];

  await bookmarksDoc.change({
    content: updatedBookmarkDocIDs,
  });

  const updatedBookmarksDoc = await idx.ceramic.loadDocument(bookmarksDocID);
  return updatedBookmarksDoc;
}
