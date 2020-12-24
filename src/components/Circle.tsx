import React from 'react';

import { Box, Props as BoxProps } from 'components/Box';

export type Props = {
  size?: number;
  color?: string;
} & BoxProps;

export function Circle(props: Props): JSX.Element {
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
