import 'libs/polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, StyleSheetManager } from 'styled-components';

import { highlightSelectedText } from 'features/highlight/dom-utils';
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
  useEventListener('mouseup', event => {
    highlightSelectedText();
  });

  return (
    <StyleSheetManager target={styleContainer}>
      <ThemeProvider theme={defaultTheme}>{/* TODO */}</ThemeProvider>
    </StyleSheetManager>
  );
}

ReactDOM.render(<App />, appContainer);
