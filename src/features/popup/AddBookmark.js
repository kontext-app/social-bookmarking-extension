import React, { useState, useEffect } from 'react';
import { User } from 'react-feather';

import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { Button } from 'components/Button';
import { Circle } from 'components/Circle';
import { CircleIcon } from 'components/CircleIcon';
import { Input } from 'components/Input';

import { LoadingStatus } from 'constants/enums';
import { useAuthWithEthereum } from 'hooks/useAuthWithEthereum';
import {
  getProfileByDID,
  getBookmarksIndexDocContent,
  createBookmarkDoc,
  addBookmarkDocToBookmarksDoc,
} from 'apis/ceramic';
import { getActiveTab } from 'apis/tabs';
import { enrichPartialBookmark } from 'features/popup/utils';

export function AddBookmark(props) {
  const [profileLoadingStatus, setProfileLoadingStatus] = useState(LoadingStatus.IDLE);
  const [bookmarkLoadingStatus, setBookmarkLoadingStatus] = useState(LoadingStatus.IDLE);
  const authWithEthereum = useAuthWithEthereum();
  const [profile, setProfile] = useState({});
  const [initialBookmarkFrom, setInitialBookmarkForm] = useState({});

  useEffect(() => {
    setProfileLoadingStatus(LoadingStatus.PENDING);
    authWithEthereum()
      .then(() => getProfileByDID())
      .then(basicProfile => setProfile(basicProfile || {}))
      .then(() => setProfileLoadingStatus(LoadingStatus.SUCCESS))
      .catch(error => {
        setProfileLoadingStatus(LoadingStatus.FAIL);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getActiveTab().then(activeTab => {
      const { title, url } = activeTab;
      setInitialBookmarkForm({ title, url });
    });
  }, []);

  const handleClickSave = async bookmark => {
    try {
      setBookmarkLoadingStatus(LoadingStatus.PENDING);
      const enrichedBookmark = enrichPartialBookmark({
        ...bookmark,
        author: props.lastAuthenticatedDID,
      });
      // TODO: Allow to change collection
      const unsortedIndexKeyDocID = (await getBookmarksIndexDocContent())['unsorted'];
      const addedBookmarkDocID = await createBookmarkDoc(enrichedBookmark);
      const { id } = await addBookmarkDocToBookmarksDoc(addedBookmarkDocID, unsortedIndexKeyDocID);
      console.log('Successfully added document with docID: ', id.toUrl('base36'));
      setBookmarkLoadingStatus(LoadingStatus.SUCCESS);
      setInitialBookmarkForm({});
    } catch (error) {
      console.log({ error });
      setBookmarkLoadingStatus(LoadingStatus.FAIL);
    }
  };

  const isProfileLoading = [LoadingStatus.PENDING, LoadingStatus.IDLE].includes(
    profileLoadingStatus
  );
  const isBookmarkLoading = [LoadingStatus.PENDING].includes(bookmarkLoadingStatus);

  return (
    <Box
      height={384}
      width={384}
      padding={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <UpperBox
        isLoading={isProfileLoading}
        username={profile.username}
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

function UpperBox(props) {
  const { isLoading, did, username, imgSrc } = props;
  return (
    <Box display="flex" width="100%" flexDirection="row" overflowX="hidden">
      {isLoading ? (
        <Circle color="lightGrey" marginRight={3} />
      ) : (
        // TODO: Use img src
        <CircleIcon backgroundColor="lightGrey" marginRight={3} icon={<User color="white" />} />
      )}
      <Box width="90%">
        {isLoading ? (
          <>
            <Box height={14} backgroundColor="lightGrey" marginBottom={1} />
            <Box height={14} backgroundColor="lightGrey" marginTop={1} />
          </>
        ) : (
          <Box display="flex" flexDirection="column" justifyContent="space-between">
            <Text>{username || 'Username'}</Text>
            <Text color="grey" fontSize={1}>
              {did}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function BookmarkForm(props) {
  const { isLoading, isSaving, initialBookmarkForm } = props;
  const [bookmarkForm, setBookmarkForm] = useState({});

  useEffect(() => {
    setBookmarkForm({
      ...initialBookmarkForm,
    });
  }, [initialBookmarkForm]);

  const handleChange = (key, event) => {
    setBookmarkForm(prevBookmarkForm => ({
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
      marginTop={3}
    >
      <Box
        flex={1}
        display="flex"
        width="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Box display="flex" flexDirection="column" width="100%">
          <Text>Title</Text>
          <Input value={bookmarkForm.title} onChange={e => handleChange('title', e)} />
        </Box>
        <Box display="flex" flexDirection="column" width="100%">
          <Text>Description</Text>
          <Input value={bookmarkForm.description} onChange={e => handleChange('description', e)} />
        </Box>
        <Box display="flex" flexDirection="column" width="100%">
          <Text>URL</Text>
          <Input value={bookmarkForm.url} disabled />
        </Box>
      </Box>
      <Button onClick={handleClickSave} disabled={isLoading || isSaving}>
        {isSaving ? 'Saving...' : 'Save Bookmark'}
      </Button>
    </Box>
  );
}
