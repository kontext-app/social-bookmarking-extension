import styled, { css } from 'styled-components';
import {
  space,
  color,
  layout,
  flexbox,
  background,
  border,
  position,
  shadow,
  variant,
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
} from 'styled-system';
import type { ThemeProps } from '../themes/default';

type Props = { variant?: 'primary'; theme: ThemeProps } & SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BackgroundProps &
  BorderProps &
  PositionProps &
  ShadowProps;

export const Button = styled.button<Props>`
  border-radius: 3;
  padding: 8px 16px;
  font-family: ${(props: Props) => props.theme.fonts.body};
  font-size: 1;
  border: 1px solid;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.5;
    cursor: 'pointer';
  }
  font-weight: bold;
  box-shadow: none;
  ${space};
  ${color};
  ${layout};
  ${flexbox};
  ${background};
  ${border};
  ${position};
  ${shadow};
  ${(props: Props) =>
    variant({
      variants: {
        primary: css`
          background-color: ${props.theme.colors.primary};
          color: ${props.theme.colors.primary};
          border-color: ${props.theme.colors.primary};
        `,
      },
    })};
`;
