import styled from 'styled-components';
import { typography, color } from 'styled-system';

export const Text = styled.span(
  {
    fontFamily: props => props.theme.fonts.body,
  },
  typography,
  color
);
