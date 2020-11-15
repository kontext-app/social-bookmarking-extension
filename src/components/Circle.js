import React from 'react';

import { Box } from 'components/Box';

export function Circle(props) {
  return (
    <Box
      height={props.size || 32}
      width={props.size || 32}
      borderRadius={'50%'}
      backgroundColor={props.color || 'lightGrey'}
      {...props}
    />
  );
}
