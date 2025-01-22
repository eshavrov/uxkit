import React from 'react';

import type { Direction, StickyOffsets } from '../interface';

/**
 * Get sticky column offset width
 */
export const useStickyOffsets = (
  colWidths: number[],
  columnCount: number,
  dir: Direction,
) => {
  const stickyOffsets: StickyOffsets = React.useMemo(() => {
    const leftOffsets: number[] = [];
    const rightOffsets: number[] = [];

    let left = 0;
    let right = 0;

    for (let start = 0; start < columnCount; start += 1) {
      if (dir === 'rtl') {
        // Left offset
        rightOffsets[start] = right;
        right += colWidths[start] || 0;

        // Right offset
        const end = columnCount - start - 1;

        leftOffsets[end] = left;
        left += colWidths[end] || 0;
      } else {
        // Left offset
        leftOffsets[start] = left;
        left += colWidths[start] || 0;

        // Right offset
        const end = columnCount - start - 1;

        rightOffsets[end] = right;
        right += colWidths[end] || 0;
      }
    }

    return {
      left: leftOffsets,
      right: rightOffsets,
    };
  }, [colWidths, columnCount, dir]);

  return stickyOffsets;
};
