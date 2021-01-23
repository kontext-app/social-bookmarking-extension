import React, { useState, useEffect } from 'react';
import {
  BasicProfileDocContent,
  BookmarkDocContent,
  enums,
} from 'kontext-common';

import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { useAuthWithEthereum } from 'hooks/useAuthWithEthereum';
import {
  getProfileByDID,
  getBookmarksIndexDocContent,
  createBookmarkDoc,
  addBookmarkDocToBookmarksDoc,
} from 'apis/ceramic';
import { getActiveTab } from 'apis/tabs';
import { enrichPartialBookmark } from 'features/popup/utils';
// @ts-ignore
import Logo from '../../assets/img/icon-48x48.png';

import type { LoadingStatus } from 'kontext-common';

type Props = {
  lastAuthenticatedDID?: string;
};

export function AddBookmark(props: Props): JSX.Element {
  const [
    profileLoadingStatus,
    setProfileLoadingStatus,
  ] = useState<LoadingStatus>(enums.LoadingStatus.IDLE);
  const [
    bookmarkLoadingStatus,
    setBookmarkLoadingStatus,
  ] = useState<LoadingStatus>(enums.LoadingStatus.IDLE);
  const authWithEthereum = useAuthWithEthereum();
  const [profile, setProfile] = useState<Partial<BasicProfileDocContent>>({});
  const [initialBookmarkFrom, setInitialBookmarkForm] = useState({});

  useEffect(() => {
    setProfileLoadingStatus(enums.LoadingStatus.PENDING);
    authWithEthereum()
      .then(() => getProfileByDID())
      .then((basicProfile) => setProfile(basicProfile || {}))
      .then(() => setProfileLoadingStatus(enums.LoadingStatus.FULFILLED))
      .catch((error) => {
        setProfileLoadingStatus(enums.LoadingStatus.REJECTED);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getActiveTab().then((activeTab) => {
      const { title, url } = activeTab;
      setInitialBookmarkForm({ title, url });
    });
  }, []);

  const handleClickSave = async (bookmark: Partial<BookmarkDocContent>) => {
    try {
      setBookmarkLoadingStatus(enums.LoadingStatus.PENDING);
      const enrichedBookmark = enrichPartialBookmark({
        ...bookmark,
        author: props.lastAuthenticatedDID,
      });
      const bookmarksIndexDocContent = await getBookmarksIndexDocContent();

      if (!bookmarksIndexDocContent) {
        throw new Error('BookmarksIndex doc content is null!');
      }

      // TODO: Allow to change collection
      const unsortedIndexKeyDocID = bookmarksIndexDocContent['unsorted'];
      const addedBookmarkDocID = await createBookmarkDoc(enrichedBookmark);
      const { id } = await addBookmarkDocToBookmarksDoc(
        addedBookmarkDocID,
        unsortedIndexKeyDocID
      );
      console.log('Successfully added document with docID: ', id.toUrl());
      setBookmarkLoadingStatus(enums.LoadingStatus.FULFILLED);
      setInitialBookmarkForm({});
    } catch (error) {
      console.log({ error });
      setBookmarkLoadingStatus(enums.LoadingStatus.REJECTED);
    }
  };

  const isProfileLoading = [
    enums.LoadingStatus.PENDING,
    enums.LoadingStatus.IDLE,
    // @ts-ignore
  ].includes(profileLoadingStatus);
  const isBookmarkLoading = [enums.LoadingStatus.PENDING].includes(
    // @ts-ignore
    bookmarkLoadingStatus
  );

  return (
    <Box
      height={260}
      width={384}
      padding={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <UpperBox
        isLoading={isProfileLoading}
        username={profile.name}
        did={props.lastAuthenticatedDID}
      />
      <BookmarkForm
        initialBookmarkForm={initialBookmarkFrom}
        onClickSave={handleClickSave}
        isLoading={isProfileLoading}
        isSaving={isBookmarkLoading}
      />
    </Box>
  );
}

function UpperBox(props: {
  isLoading: boolean;
  did?: string;
  username?: string;
  imgSrc?: string;
}) {
  const { isLoading, did, username } = props;
  return (
    <Box display="flex" width="100%" flexDirection="row" overflowX="hidden">
      <Box width="15%" alignSelf="center">
        <img src={Logo} />
      </Box>
      <Box width="85%" alignSelf="center">
        {isLoading ? (
          <>
            <Box height={14} backgroundColor="lightGrey" marginBottom={1} />
            <Box height={14} backgroundColor="lightGrey" marginTop={1} />
          </>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize={0}>{username || 'Username'}</Text>
              <Button
                paddingBottom="4px"
                paddingTop="0px"
                paddingRight="0px"
                backgroundColor="white"
                border="0px"
                onClick={() => console.log('TODO')}
              >
                Sign out
              </Button>
            </Box>
            <Text color="grey" fontSize={0}>
              {did}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function BookmarkForm(props: {
  isLoading: boolean;
  isSaving: boolean;
  initialBookmarkForm: Partial<BookmarkDocContent>;
  onClickSave: (bookmarkForm: Partial<BookmarkDocContent>) => void;
}) {
  const { isLoading, isSaving, initialBookmarkForm } = props;
  const [bookmarkForm, setBookmarkForm] = useState<Partial<BookmarkDocContent>>(
    {}
  );

  useEffect(() => {
    setBookmarkForm({
      ...initialBookmarkForm,
    });
  }, [initialBookmarkForm]);

  const handleChange = (
    key: keyof BookmarkDocContent,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBookmarkForm((prevBookmarkForm) => ({
      ...prevBookmarkForm,
      [key]: event.target.value,
    }));
  };

  const handleClickSave = () => {
    props.onClickSave(bookmarkForm);
  };

  return (
    <Box
      display="flex"
      width="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      flex={1}
    >
      <Box
        flex={1}
        display="flex"
        width="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          alignItems="center"
        >
          <Text
            width="100%"
            fontSize={0}
            marginBottom={0}
            textAlign="left"
            color="grey"
          >
            Title
          </Text>
          <Input
            width="100%"
            value={bookmarkForm.title}
            onChange={(e) => handleChange('title', e)}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          alignItems="center"
        >
          <Text
            width="100%"
            fontSize={0}
            marginBottom={0}
            textAlign="left"
            color="grey"
          >
            Description
          </Text>
          <Input
            width="100%"
            value={bookmarkForm.description}
            onChange={(e) => handleChange('description', e)}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          alignItems="center"
        >
          <Text
            width="100%"
            fontSize={0}
            marginBottom={0}
            textAlign="left"
            color="grey"
          >
            URL
          </Text>
          <Input width="100%" value={bookmarkForm.url} disabled />
        </Box>
      </Box>
      <Button onClick={handleClickSave} disabled={isLoading || isSaving}>
        {isSaving ? 'Saving...' : 'Save Bookmark'}
      </Button>
    </Box>
  );
}
