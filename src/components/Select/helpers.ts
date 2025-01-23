import type React from 'react';

type PositionProps = Pick<
  React.CSSProperties,
  'left' | 'maxWidth' | 'minWidth' | 'top'
> & { maxHeight?: number };

export const getPosition = (
  combobox: HTMLElement,
  listboxContainer: HTMLElement,
  preferredWidth: number,
  preferredHeight: number,
): PositionProps => {
  const comboboxRect = combobox.getBoundingClientRect();
  const listboxRect = listboxContainer.getBoundingClientRect();

  const space = 8;
  const scrollY = self.scrollY;

  const bodyHeight = document.body.clientHeight;
  const bodyRight = document.body.clientWidth - space;
  const style: PositionProps = {};

  const maxHeightTop = comboboxRect.top - space - space;
  const maxHeightBottom = bodyHeight - space - comboboxRect.bottom - space;

  if (maxHeightBottom >= maxHeightTop || maxHeightBottom >= preferredHeight) {
    style.top = comboboxRect.bottom + space + scrollY;
    style.maxHeight = maxHeightBottom;
  } else {
    style.top = comboboxRect.top - listboxRect.height - space + scrollY;
    style.maxHeight = maxHeightTop;
  }

  let expectedLeft = comboboxRect.left;
  let expectedRight = expectedLeft + preferredWidth;

  // Shift left container to avoid right-overflow
  if (expectedRight > bodyRight) {
    expectedLeft = expectedLeft - (expectedRight - bodyRight);
    expectedRight = bodyRight;
  }

  // If too much shifted left
  style.left = expectedLeft < space ? space : expectedLeft;
  style.minWidth = Math.max(expectedRight - expectedLeft, combobox.offsetWidth);
  style.maxWidth = bodyRight - space;

  return style;
};
