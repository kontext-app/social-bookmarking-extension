import styled from 'styled-components';
import { space, color, layout, flexbox, background, border, position, shadow } from 'styled-system';

export const Button = styled.button(
  {
    backgroundColor: props => props.theme.colors.background,
    color: props => props.theme.colors[props.type],
    border: props => `1px solid ${props.theme.colors[props.type]}`,
    borderRadius: 3,
    padding: '8px 16px',
    fontFamily: props => props.theme.fonts.body,
    fontSize: '1',
    '&:hover': {
      opacity: 0.5,
      cursor: 'pointer',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'pointer',
    },
    fontWeight: 'bold',
    boxShadow: 'none',
  },
  space,
  color,
  layout,
  flexbox,
  background,
  border,
  position,
  shadow
);

Button.defaultProps = {
  type: 'primary',
};
