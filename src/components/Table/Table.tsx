import cn from 'classnames';
import React from 'react';

import get from '@utils/get';
// import { FOOTER_INDEX } from '@components/schemas/TableEntitiesSchema';
import { findParentGroup } from '@utils/columnGroupUtil';
import { isSubColumn } from '@utils/typesUtil';
// import { Spin } from '@uikit';

import { Header } from './Header';
import { TableContext } from './TableContext';
import { useColumns } from './utils/useColumns';
import { useVirtual } from './virtualized';

import s from './Table.module.css';

import type {
  MouseEventHandler,
  ReactEventHandler,
  SyntheticEvent,
} from 'react';
import type {
  Column,
  Columns,
  DataSource,
  Direction,
  Filters,
  Pagination,
  SortOrder,
  Sorter,
  TableDirection,
} from './interface';

export const FOOTER_INDEX = -123;


export interface TableRef {
  setIsLoading: (status: boolean) => void;
  getIsLoading: () => boolean;
  clearCache: () => void;
  focus: () => void;
  move: (rowToFocus?: number, colToFocus?: number) => void;
  getFocusedRow: () => number;
  getFocusedColumn: () => number;
  tableHead: React.RefObject<HTMLTableSectionElement>;
}

export interface TableProps {
  id?: string;
  columns?: Columns;
  dataSource?: DataSource[];
  dataFooter?: DataSource;
  rowClassName?: any;

  tableDirection?: TableDirection;
  stretchWidthPercent?: number;
  dir?: Direction;

  defaultFocusedCol?: number;

  navigationDisabled?: boolean;
  paginationEnabled?: boolean;
  shouldWrapCols?: boolean;
  shouldWrapRows?: boolean;

  onCellChange?: (
    event: SyntheticEvent<HTMLElement>,
    cell: null,
    row: DataSource,
    column: Column,
    rowIndex: number,
    cellIndex: number,
  ) => void;

  onMove?: (
    row: DataSource,
    column: Column,
    rowIndex: number,
    cellIndex: number,
    event: any,
  ) => void;

  onMoveForClick?: (
    row: DataSource,
    column: Column,
    rowIndex: number,
    cellIndex: number,
    event: any,
  ) => void;

  onCellFocus?: (
    row: DataSource,
    column: Column,
    rowIndex: number,
    cellIndex: number,
    event: any,
  ) => void;

  /** Sorting state change handle */
  onSortStateChange?: (
    pagination: Pagination,
    filters: Filters,
    sorter: Sorter,
    extra: { currentDataSource: []; action: 'filter' | 'paginate' | 'sort' },
  ) => void;

  onLoadFollowing?: () => void;
  onLoadPrevious?: () => void;
  onChangePage?: (currentPage: number) => void;

  className?: string;
  style?: React.CSSProperties;
  rowNumberStart?: number;
  rowsCount?: number;
  pageSize?: number;
  hasCache?: boolean;
  loader?: React.ReactNode;
  showLoader?: boolean;
  ['aria-labelledby']?: string;

  /**
   * This function is passed the index of each item and should return the actual size for each item.
   * This measurement should return either the width or height depending on the orientation of your virtualizer.
   */
  estimateSize?: (index?: number) => number;

  /**
   * The number of items to render above and below the visible area. Increasing this number will increase
   * the amount of time it takes to render the virtualizer, but might decrease the likelihood of seeing
   * slow-rendering blank items at the top and bottom of the virtualizer when scrolling.
   */
  overscan?: number;

  hideHeader?: boolean;

  stretch?: boolean;
  renderConfig?: Record<string, any>;
}

// check if an element is currently scrollable
function isScrollable(element: any) {
  return element && element.clientHeight < element.scrollHeight;
}

function maintainScrollVisibility(
  rowElement: HTMLElement,
  cellElement: HTMLElement,
  scrollParent: HTMLElement,
  offsetBaseTop = 0,
) {
  const { offsetHeight, offsetTop } = rowElement;
  const { offsetWidth, offsetLeft } = cellElement;

  const {
    offsetHeight: parentOffsetHeight,
    scrollTop: parentScrollTop,
    offsetWidth: parentOffsetWidth,
    scrollLeft,
  } = scrollParent;

  const scrollTop = offsetBaseTop + parentScrollTop;

  const isRowAbove = offsetTop < scrollTop;
  const isRowBelow =
    offsetTop + offsetHeight > parentScrollTop + parentOffsetHeight;

  let top: any;

  if (isRowAbove) {
    top = offsetTop - offsetBaseTop;
  } else if (isRowBelow) {
    top = offsetTop - parentOffsetHeight + offsetHeight;
  }

  const isCellAbove = offsetLeft < scrollLeft;
  const isCellBelow = offsetLeft + offsetWidth > scrollLeft + parentOffsetWidth;

  let left: any;

  if (isCellAbove) {
    left = offsetLeft;
  } else if (isCellBelow) {
    left = offsetLeft - parentOffsetWidth + offsetWidth;
  }

  if (isRowAbove || isRowBelow || isCellAbove || isCellBelow) {
    scrollParent.scrollTo(left ?? scrollLeft, top ?? parentScrollTop);
  }
}

