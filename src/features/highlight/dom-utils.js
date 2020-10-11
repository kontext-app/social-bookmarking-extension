export function highlightSelectedText(highlightColor = '#f9f2ae') {
  const selection = window.getSelection();

  if (selection.rangeCount) {
    const range = selection.getRangeAt(0);
    const spanWrapper = document.createElement('span');
    spanWrapper.style.backgroundColor = highlightColor;
    spanWrapper.appendChild(range.extractContents());
    range.insertNode(spanWrapper);
  }
}
