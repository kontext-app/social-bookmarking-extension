import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import { Web3ModalHandler } from 'features/web3-modal/Web3ModalHandler';

import defaultTheme from 'themes/default';

const root = document.createElement('div');

document.body.appendChild(root);

function Web3ModalApp() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Web3ModalHandler />
    </ThemeProvider>
  );
}

ReactDOM.render(<Web3ModalApp />, root);
