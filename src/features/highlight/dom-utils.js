import defaultTheme from '../../themes/default';

export function highlightSelectedText(highlightColor = defaultTheme.palette.textHighlight) {
  const selection = window.getSelection();

  if (selection.rangeCount) {
    const range = selection.getRangeAt(0);
    const spanWrapper = document.createElement('span');
    spanWrapper.style.backgroundColor = highlightColor;
    spanWrapper.appendChild(range.extractContents());
    range.insertNode(spanWrapper);
    return {
      highlightedText: selection.toString(),
      domRect: range.getBoundingClientRect(),
    };
  }

  return null;
}

export function findNodeByText(selector, text) {
  return Array.from(document.querySelectorAll(selector)).find(element => {
    return element.textContent.includes(text);
  });
}
