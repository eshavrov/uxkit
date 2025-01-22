 
import type {
  Column,
  ColumnGroup,
  Direction,
  FixedType,
  StickyOffsets,
} from '../interface';

export interface FixedInfo {
  fixLeft?: number | false;
  fixRight?: number | false;
  lastFixLeft: boolean;
  firstFixRight: boolean;

  // For Rtl Direction
  lastFixRight: boolean;
  firstFixLeft: boolean;

  isSticky: boolean;
}

export function getCellFixedInfo<RecordType = any>(
  colStart: number | undefined,
  colEnd: number | undefined,
  columns: readonly { fixed?: FixedType }[],
  stickyOffsets: StickyOffsets,
  dir: Direction,
  curColumns?: Column<RecordType> | ColumnGroup<RecordType>,
): FixedInfo {
  const startColumn = columns[colStart!] || {};
  const endColumn = columns[colEnd!] || {};

  let fixLeft: number | false | undefined;
  let fixRight: number | false | undefined;

  if (startColumn.fixed === 'left') {
    fixLeft = stickyOffsets.left[dir === 'rtl' ? colEnd! : colStart!];
  } else if (endColumn.fixed === 'right') {
    fixRight = stickyOffsets.right[dir === 'rtl' ? colStart! : colEnd!];
  }

  let lastFixLeft = false;
  let firstFixRight = false;

  let lastFixRight = false;
  let firstFixLeft = false;

  const nextColumn = columns[colEnd! + 1];
  const prevColumn = columns[colStart! - 1];

  // no children only
  const canLastFix = !(curColumns as ColumnGroup<RecordType>)?.children;

  if (dir === 'rtl') {
    if (fixLeft !== undefined) {
      const prevFixLeft = prevColumn && prevColumn.fixed === 'left';

      firstFixLeft = !prevFixLeft && canLastFix;
    } else if (fixRight !== undefined) {
      const nextFixRight = nextColumn && nextColumn.fixed === 'right';

      lastFixRight = !nextFixRight && canLastFix;
    }
  } else if (fixLeft !== undefined) {
    const nextFixLeft = nextColumn && nextColumn.fixed === 'left';

    lastFixLeft = !nextFixLeft && canLastFix;
  } else if (fixRight !== undefined) {
    const prevFixRight = prevColumn && prevColumn.fixed === 'right';

    firstFixRight = !prevFixRight && canLastFix;
  }

  return {
    fixLeft,
    fixRight,
    lastFixLeft,
    firstFixRight,
    lastFixRight,
    firstFixLeft,
    isSticky: Boolean(stickyOffsets.isSticky),
  };
}
