import React from 'react';

import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { Button } from 'components/Button';

export function LogIn(props) {
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
      <Text fontSize={3}>Welcome to Kontext</Text>
      <Text>Log in with your Ethereum address to get started.</Text>
      <Button onClick={props.onClickLogIn}>Log In</Button>
    </Box>
  );
}
