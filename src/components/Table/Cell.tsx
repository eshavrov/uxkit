/* eslint-disable complexity */
import cn from 'classnames';
import React from 'react';

import s from './Table.module.css';
import { TableContext } from './TableContext';

import type { ColumnAlign, Columns, ScopeType, SortOrder } from './interface';

export interface CellProps {
  className?: string;

  align?: ColumnAlign;
  children?: React.ReactNode;
  colSpan?: number;
  colStart?: number;
  column?: Columns[number];
  ellipsis?: boolean;
  isLeft?: boolean;
  rowSpan?: number;
  scope?: ScopeType;
  isGroup?: boolean;
  whiteSpace?: React.CSSProperties['whiteSpace'];

  // Fixed
  fixLeft?: number | false;
  fixRight?: number | false;
  firstFixLeft?: boolean;
  lastFixLeft?: boolean;
  firstFixRight?: boolean;
  lastFixRight?: boolean;
  isSticky?: boolean;
}

const ARIA_SORT_NAME: Record<SortOrder, React.AriaAttributes['aria-sort']> = {
  ascend: 'ascending',
  descend: 'descending',
  none: 'none',
};

const getTitleFromCellRenderChildren = ({
  ellipsis,
  children,
}: Pick<CellProps, 'children' | 'ellipsis'>) => {
  let title: string | undefined;

  if (ellipsis) {
    if (typeof children === 'string' || typeof children === 'number') {
      title = children.toString();
    } else if (
      React.isValidElement(children) &&
      // @ts-expect-error
      typeof children.props?.children === 'string'
    ) {
      // @ts-expect-error
      title = children.props?.children;
    }
  }

  return title;
};

