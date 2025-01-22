import React from 'react';

import Cell from './Cell';
import { getCellFixedInfo } from './utils/fixUtil';
import { getColumnsKey } from './utils/valueUtil';

import type { CellType, Column, Direction, StickyOffsets } from './interface';

export interface RowProps<RecordType> {
  cells: readonly CellType<RecordType>[];
  stickyOffsets: StickyOffsets;
  flattenColumns: readonly Column<RecordType>[];
  dir: Direction;
  index: number;
}

function HeaderRow<RecordType>({
  cells,
  stickyOffsets,
  flattenColumns,
  dir = 'ltr',
}: RowProps<RecordType>) {
  const columnsKey = getColumnsKey(cells.map((cell) => cell.column));

  return (
    <tr>
      {cells.map((cell: CellType<RecordType>, cellIndex) => {
        const { column } = cell;

        const fixedInfo = getCellFixedInfo(
          cell.colStart,
          cell.colEnd,
          flattenColumns,
          stickyOffsets,
          dir,
          column,
        );

        // @ts-expect-error: ...
        const isGroup = (column?.children ?? []).length > 0;

        const scope = column?.title
          ? isGroup
            ? 'colgroup'
            : 'col'
          : undefined;

        return (
          <Cell
            {...cell}
            isGroup={isGroup}
            scope={scope}
            ellipsis={column?.ellipsis}
            align={column?.align}
            key={columnsKey[cellIndex]}
            whiteSpace={column?.headerStyle?.whiteSpace}
            {...fixedInfo}
          />
        );
      })}
    </tr>
  );
}

export default HeaderRow;
