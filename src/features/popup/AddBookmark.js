import React, { useState } from 'react';

import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { Button } from 'components/Button';

import { LoadingStatus } from 'constants/enums';
import { useAuthWithEthereum } from 'hooks/useAuthWithEthereum';

export function AddBookmark() {
  const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.IDLE);
  const authWithEthereum = useAuthWithEthereum();

  // useEffect(() => {
  //   setLoadingStatus(LoadingStatus.PENDING);
  //   authWithEthereum()
  //     .then(() => setLoadingStatus(LoadingStatus.SUCCESS))
  //     .catch(error => {
  //       setLoadingStatus(LoadingStatus.FAIL);
  //       console.error(error);
  //     });
  // }, []);

  const handleClickSave = () => {};

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
      <Text fontSize={3}>Add bookmark</Text>
      <Button onClick={handleClickSave}>Save</Button>
    </Box>
  );
}
