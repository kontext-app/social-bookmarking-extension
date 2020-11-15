import styled from 'styled-components';
import {
  space,
  color,
  layout,
  flexbox,
  background,
  border,
  position,
  shadow,
  grid,
} from 'styled-system';

export const Box = styled.div(
  {
    boxSizing: 'border-box',
    minWidth: 0,
    willChange: 'transform !important',
  },
  space,
  color,
  layout,
  flexbox,
  background,
  border,
  position,
  shadow,
  grid
);
