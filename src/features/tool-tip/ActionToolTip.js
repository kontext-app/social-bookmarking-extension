import React from 'react';
import styled from 'styled-components';

const ActionToolTipBox = styled.div`
  position: fixed;
  left: ${props => `${props.x - 32}px`};
  top: ${props => `${props.y - 48}px`};
  background-color: ${props => props.theme.palette.primary};
  flex-direction: row;
  display: flex;
  height: 32px;
`;

const ActionToolTipArrow = styled.div`
  position: fixed;
  left: ${props => `${props.x - 16}px`};
  top: ${props => `${props.y - 16}px`};
  border: 16px solid ${props => props.theme.palette.primary};
  border-color: ${props => props.theme.palette.primary} transparent transparent transparent;
`;

const ActionButton = styled.button`
  display: flex;
  width: 32px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.palette.primary};
  border: 0;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export function ActionToolTip(props) {
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
