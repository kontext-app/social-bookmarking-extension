import styled from 'styled-components';
import { typography } from 'styled-system';

export const Text = styled.span(
  {
    fontFamily: props => props.theme.fonts.body,
  },
  typography
);