const renderCell = (options: {
  [key: string]: any;
  maxWidth?: number | string;
  className?: string;
}) => {
  const {
    align,
    cellKey,
    cellValue,
    columnIndex,
    focusedCol,
    hasCache,
    isRowFocused,
    m,
    onCellBlur,
    onCellFocus,
    render,
    row,
    rowKey,
    renderConfig,
    fieldName,
    maxWidth,
    page,
    className,
  } = options;

  let cellText = typeof cellValue === 'object' ? '?' : cellValue;

  if (render) {
    const cacheCellKey = `${rowKey}-${cellKey}`;

    const cache = m.current.cache[cacheCellKey];

    cellText = cache ?? render(cellValue, row);

    if (hasCache && !cache) {
      m.current.cache[cacheCellKey] = cellText;
    }
  }

  const isCellFocused = isRowFocused && columnIndex == focusedCol;

  const cellTabIndex = isCellFocused ? 0 : -1;

  const markers = (renderConfig?.[fieldName]?.markers ?? []).reduce(
    (acc: any, marker: number | string) => {
      return { ...acc, [s[marker]]: true };
    },
    {},
  );

  // > === CELL ======================= <
  return (
    <td
      className={cn(s.td, className, s[`${align}Align`], {
        [s.cellActive]: isCellFocused,
        [s.noWrap]: true,
        [s.marker]: false,
        ...markers,
      })}
      style={{ maxWidth, minWidth: maxWidth }}
      key={cellKey}
      data-align={`${align}Align`}
      data-cell-active={isCellFocused ? true : undefined}
      tabIndex={cellTabIndex}
      aria-colindex={columnIndex + 1}
      onFocus={isCellFocused ? onCellFocus : undefined}
      onBlur={isCellFocused ? onCellBlur : undefined}
      data-page={page}
    >
      {cellText}
    </td>
  );
};

const defaultEstimateSize = () => 32;

export const ARIA_SORT_NAME: Record<
  SortOrder,
  React.AriaAttributes['aria-sort']
> = {
  ascend: 'ascending',
  descend: 'descending',
  none: 'none',
};

// Used for conditions cache
const EMPTY_DATA: DataSource[] = [];
const EMPTY_COLUMNS: Columns = [];

