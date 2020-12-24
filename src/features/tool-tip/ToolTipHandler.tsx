import React, { useCallback } from 'react';

import { ActionToolTip } from 'features/tool-tip/ActionToolTip';
import { useToolTipPosition } from 'features/tool-tip/hooks';
import { highlightSelectedText } from 'features/tool-tip/dom-utils';

export function ToolTipHandler(): JSX.Element {
  const { toolTipPosition, showToolTip, setShowToolTip } = useToolTipPosition();

  const handleClickHighlight = useCallback(() => {
    highlightSelectedText();
    setShowToolTip(false);
  }, []);

  const handleClickBookmark = useCallback(() => {
    setShowToolTip(false);
  }, []);

  return (
    <>
      {showToolTip && (
        <ActionToolTip
          {...toolTipPosition}
          onClickHighlight={handleClickHighlight}
          onClickBookmark={handleClickBookmark}
        />
      )}
    </>
  );
}
