import defaultTheme from 'themes/default';

export function getSelection() {
  const selection = window.getSelection();

  if (!selection?.rangeCount) {
    return;
  }

  return selection;
}

export function getSelectedText() {
  const selection = getSelection();

  if (!selection) {
    return;
  }

  return selection.toString();
}

export function highlightSelectedText(
  highlightColor = defaultTheme.colors.highlight
) {
  const selection = getSelection();

  if (!selection?.rangeCount) {
    return;
  }

  const range = selection.getRangeAt(0);
  const spanWrapper = document.createElement('span');
  spanWrapper.style.backgroundColor = highlightColor;
  spanWrapper.appendChild(range.extractContents());
  range.insertNode(spanWrapper);

  return true;
}

export function getDOMRectOfSelection() {
  const selection = getSelection();

  if (!selection) {
    return;
  }

  const range = selection.getRangeAt(0);
  return range.getBoundingClientRect();
}

export function findNodeByText(selector: any, text: string) {
  return Array.from(document.querySelectorAll(selector)).find((element) => {
    return element.textContent.includes(text);
  });
}
