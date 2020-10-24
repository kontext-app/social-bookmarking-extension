import 'libs/polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import { Popup } from 'features/popup/Popup';

import defaultTheme from 'themes/default';

const root = document.createElement('div');

document.body.appendChild(root);

function PopupApp() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Popup />
    </ThemeProvider>
  );
}

ReactDOM.render(<PopupApp />, root);
