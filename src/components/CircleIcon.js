import React from 'react';

import { Circle } from 'components/Circle';
import { Box } from 'components/Box';

export function CircleIcon(props) {
  const { icon, ...restProps } = props;
  return (
    <Circle {...restProps}>
      <Box flexDirection="column" display="flex" alignItems="center">
        {icon}
      </Box>
    </Circle>
  );
}
