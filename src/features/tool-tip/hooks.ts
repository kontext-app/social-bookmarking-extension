import { useState } from 'react';

import { useEventListener } from 'hooks/useEventListener';

import {
  getSelectedText,
  getDOMRectOfSelection,
} from 'features/tool-tip/dom-utils';

export function useToolTipPosition() {
  const [showToolTip, setShowToolTip] = useState(false);
  const [toolTipPosition, setToolTipPosition] = useState({
    x: 0,
    y: 0,
  });

  useEventListener('mouseup', () => {
    const selectedText = getSelectedText();

    if (!selectedText) {
      setShowToolTip(false);
    }

    if (selectedText) {
      const domRectOfSelection = getDOMRectOfSelection();

      if (domRectOfSelection) {
        setToolTipPosition({
          x: domRectOfSelection.x + domRectOfSelection.width / 2,
          y: domRectOfSelection.y,
        });
        setShowToolTip(true);
      }
    }
  });

  return {
    toolTipPosition,
    showToolTip,
    setShowToolTip,
  };
}
