import React from 'react';

import defaultTheme from '../../themes/default';

const TOOL_TIP_HEIGHT = 32;
const X_OFFSET = TOOL_TIP_HEIGHT;
const Y_OFFSET = TOOL_TIP_HEIGHT + 16;

export function ActionToolTip(props) {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: props.x - X_OFFSET,
          top: props.y - Y_OFFSET,
          backgroundColor: defaultTheme.palette.primary,
          flexDirection: 'row',
          display: 'flex',
          height: TOOL_TIP_HEIGHT,
        }}
      >
        <button style={styles.button}>🔆</button>
        <button style={styles.button}>🔖</button>
      </div>
      <div
        style={{
          position: 'fixed',
          left: props.x - 16,
          top: props.y - 16,
          border: `16px solid ${defaultTheme.palette.primary}`,
          borderColor: `${defaultTheme.palette.primary} transparent transparent transparent`,
        }}
      />
    </>
  );
}

const styles = {
  button: {
    display: 'flex',
    width: TOOL_TIP_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: defaultTheme.palette.primary,
    border: 0,
  },
};
