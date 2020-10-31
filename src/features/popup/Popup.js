import React, { useState } from 'react';

import { Box } from 'components/Box';

import { LogIn } from 'features/popup/LogIn';
import { OPEN_WEB3_MODAL } from 'features/web3-modal/messages';

import { sendMessageToActiveTab } from 'features/popup/utils';

export function Popup(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClickLogIn = async () => {
    try {
      browser.tabs.create({
        // TODO: Point to login url of web app
        url: 'web3-modal.html',
      });
      window.close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box display="flex">
      <LogIn onClickLogIn={handleClickLogIn} />
    </Box>
  );
}
