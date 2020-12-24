import styled from 'styled-components';
import { layout } from 'styled-system';

import type { LayoutProps } from 'styled-system';

export const Input = styled.input<LayoutProps>`
  padding: 1px;
  ${layout}
`;
