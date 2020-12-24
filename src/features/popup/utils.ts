import type { BookmarkDocContent } from 'kontext-common';

export function enrichPartialBookmark(
  partialBookmark: Partial<BookmarkDocContent>
): BookmarkDocContent {
  const {
    url = '',
    description = '',
    title = '',
    author = '',
    highlightedText = '',
    creationDate = new Date().toISOString(),
  } = partialBookmark;

  return {
    url,
    title,
    author,
    description,
    highlightedText,
    creationDate,
  };
}
