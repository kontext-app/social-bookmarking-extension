import styled from 'styled-components';
import { typography, color, space, layout } from 'styled-system';

import type {
  TypographyProps,
  ColorProps,
  SpaceProps,
  LayoutProps,
} from 'styled-system';
import type { ThemeProps } from '../themes/default';

type Props = { theme: ThemeProps } & TypographyProps &
  ColorProps &
  SpaceProps &
  LayoutProps;

export const Text = styled.span<Props>`
  font-family: ${(props: Props) => props.theme.fonts.body};
  ${typography}
  ${color}
  ${space}
  ${layout}
`;