export const Table = React.memo(
  React.forwardRef<TableRef, TableProps>((props, ref) => {
    const {
      'aria-labelledby': ariaLabelledBy,
      columns: _columns = EMPTY_COLUMNS,
      dataSource = EMPTY_DATA,
      dataFooter,
      defaultFocusedCol = 0,
      dir = 'ltr',
      estimateSize = defaultEstimateSize,
      hasCache = false,
      hideHeader = false,
      id,
      loader = <span>spin</span>, // <Spin size="small" />,
      showLoader = false,
      navigationDisabled = false,
      overscan = 3,
      pageSize,
      rowClassName,
      rowNumberStart = 0,
      rowsCount,
      shouldWrapCols = true,
      shouldWrapRows = false,
      tableDirection = 'vertical',
      stretchWidthPercent,
      className,
      style,
      onCellChange,
      onSortStateChange,
      onChangePage,
      onLoadFollowing,
      onLoadPrevious,
      onMove,
      onMoveForClick,
      onCellFocus: _onCellFocus,
      renderConfig,
    } = props;

    const isVertical = tableDirection === 'vertical';

    const baseColumns = React.useMemo(
      () =>
        _columns.map((a: any) => ({
          ...a,
          title: typeof a.title === 'string' ? a.title : '?',
        })),
      [_columns],
    ) as Columns;

    const needUseStretch = Boolean(!isVertical || stretchWidthPercent);

    const [__columns, flattenColumns, flattenScrollX] = useColumns(
      {
        // @ts-expect-error: ...
        children: props.children,
        columns: baseColumns,
        dir: dir,
        clientWidth: 0, // componentWidth,
      },
      undefined, // useInternalHooks ? transformColumns : null,
    );

    // // const flattenColumns = columns;
    // const colsWidths = React.useMemo(() => new Map<React.Key, number>(), []);

    // // Convert map to number width
    // const colsKeys = getColumnsKey(flattenColumns);

    // const pureColWidths = colsKeys.map((columnKey) =>
    //   colsWidths.get(columnKey),
    // );

    // const colWidths = React.useMemo(
    //   () => pureColWidths,
    //   [pureColWidths.join('_')],
    // );

    // const stickyOffsets = useStickyOffsets(
    //   // @ts-expect-error: ...
    //   colWidths,
    //   flattenColumns.length,
    //   tableDirection,
    // );

    // const fixColumn = flattenColumns.some(({ fixed }) => fixed);

    const columns = React.useMemo(
      () => flattenColumns.filter((column) => Boolean(column.dataIndex)),
      [flattenColumns],
    );
    const columnGroupInfo = React.useMemo(
      () =>
        columns.reduce<Record<string, { isLeft: boolean; isRight: boolean }>>(
          (acc, column) => {
            if (!isSubColumn(column) && column.key != null) {
              const parent = findParentGroup(column.key, __columns);

              if (parent != null) {
                const isLeft = parent.children[0].key === column.key;
                const isRight =
                  parent.children[parent.children.length - 1].key ===
                  column.key;

                acc[column.key] = { isLeft, isRight };
              }
            }

            return acc;
          },
          {},
        ),
      [columns, __columns],
    );

    const gridNode = React.useRef<HTMLTableElement>(null);

    const headNode = React.useRef<HTMLTableSectionElement>(null);

    const bodyNode = React.useRef<HTMLTableSectionElement>(null);

    const m = React.useRef<{
      cache: Record<string, any>;
      forceCellFocus: boolean;
      forceTableBodyFocus: boolean;
      hasActiveCell: boolean;
      id: string;
      isLoading: boolean;
      lastScrollTop: number;
      last_scroll: number;
      rowNumberStart: number;
      prevMoveRow?: number;
      prevMoveCol?: number;
      prevCurrentPage?: number;
      focusStart: boolean;
      click: boolean;
    }>({
      cache: {},
      forceCellFocus: false,
      forceTableBodyFocus: false,
      hasActiveCell: false,
      id: id ?? `table-${Math.ceil(Math.random() * 1000)}`,
      isLoading: false,
      lastScrollTop: 0,
      last_scroll: 0,
      rowNumberStart,
      focusStart: true,
      click: false,
    });

    const identifier = m.current.id;

    const [focusedRow, setFocusedRow] = React.useState(
      navigationDisabled ? -1 : 0,
    );

    const [focusedCol, setFocusedCol] = React.useState(
      navigationDisabled ? -1 : defaultFocusedCol,
    );

    const [interactive, setInteractive] = React.useState(false);

    const onCellFocus = (event: any) => {
      // show Keys Indicator
      m.current.forceTableBodyFocus = true;
      setInteractive(true);
      event.preventDefault();
    };

    const onCellBlur = () => {
      // hide Keys Indicator
      setInteractive(false);
    };

    const rowCount = isVertical ? dataSource.length : columns.length;

    const colCount = isVertical ? columns.length : dataSource.length;

    const checkRow = (row: number) => {
      return row >= 0 && row < rowCount;
    };

    const checkCol = (col: number) => {
      return col >= 0 && col < colCount;
    };

    const checkCell = (row: number, col: number) => {
      return checkRow(row) && checkCol(col);
    };

    const isValidCell = checkCell;

    const parentRef = React.useRef<HTMLDivElement>(null);

    const size = rowCount;

    const rowVirtualizer = useVirtual({
      parentRef: parentRef,
      size,
      overscan,
      // horizontal: tableDirection === 'horizontal',
      estimateSize,
    } as any);

    const {
      virtualItems: virtualRows,
      totalSize,
      scrollToIndex,
      scrollToOffset,
    } = rowVirtualizer;

    /**
     * Get next cell to the right or left (direction) of the focused
     * cell.

     * @returns {object}
     * Indices of the next cell in the specified direction. Returns the focused
     * cell if none are found.
     */
    const getNextCell = (
      /** Row index to start searching from */
      currRow: number,

      /** Column index to start searching from */
      currCol: number,

      /** X direction for where to check for cells. +1 to check to the right, -1 to check to the left */
      directionX: number,

      /** Y direction for where to check for cells. +1 to check to the down, -1 to check to the top */
      directionY: number,
    ) => {
      let row = currRow + directionY;
      let col = currCol + directionX;

      const isLeftRight = directionX !== 0;

      if (!rowCount) {
        return false;
      }

      if (shouldWrapCols && isLeftRight) {
        if (col < 0) {
          col = colCount - 1;
          row--;
        }

        if (col >= colCount) {
          col = 0;
          row++;
        }
      }

      if (shouldWrapRows && !isLeftRight) {
        if (row < 0) {
          col--;
          row = rowCount - 1;

          if (checkRow(row) && col >= 0 && !checkCell(row, col)) {
            // Sometimes the bottom row is not completely filled in. In this case,
            // jump to the next filled in cell.
            row--;
          }
        } else if (row >= rowCount || !checkCell(row, col)) {
          row = 0;
          col++;
        }
      }

      if (isValidCell(row, col)) {
        return {
          row: row,
          col: col,
        };
      }

      return {
        row: currRow,
        col: currCol,
      };
    };

    const getNextVisibleCell = (directionX: number, directionY: number) => {
      const nextCell = getNextCell(
        focusedRow,
        focusedCol,
        directionX,
        directionY,
      );

      if (!nextCell) {
        return {
          row: focusedRow,
          col: focusedCol,
        };
      }

      return nextCell;
    };

    const getNextCol = (
      /** Column index to start searching from */
      currCol: number,
      /** X direction for where to check for cells. +1 to check to the right, -1 to check to the left */
      directionX: number,
    ) => {
      const col = currCol + directionX;

      if (checkCol(col)) {
        return col;
      }

      return currCol;
    };

    const getNextVisibleCol = (directionX: number) => {
      const nextColumn = getNextCol(focusedCol, directionX);

      if (nextColumn == null) {
        return focusedCol;
      }

      return nextColumn;
    };

    const focusColumn = (
      /** The index of the cell's column */
      col: number,
    ) => {
      setFocusedCol(col);

      setTimeout(() => {
        if (headNode.current) {
          const thWithScopeColElements = headNode.current.querySelectorAll(
            'th[scope=col][tabindex] , th>[tabindex]',
          );

          if (thWithScopeColElements && thWithScopeColElements[col]) {
            (thWithScopeColElements[col] as HTMLElement)?.focus();
          }
        }
      });
    };

    const onMouseDown = () => {
      m.current.click = true;
    };

    const onMouseUp = () => {
      m.current.click = false;
    };

    /**
     *  Focus on the cell in the specified row and column
     */
    const focusCell = React.useCallback(
      (
        /** The index of the cell's row */
        row: number,
        /** The index of the cell's column */
        col: number,
        event?: any,
      ) => {
        const isDirty =
          m.current.prevMoveRow !== row || m.current.prevMoveCol !== col;

        m.current.prevMoveRow = row;
        m.current.prevMoveCol = col;

        setFocusedRow(row);
        setFocusedCol(col);

        const dataRow = isVertical ? row : col;
        const dataCol = isVertical ? col : row;

        const currentRow = dataSource[dataRow];
        const currentColumn = columns[dataCol];

        if (isDirty && !(!currentRow || !currentColumn)) {
          if (m.current.click) {
            onMoveForClick?.(
              currentRow,
              currentColumn,
              dataRow,
              dataCol,
              event,
            );
          } else {
            onMove?.(currentRow, currentColumn, dataRow, dataCol, event);
          }
        }

        if (!m.current.hasActiveCell) {
          scrollToIndex(row);
        }

        setTimeout(() => {
          const el = bodyNode.current?.querySelector(
            `tr[aria-rowindex="${
              row + rowNumberStart + 1
            }"] td[aria-colindex="${col + 1}"]`,
          );

          if (!el) {
            return;
          }

          el
            // @ts-expect-error: ...
            ?.focus();

          // // ensure the new option is in view
          // if (isScrollable(gridNode.current.parentNode)) {
          //   maintainScrollVisibility(
          //     el.parentNode as HTMLElement,
          //     el as HTMLElement,
          //     gridNode.current.parentNode as HTMLElement,
          //     headNode.current.offsetHeight,
          //   );
          // }

          _onCellFocus?.(currentRow, currentColumn, dataRow, dataCol, event);

          setInteractive(true);
        });
      },
      [
        columns,
        dataSource,
        isVertical,
        onMove,
        rowNumberStart,
        scrollToIndex,
        _onCellFocus,
      ],
    );

    /** Triggered on click. Finds the cell that was clicked on and focuses on it. */
    const focusClickedCell = (
      event: SyntheticEvent<HTMLElement>,
    ): { row: number; col: number } => {
      if (navigationDisabled) {
        return { row: focusedRow, col: focusedCol };
      }

      let node = event.target as HTMLElement | null;

      while (node && !node?.getAttribute('aria-colindex')) {
        node = node.parentElement;

        if (!node || node?.getAttribute('id') === identifier) {
          return { row: focusedRow, col: focusedCol };
        }
      }

      const row =
        Number(node?.parentElement?.getAttribute('aria-rowindex')) -
        rowNumberStart -
        1;

      const col = Number(node?.getAttribute('aria-colindex')) - 1;

      focusCell(row, col, event);

      return { row, col };
    };

    const onCellDoubleClick: MouseEventHandler<HTMLElement> = (event) => {
      const { row, col } = focusClickedCell(event);

      if (isVertical) {
        onCellChange?.(event, null, dataSource[row], columns[col], row, col);
      } else {
        onCellChange?.(event, null, dataSource[col], columns[row], col, row);
      }
    };

    /**
     *  Triggered on keydown. Checks if an arrow key was pressed, and (if possible)
     *  moves focus to the next valid cell in the direction of the arrow key.
     */
     
    const checkFocusChange = (event: any) => {
      if (!event || navigationDisabled) {
        return;
      }

      const { key } = event;

      if (interactive) {
        // focus inside tbody
        let rowCaret = focusedRow;
        let colCaret = focusedCol;

        switch (key) {
          case 'Enter':
          case ' ': {
            if (isVertical) {
              onCellChange?.(
                event,
                null,
                dataSource[focusedRow],
                columns[focusedCol],
                focusedRow,
                focusedCol,
              );
            } else {
              onCellChange?.(
                event,
                null,
                dataSource[focusedCol],
                columns[focusedRow],
                focusedCol,
                focusedRow,
              );
            }

            event.preventDefault();

            return;
          }

          case 'Up':
          case 'ArrowUp': {
            if (
              focusedRow === 0 &&
              rowNumberStart > 0 &&
              !m.current.isLoading
            ) {
              onLoadPrevious?.();
              rowCaret--;
              m.current.forceCellFocus = true;
              break;
            }

            const nextCell = getNextVisibleCell(0, -1);

            rowCaret = nextCell.row;
            colCaret = nextCell.col;

            break;
          }

          case 'Down':
          case 'ArrowDown': {
            if (focusedRow === rowCount - 1 && !m.current.isLoading) {
              onLoadFollowing?.();
              break;
            }

            const nextCell = getNextVisibleCell(0, 1);

            rowCaret = nextCell.row;
            colCaret = nextCell.col;

            break;
          }

          case 'Left':
          case 'ArrowLeft': {
            const nextCell = getNextVisibleCell(-1, 0);

            rowCaret = nextCell.row;
            colCaret = nextCell.col;

            break;
          }

          case 'Right':
          case 'ArrowRight': {
            const nextCell = getNextVisibleCell(1, 0);

            rowCaret = nextCell.row;
            colCaret = nextCell.col;

            break;
          }

          case 'Home': {
            if (event.ctrlKey) {
              rowCaret = 0;
            }

            colCaret = 0;

            break;
          }

          case 'End': {
            if (event.ctrlKey) {
              rowCaret = rowCount - 1;
            }

            colCaret = colCount - 1;

            break;
          }

          case 'Tab': {
            if (event.shiftKey) {
              setTimeout(() => {
                setInteractive(false);
              });
            }

            return;
          }

          default:
            return;
        }

        focusCell(rowCaret, colCaret);
      } else {
        // focus inside thead
        let nextColumn = focusedCol;

        switch (key) {
          case 'Left':
          case 'ArrowLeft': {
            nextColumn = getNextVisibleCol(-1);

            break;
          }

          case 'Right':
          case 'ArrowRight': {
            nextColumn = getNextVisibleCol(1);

            break;
          }

          case 'Home':
            nextColumn = 0;

            break;

          case 'End':
            nextColumn = colCount - 1;

            break;

          case 'Down':
          case 'ArrowDown': {
            focusCell(0, focusedCol);

            event.preventDefault();

            return;
          }

          case 'Tab': {
            if (!event.shiftKey) {
              event.preventDefault();

              setInteractive(true);

              setTimeout(() => {
                focusCell(focusedRow, focusedCol);
              });

              event.preventDefault();
            }

            return;
          }

          default:
            return;
        }

        focusColumn(nextColumn);
      }

      event.preventDefault();
    };

    const onDirectionChange: ReactEventHandler<any> = React.useCallback(
      (event) => {
        const columnIndex = Number(event.currentTarget.dataset.columnIndex);

        if (Number.isNaN(columnIndex) || onSortStateChange == null) {
          return;
        }

        const column = columns[columnIndex];

        onSortStateChange(
          {
            current: Math.floor((rowNumberStart + 1) / (pageSize ?? 1)),
            pageSize,
          },
          {
            name: null,
            address: null,
          },
          {
            columnIndex,
            column,
            order: 'ascend',
            field: column.dataIndex,
            columnKey: column.key,
          },
          {
            currentDataSource: [],
            action: 'sort',
          },
        );
      },
      [onSortStateChange, columns, rowNumberStart, pageSize],
    );

    React.useEffect(() => {
      if (rowCount > focusedRow) {
        return;
      }

      if (rowCount > 0) {
        setFocusedRow(0);
      } else {
        setFocusedRow(-1);
      }
    }, [rowCount, focusedRow]);

    const getHeaderCell = React.useCallback(
      (
        {
          key,
          dataIndex,
          title,
          sorter,
          sortOrder,
          sortTitle,
          align: columnAlign = 'left',
        }: any,
        colIndex: number,
        tableDir: TableDirection = 'vertical',
        { sticky }: any = {},
      ) => {
        const align = tableDir === 'vertical' ? columnAlign : 'right';

        const cellKey = `header-${key ?? dataIndex.toString()}-${colIndex}`;

        const ariaSort = sorter ? (sortOrder ?? 'none') : undefined;

        const isFocused = interactive && focusedCol === colIndex;

        const tabIndex = isFocused ? 0 : -1;

        const assistiveTextSorted =
          sortOrder === 'ascend'
            ? 'Sorted Ascending'
            : sortOrder === 'descend'
              ? 'Sorted Descending'
              : '';

        const _title = ariaSort ? (
          <>
            <button
              className={s.btnDirection}
              tabIndex={tabIndex}
              type="button"
              role="button"
              title={sortTitle}
              data-column-index={colIndex}
              onClick={onDirectionChange}
            >
              <span className={s.assistiveText}>Sort by: </span>
              {title}
              {/* TODO: check if possible use Cell */}
              <svg
                className={s.iconDirectionCaret}
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 12 12"
              >
                <path
                  d="M8.4,5l-2.2-3.5c-.1,0-.3,0-.4,0l-2.2,3.5c-.1.1,0,.3.2.3h4.5c.2,0,.3-.2.2-.3Z"
                  fill={sortOrder === 'ascend' ? '#393939' : '#999'}
                />
                <path
                  d="M3.6,6.9l2.2,3.5c.1,0,.3,0,.4,0l2.2-3.5c.1-.1,0-.3-.2-.3H3.8c-.2,0-.3.2-.2.3Z"
                  fill={sortOrder === 'descend' ? '#393939' : '#999'}
                />
              </svg>
            </button>
            <span
              className={s.assistiveText}
              aria-live="assertive"
              aria-atomic="true"
            >
              {assistiveTextSorted}
            </span>
          </>
        ) : (
          title
        );

        return (
          <th
            className={cn(s.th, s[`${align}Align`], {
              [s.unsortable]: !ariaSort,
              [s.stickyLeft]: sticky === 'left',
              [s.noWrap]: true,
            })}
            scope="col"
            key={cellKey}
            tabIndex={!ariaSort ? tabIndex : undefined}
            // @ts-expect-error: ...
            aria-sort={ARIA_SORT_NAME[ariaSort] ?? 'none'}
            // here you need to explicitly specify a `aria-label` so that when moving through the cells,
            // the screen reader reads only the name of the current column
            aria-label={title}
          >
            {_title}
          </th>
        );
      },
      [focusedCol, interactive, onDirectionChange],
    );

    React.useImperativeHandle(ref, () => ({
      setIsLoading: (status: boolean) => {
        m.current.isLoading = status;
      },
      getIsLoading: () => m.current.isLoading,
      clearCache: () => {
        m.current.cache = {};
      },
      focus: () => {
        focusCell(focusedRow, focusedCol);
      },
      move: (rowToFocus?: number, colToFocus?: number) => {
        if (rowToFocus != null) {
          setFocusedRow(rowToFocus);
        }

        if (colToFocus != null) {
          setFocusedCol(colToFocus);
        }
      },
      getFocusedRow: () => focusedRow,
      getFocusedColumn: () => focusedCol,
      // @ts-expect-error
      tableHead: headNode,
    }));

    React.useEffect(() => {
      if (rowNumberStart < m.current.rowNumberStart) {
        setFocusedRow((rowIndex) => {
          const offset = m.current.rowNumberStart - rowNumberStart;
          const newRowIndex = rowIndex + offset;

          const rowHeight = estimateSize();

          if (m.current.forceCellFocus) {
            setTimeout(() => {
              scrollToOffset(offset * rowHeight);
              focusCell(newRowIndex, focusedCol);
            });

            m.current.forceCellFocus = false;
          } else {
            if (parentRef.current && offset && m.current.lastScrollTop < 100) {
              parentRef.current.scrollTop += offset * rowHeight;

              setTimeout(() => {
                if (parentRef.current) {
                  parentRef.current.scrollBy({
                    top: -rowHeight * 2.45,
                    behavior: 'smooth',
                  });
                }
              });
            }
          }

          return newRowIndex;
        });
      }

      m.current.rowNumberStart = rowNumberStart;
    }, [estimateSize, focusCell, focusedCol, rowNumberStart, scrollToOffset]);

    const paddingTop =
      virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;

    const paddingBottom =
      virtualRows.length > 0
        ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
        : 0;

    const {
      grid,
      hasActiveCell,
      tfooter: tfoot,
    } = React.useMemo(() => {
      let _hasActiveCell = false;

      const tail = needUseStretch
        ? [<td key="cell-fill" className={cn(s.td)} />]
        : [];

      const getVirtualContent = (tableDir: TableDirection) => {
        if (tableDir === 'vertical') {
          return virtualRows.map((virtualRow) => {
            const rowDataIndex = virtualRow.index as number;
            const row = dataSource[rowDataIndex];
            const isRowFocused = rowDataIndex === focusedRow;

            if (isRowFocused) {
              _hasActiveCell = true;
            }

            const rowIndex = rowNumberStart + rowDataIndex;
            const rowKey = String(rowIndex);

            const page = Math.floor(rowIndex / (pageSize ?? 1)) + 1;

            const isSplitPage =
              pageSize && rowIndex > 0 && rowIndex % pageSize === 0;

            const rowCells = columns
              .map(
                (
                  { key, dataIndex, align = 'left', width, render },
                  columnIndex,
                ) => {
                  let className;

                  if (key != null) {
                    const info = columnGroupInfo[key];

                    if (info != null) {
                      className = cn({
                        [s.leftBorder]: info.isLeft && columnIndex !== 0,
                        [s.rightBorder]:
                          info.isRight && columnIndex !== columns.length - 1,
                      });
                    }
                  }

                  const cellValue = Array.isArray(dataIndex)
                    ? get(row, dataIndex)
                    : row[dataIndex];
                  const fieldName = key ?? dataIndex.toString();
                  const cellKey = `cell-${fieldName}`;

                  const _page =
                    columnIndex === 0 && isSplitPage ? page : undefined;

                  return renderCell({
                    fieldName,
                    align,
                    cellKey,
                    cellValue,
                    columnIndex,
                    focusedCol,
                    hasCache,
                    isRowFocused,
                    m,
                    onCellBlur,
                    onCellFocus,
                    render,
                    row,
                    rowKey,
                    renderConfig,
                    maxWidth: width,
                    page: _page,
                    className,
                  });
                },
              )
              .concat(tail);

            // > === ROW ======================= <
            return (
              <tr
                className={cn(s.tr, rowClassName?.(row, rowIndex), {
                  [s.rowActive]: isRowFocused,
                  [s.splitPage]: isSplitPage,
                })}
                key={rowKey}
                data-row-active={isRowFocused ? true : undefined}
                data-page={page}
                aria-rowindex={rowIndex + 1}
              >
                {rowCells}
              </tr>
            );
          });
        }

        return virtualRows.map((virtualRow) => {
          const rowDataIndex = virtualRow.index as number;

          const row = columns[rowDataIndex];
          const isRowFocused = rowDataIndex === focusedRow;

          if (isRowFocused) {
            _hasActiveCell = true;
          }

          const rowIndex = rowNumberStart + rowDataIndex;
          const rowKey = String(rowIndex);

          const { key, dataIndex, render } = row;
          const align = 'right';

          const page = 0;
          const isSplitPage = false;

          const rowCells = [
            getHeaderCell(row, rowDataIndex, tableDir, {
              sticky: 'left',
            }),
          ].concat(
            dataSource.map((rowData, columnIndex) => {
              const cellValue = Array.isArray(dataIndex)
                ? get(row, dataIndex)
                : rowData[dataIndex];

              const fieldName = key ?? dataIndex.toString();

              const cellKey = `cell-${fieldName}-${columnIndex}`;

              return renderCell({
                fieldName,
                align,
                cellKey,
                cellValue,
                columnIndex,
                focusedCol,
                hasCache,
                isRowFocused,
                m,
                onCellBlur,
                onCellFocus,
                render,
                row: rowData,
                rowKey,
                renderConfig,
              });
            }),
            tail,
          );

          // > === ROW ======================= <
          return (
            <tr
              className={cn(s.tr, rowClassName?.(row, rowIndex), {
                [s.rowActive]: isRowFocused,
                [s.splitPage]: isSplitPage,
              })}
              key={rowKey}
              data-row-active={isRowFocused ? true : undefined}
              data-page={page}
              aria-rowindex={rowIndex + 1}
            >
              {rowCells}
            </tr>
          );
        });
      };

      const virtualContent = getVirtualContent(tableDirection);

      const value = (
        <>
          {paddingTop > 0 && (
            <tr>
              <td aria-hidden style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {virtualContent}
          {paddingBottom > 0 && (
            <tr>
              <td aria-hidden style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </>
      );

      if (interactive) {
        if (!m.current.hasActiveCell && _hasActiveCell) {
          focusCell(focusedRow, focusedCol);
        } else if (m.current.hasActiveCell && !_hasActiveCell) {
          setTimeout(() => {
            m.current.forceTableBodyFocus = true;
            bodyNode.current?.focus();
          });
        }
      }

      m.current.hasActiveCell = _hasActiveCell;

      let tfooter: any;

      if (dataFooter) {
        const row = dataFooter;
        const rowKey = 'row-footer';

        const rowCells = columns
          .map(({ key, dataIndex, align = 'left', render }, columnIndex) => {
            const cellValue = Array.isArray(dataIndex)
              ? get(row, dataIndex)
              : row[dataIndex];

            const cellKey = `cell-${key ?? dataIndex.toString()}`;

            let cellText = typeof cellValue === 'object' ? '?' : cellValue;

            if (render) {
              const cacheCellKey = `${rowKey}-${cellKey}`;

              const cache = m.current.cache[cacheCellKey];

              cellText = cache ?? render(cellValue, row, FOOTER_INDEX);

              if (hasCache && !cache) {
                m.current.cache[cacheCellKey] = cellText;
              }
            }

            // > === CELL ======================= <
            return (
              <td
                className={cn(s.td, s[`${align}Align`])}
                key={cellKey}
                data-align={`${align}Align`}
                tabIndex={-1}
                aria-colindex={columnIndex + 1}
              >
                {cellText}
              </td>
            );
          })
          .concat(tail);

        // > === ROW ======================= <
        tfooter = (
          <tr className={cn(s.tr)} key={rowKey}>
            {rowCells}
          </tr>
        );
      }

      return { hasActiveCell: _hasActiveCell, grid: value, tfooter };
    }, [
      needUseStretch,
      tableDirection,
      paddingTop,
      paddingBottom,
      interactive,
      dataFooter,
      virtualRows,
      dataSource,
      focusedRow,
      rowNumberStart,
      columns,
      pageSize,
      rowClassName,
      focusedCol,
      hasCache,
      renderConfig,
      getHeaderCell,
      focusCell,
      columnGroupInfo,
    ]);

    const onScroll = (event: any) => {
      // handle scroll events to update content
      const scroll_pos = event.currentTarget.scrollTop;
      const clientHeight = event.currentTarget.clientHeight;
      const scrollHeight = event.currentTarget.scrollHeight;
      const rowHeight = estimateSize();

      if (
        m.current.lastScrollTop - scroll_pos < 0 &&
        scroll_pos >= scrollHeight - clientHeight * 1.4
      ) {
        if (!m.current.isLoading) {
          onLoadFollowing?.();
        }
      }

      if (
        m.current.lastScrollTop - scroll_pos > 0 &&
        scroll_pos <= 0.9 * rowHeight
      ) {
        if (!m.current.isLoading) {
          onLoadPrevious?.();
        }
      }

      m.current.lastScrollTop = scroll_pos;

      // Adjust the URL based on the top item shown
      if (pageSize && Math.abs(scroll_pos - m.current.last_scroll) > 1) {
        m.current.last_scroll = scroll_pos;

        const currentPage = Math.floor(
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          (virtualRows[Math.floor(virtualRows.length * 0.45)].index +
            rowNumberStart) /
            pageSize,
        );

        // Run only on page change
        if (m.current.prevCurrentPage !== currentPage) {
          onChangePage?.(currentPage);
        }
      }
    };

    const onWheel = (event: any) => {
      if (m.current.lastScrollTop === 0 && event.deltaY < 0) {
        const scrollTop = parentRef.current?.scrollTop;

        if (rowNumberStart > 0 && !m.current.isLoading && scrollTop === 0) {
          m.current.lastScrollTop = scrollTop;
          m.current.forceCellFocus = false;

          onLoadPrevious?.();
        }
      }
    };

    const onTableBodyFocus = (event: any) => {
      if (
        m.current.focusStart ||
        (!['TD', 'TH', 'TBODY'].includes(event.relatedTarget?.tagName) &&
          event.target.tagName !== 'TBODY')
      ) {
        if (!m.current.click) {
          focusCell(focusedRow, focusedCol);
        }

        m.current.focusStart = false;

        return;
      }

      if (
        event.relatedTarget != null &&
        event.relatedTarget !== bodyNode.current &&
        !m.current.forceTableBodyFocus &&
        !hasActiveCell
      ) {
        setInteractive(true);

        if (event.target.tagName === 'TBODY') {
          setTimeout(() => {
            if (!m.current.click) {
              focusCell(focusedRow, focusedCol);
            }
          });

          event.preventDefault();
        }
      }

      m.current.forceTableBodyFocus = false;
    };

    const valueContext = React.useMemo(
      () => ({
        colCount,
        dir,
        focusedCol,
        interactive,
        needUseStretch,
        onDirectionChange,
        tableDirection,
      }),
      [
        colCount,
        dir,
        focusedCol,
        interactive,
        needUseStretch,
        onDirectionChange,
        tableDirection,
      ],
    );

    return (
      <div
        ref={parentRef}
        className={cn(
          s.tableWrapper,
          {
            [s.nav]: true,
          },
          className,
        )}
        style={style}
        onScroll={onScroll}
        onWheel={onWheel}
      >
        <table
          className={cn(s.table, {
            [s.move]: interactive,
          })}
          ref={gridNode}
          id={identifier}
          role="grid"
          aria-labelledby={ariaLabelledBy}
          aria-rowcount={rowsCount ?? rowCount}
          aria-colcount={colCount}
          tabIndex={-1}
          onKeyDown={checkFocusChange}
        >
          <TableContext.Provider value={valueContext}>
            {!hideHeader && (
              <Header
                ref={headNode}
                columns={__columns}
                flattenColumns={flattenColumns}
                stretchWidthPercent={
                  stretchWidthPercent ?? (isVertical ? undefined : 99)
                }
                stickyOffsets={{
                  left: [],
                  right: [],
                  isSticky: false,
                }}
              />
            )}
          </TableContext.Provider>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <tbody
            className={s.tbody}
            ref={bodyNode}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={focusClickedCell}
            onContextMenu={focusClickedCell}
            onDoubleClick={onCellDoubleClick}
            tabIndex={navigationDisabled ? -1 : hasActiveCell ? -1 : 0}
            onFocus={onTableBodyFocus}
          >
            {grid}
          </tbody>
          {!!tfoot && isVertical && <tfoot className={s.tfoot}>{tfoot}</tfoot>}
        </table>
        {showLoader && m.current.isLoading && loader}
      </div>
    );
  }),
);

Table.displayName = 'Table';
