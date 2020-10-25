import React from 'react';

import { Box } from 'components/Box';

import { LogIn } from 'features/popup/LogIn';

export function Popup(props) {
  return (
    <Box height={384} width={384}>
      <LogIn />
    </Box>
  );
}
