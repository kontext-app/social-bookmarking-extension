import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import defaultTheme from 'themes/default';

const root = document.createElement('div');

document.body.appendChild(root);

function OptionsApp() {
  return <ThemeProvider theme={defaultTheme}>{/* TODO */}</ThemeProvider>;
}

ReactDOM.render(<OptionsApp />, root);
