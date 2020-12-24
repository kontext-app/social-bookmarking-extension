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

import type {
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexboxProps,
  BackgroundProps,
  BorderProps,
  PositionProps,
  ShadowProps,
  GridProps,
} from 'styled-system';

export type Props = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BackgroundProps &
  BorderProps &
  PositionProps &
  ShadowProps &
  GridProps;

export const Box = styled.div<Props>`
  box-sizing: border-box;
  min-width: 0;
  will-change: transform !important;
  ${space};
  ${color};
  ${layout};
  ${flexbox};
  ${background};
  ${border};
  ${position};
  ${shadow};
  ${grid};
`;
