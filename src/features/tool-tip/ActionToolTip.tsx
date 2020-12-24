import React from 'react';
import styled from 'styled-components';

import type { ThemeProviderProps } from 'themes/default';

type CoordinateProps = {
  x: number;
  y: number;
};

const ActionToolTipBox = styled.div<ThemeProviderProps & CoordinateProps>`
  position: fixed;
  left: ${(props) => `${props.x - 32}px`};
  top: ${(props) => `${props.y - 48}px`};
  background-color: ${(props) => props.theme.colors.accent};
  flex-direction: row;
  display: flex;
  height: 32px;
`;

const ActionToolTipArrow = styled.div<ThemeProviderProps & CoordinateProps>`
  position: fixed;
  left: ${(props) => `${props.x - 16}px`};
  top: ${(props) => `${props.y - 16}px`};
  border: 16px solid ${(props) => props.theme.colors.accent};
  border-color: ${(props) => props.theme.colors.accent} transparent transparent
    transparent;
`;

const ActionButton = styled.button<ThemeProviderProps>`
  display: flex;
  width: 32px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.accent};
  border: 0;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

type ActionToolTipProps = CoordinateProps & {
  onClickHighlight?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onClickBookmark?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

export function ActionToolTip(props: ActionToolTipProps): JSX.Element {
  return (
    <>
      <ActionToolTipBox {...props}>
        <ActionButton onClick={props.onClickHighlight}>🔆</ActionButton>
        <ActionButton onClick={props.onClickBookmark}>🔖</ActionButton>
      </ActionToolTipBox>
      <ActionToolTipArrow {...props} />
    </>
  );
}