function Cell(props: CellProps) {
  const {
    children,
    ellipsis,
    scope,

    // Style
    className,
    align,
    whiteSpace,

    // Span
    colSpan,
    rowSpan,
    colStart,

    // Position
    isLeft,

    // Fixed
    fixLeft,
    fixRight,
    firstFixLeft,
    lastFixLeft,
    firstFixRight,
    lastFixRight,
    column,

    // Private
    isSticky,
    isGroup = false,
  } = props;

  const {
    interactive,
    focusedCol,
    onDirectionChange,
    needUseStretch,
    tableDirection,
  } = React.useContext(TableContext);

  const supportSticky = false;

  // ====================== Value =======================

  const childNode = children;

  // ====================== Fixed =======================
  const fixedStyle: React.CSSProperties = {};

  const isFixLeft = typeof fixLeft === 'number' && supportSticky;
  const isFixRight = typeof fixRight === 'number' && supportSticky;

  if (isFixLeft) {
    fixedStyle.position = 'sticky';
    fixedStyle.left = fixLeft;
  }

  if (isFixRight) {
    fixedStyle.position = 'sticky';
    fixedStyle.right = fixRight;
  }

  // ================ RowSpan & ColSpan =================
  const mergedColSpan = colSpan ?? 1;
  const mergedRowSpan = rowSpan ?? 1;

  const {
    key = 'group',
    title: titleColumn,
    fullTitle,
    sorter,
    sortOrder,
    sortTitle,
    align: columnAlign = 'left',
    width,
  } = column ?? {};

  // Style
  // const mergedStyle = {
  //   ...fixedStyle,
  // };

  const style = React.useMemo(() => {
    if (width == null && whiteSpace == null) {
      return undefined;
    }

    return { width, whiteSpace: whiteSpace };
  }, [width, whiteSpace]);

  const ariaSort = sorter ? (sortOrder ?? 'none') : undefined;

  const onKeyDown = React.useCallback<
    React.KeyboardEventHandler<HTMLTableCellElement>
  >(
    (event) => {
      if (!ariaSort) {
        event.preventDefault();
      }
    },
    [ariaSort],
  );

  // ====================== Render ======================
  if (mergedColSpan === 0 || mergedRowSpan === 0) {
    return null;
  }

  // Title
  const title = getTitleFromCellRenderChildren({
    ellipsis,
    children: childNode,
  });

  // Children Node
  let mergedChildNode: React.JSX.Element | React.ReactNode | undefined = childNode;

  // Not crash if final `childNode` is not validate ReactNode
  if (
    typeof mergedChildNode === 'object' &&
    !Array.isArray(mergedChildNode) &&
    !React.isValidElement(mergedChildNode)
  ) {
    mergedChildNode = undefined;
  }

  if (ellipsis && (lastFixLeft || firstFixRight)) {
    mergedChildNode = <span className={s.cellContent}>{mergedChildNode}</span>;
  }

  const dataIndex =
    column != null && 'dataIndex' in column ? column.dataIndex : undefined;

  const sticky: any = '';

  const colIndex = scope === 'col' ? colStart : undefined;
  const _align = tableDirection === 'vertical' ? columnAlign : 'right';

  const cellKey = `header-${
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    key ?? (dataIndex ?? titleColumn ?? '').toString()
  }-${colIndex}`;

  const isFocused = interactive && focusedCol === colIndex;

  const tabIndex = isFocused ? 0 : -1;

  let _title: any;

  let hint = fullTitle;

  if (sortTitle) {
    hint = `${hint ?? ''}${
      hint
        ? `
`
        : ''
    }${sortTitle ?? ''}`;
  }

  if (scope === 'col') {
    const assistiveTextSorted =
      sortOrder === 'ascend'
        ? 'Sorted Ascending'
        : sortOrder === 'descend'
          ? 'Sorted Descending'
          : '';

    _title = ariaSort ? (
      <>
        <button
          className={s.btnDirection}
          tabIndex={tabIndex}
          type="button"
          title={hint}
          data-column-index={colIndex}
          onClick={onDirectionChange}
        >
          <span className={s.assistiveText}>Sort by: </span>
          <span className={cn(s[`${_align}Align`])} style={style}>
            {titleColumn as any}
          </span>
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
    ) : hint != null ? (
      <span className={s.cellSpanContent} title={hint}>
        {/* @ts-expect-error: ... */}
        {titleColumn}
      </span>
    ) : (
      titleColumn
    );
  }

  // ClassName
  const mergedClassName = cn(s.th, s[`${_align}Align`], className, {
    [s.unsortable]: !ariaSort,
    [s.stickyLeft]: sticky === 'left',
    [s.noWrap]: true,
    [s.group]: isGroup,
    [s.cellFirst]: isLeft,
    // fixed
    [s.cellFixLeft]: isFixLeft && supportSticky,
    [s.cellFixLeftFirst]: firstFixLeft && supportSticky,
    [s.cellFixLeftLast]: lastFixLeft && supportSticky,
    [s.cellFixRight]: isFixRight && supportSticky,
    [s.cellFixRightFirst]: firstFixRight && supportSticky,
    [s.cellFixRightLast]: lastFixRight && supportSticky,
    // style
    [s.cellEllipsis]: ellipsis,
    [s.marker]: false,
  });

  return (
    <th
      key={cellKey}
      className={mergedClassName}
      onKeyDown={onKeyDown}
      tabIndex={!ariaSort ? tabIndex : undefined}
      style={style}
      // A11y
      title={title}
      scope={scope}
      // @ts-expect-error: ...
      aria-sort={ARIA_SORT_NAME[ariaSort] ?? 'none'}
      // here you need to explicitly specify a `aria-label` so that when moving through the cells,
      // the screen reader reads only the name of the current column
      aria-label={title}
      // Span
      colSpan={mergedColSpan !== 1 ? mergedColSpan : undefined}
      rowSpan={mergedRowSpan !== 1 ? mergedRowSpan : undefined}
      // eslint-disable-next-line react/no-unknown-property
      data-index={dataIndex}
    >
      {_title ?? mergedChildNode}
    </th>
  );
}

export default React.memo(Cell);
