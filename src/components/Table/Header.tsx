import cn from 'classnames';
import * as React from 'react';

import { isNotNullFilter } from '@utils/isNotNullFilter';
import { isSubColumn } from '@utils/typesUtil';

import HeaderRow from './HeaderRow';
import s from './Table.module.css';
import { TableContext } from './TableContext';

import type { ForwardedRef } from 'react';
import type {
  CellType,
  Column,
  Columns,
  StickyOffsets,
  TableDirection,
} from './interface';

function parseHeaderRows<RecordType>(
  rootColumns: Columns<RecordType>,
  tableDirection: TableDirection,
  columnFillPercentage?: number,
) {
  const rows: CellType<RecordType>[][] = [];

  // return array of colSpans for cells in row(rowIndex)
  function fillRowCells(
    columns: Columns<RecordType>,
    colIndex: number,
    rowIndex = 0,
  ): number[] {
    const isLeft = rows[rowIndex] == null;

    // Init rows
    rows[rowIndex] = rows[rowIndex] ?? [];

    let currentColIndex = colIndex;

    const calcColumnWidth = (column: Columns<RecordType>[number]) => {
      if (column.width != null) {
        return typeof column.width === 'string'
          ? column.width
          : `${column.width}px`;
      }

      if (columnFillPercentage != null) {
        return `${columnFillPercentage}%`;
      }

      return undefined;
    };

    return columns.filter(isNotNullFilter).map((column, index) => {
      const cell: CellType<RecordType> = {
        key: column.key,
        className: column.className ?? '',
        // @ts-expect-error: ...
        children: column.title,
        column: {
          ...column,
          width: calcColumnWidth(column),
        },
        colStart: currentColIndex,
        isLeft: isLeft && colIndex === 0 && index === 0,
        tableDirection,
      };

      let colSpan = 1;

      if (isSubColumn(column)) {
        const subColumns = column.children;

        if (subColumns.length > 0) {
          colSpan = fillRowCells(
            subColumns,
            currentColIndex,
            rowIndex + 1,
          ).reduce((total, count) => total + count, 0);
          cell.hasSubColumns = true;
        }
      }

      if (column.colSpan != null) {
        colSpan = column.colSpan;
      }

      if (column.rowSpan != null) {
        cell.rowSpan = column.rowSpan;
      }

      cell.colSpan = colSpan;
      cell.colEnd = cell.colStart! + colSpan - 1;
      rows[rowIndex].push(cell);

      currentColIndex += colSpan;

      return colSpan;
    });
  }

  // Generate `rows` cell data
  fillRowCells(rootColumns, 0);

  // Handle `rowSpan`

  const rowCount = rows.length;

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    rows[rowIndex].forEach((cell) => {
      if (!cell.rowSpan && !cell.hasSubColumns) {
        cell.rowSpan = rowCount - rowIndex;
      }
    });
  }

  if (columnFillPercentage) {
    rows[0].push({
      key: '__stretch',
      isLeft: false,
      tableDirection,
      rowSpan: rowCount,
    });
  }

  return rows;
}

export interface HeaderProps<RecordType> {
  columns: Columns<RecordType>;
  flattenColumns: readonly Column<RecordType>[];
  stickyOffsets: StickyOffsets;
  stretchWidthPercent?: number;
}

const Header = React.forwardRef(
  <T,>(
    props: React.PropsWithChildren<HeaderProps<T>>,
    ref: ForwardedRef<HTMLTableSectionElement>,
  ) => {
    const { stickyOffsets, columns, flattenColumns, stretchWidthPercent } =
      props;

    const {
      dir = 'ltr',
      needUseStretch,
      tableDirection,
      colCount,
    } = React.useContext(TableContext);

    const isVertical = tableDirection === 'vertical';

    const columnCount = isVertical ? flattenColumns.length : 2;

    const columnFillPercentage =
      stretchWidthPercent != null && Number.isInteger(stretchWidthPercent)
        ? Math.max(
            1,
            Math.floor((10 * (100 - stretchWidthPercent)) / columnCount) / 10,
          )
        : undefined;

    const rows = React.useMemo(
      () => parseHeaderRows(columns, tableDirection, columnFillPercentage),
      [columns, tableDirection, columnFillPercentage],
    );

    const headerRows = React.useMemo(() => {
      if (!isVertical) {
        const width = columnFillPercentage
          ? `${columnFillPercentage}%`
          : undefined;

        const style = width ? { width } : undefined;

        return (
          <tr>
            <th
              className={cn(s.th, s.unsortable, s.rightAlign, s.stickyLeft)}
              style={style}
            >
              Name
            </th>
            <th
              className={cn(s.th, s.unsortable, s.centerAlign)}
              colSpan={colCount}
              style={style}
            >
              Data
            </th>
            {needUseStretch && (
              <th className={cn(s.th, s.unsortable, s.centerAlign)} />
            )}
          </tr>
        );
      }

      return rows.map((row, rowIndex) => {
        return (
          <HeaderRow
            key={rowIndex}
            flattenColumns={flattenColumns}
            cells={row}
            stickyOffsets={stickyOffsets}
            index={rowIndex}
            dir={dir}
          />
        );
      });
    }, [
      colCount,
      columnFillPercentage,
      dir,
      flattenColumns,
      isVertical,
      needUseStretch,
      rows,
      stickyOffsets,
    ]);

    return (
      <thead className={s.thead} ref={ref}>
        {headerRows}
      </thead>
    );
  },
);

export default React.memo(Header);
