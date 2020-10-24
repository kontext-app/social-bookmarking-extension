import React, { useCallback } from 'react';

import { ActionToolTip } from 'features/tool-tip/ActionToolTip';
import { useToolTipPosition } from 'features/tool-tip/hooks';
import { highlightSelectedText, getSelectedText } from 'features/tool-tip/dom-utils';

export function ToolTipHandler(props) {
  const { toolTipPosition, showToolTip, setShowToolTip } = useToolTipPosition();

  const handleClickHighlight = useCallback(() => {
    highlightSelectedText();
    setShowToolTip(false);
  }, []);

  const handleClickBookmark = useCallback(() => {
    const selectedText = getSelectedText();
    setShowToolTip(false);
    console.log({ selectedText });
  }, []);

  return (
    <>
      {showToolTip && (
        <ActionToolTip
          {...props}
          {...toolTipPosition}
          onClickHighlight={handleClickHighlight}
          onClickBookmark={handleClickBookmark}
        />
      )}
    </>
  );
}
