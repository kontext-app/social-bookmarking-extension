import React from 'react';

import { Circle, Props as CircleProps } from 'components/Circle';
import { Box } from 'components/Box';

export type Props = CircleProps & {
  icon: any;
};

export function CircleIcon(props: Props): JSX.Element {
  const { icon, ...restProps } = props;
  return (
    <Circle {...restProps}>
      <Box flexDirection="column" display="flex" alignItems="center">
        {icon}
      </Box>
    </Circle>
  );
}
