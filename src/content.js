import 'libs/polyfills';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, StyleSheetManager } from 'styled-components';

import { highlightSelectedText, findNodeByText } from 'features/highlight/dom-utils';
import { ActionToolTip } from 'features/highlight/ActionToolTip';
import { useEventListener } from 'hooks/useEventListener';
import defaultTheme from 'themes/default';

const root = document.createElement('div');
const shadow = root.attachShadow({ mode: 'open' });

const styleContainer = document.createElement('div');
const appContainer = document.createElement('div');

shadow.appendChild(styleContainer);
shadow.appendChild(appContainer);

document.body.appendChild(root);

function App() {
  const [showToolTip, setShowToolTip] = useState(false);
  const [toolTipPosition, setToolTipPosition] = useState({
    x: 0,
    y: 0,
  });

  useEventListener('mouseup', event => {
    const { highlightedText, domRect } = highlightSelectedText();
    if (highlightedText) {
      setToolTipPosition({ x: domRect.x + domRect.width / 2, y: domRect.y });
      setShowToolTip(true);
      console.log(findNodeByText('p', 'How to get tag'));
    } else {
      setShowToolTip(false);
    }
  });

  return (
    <StyleSheetManager target={styleContainer}>
      <ThemeProvider theme={defaultTheme}>
        {showToolTip && <ActionToolTip {...toolTipPosition} />}
      </ThemeProvider>
    </StyleSheetManager>
  );
}

ReactDOM.render(<App />, appContainer);
