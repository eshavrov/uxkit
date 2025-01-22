import * as React from 'react';

import type {
  Column,
  ColumnTitle,
  ColumnTitleProps,
  Columns,
  Key,
  TransformColumns,
} from './interface';

export function getColumnKey<RecordType>(
  column: Column<RecordType>,
  defaultKey: string,
): Key {
  if ('key' in column && column.key !== undefined && column.key !== null) {
    return column.key;
  }

  if (column.dataIndex) {
    return (
      Array.isArray(column.dataIndex)
        ? column.dataIndex.join('.')
        : column.dataIndex
    ) as Key;
  }

  return defaultKey;
}

export function getColumnPos(index: number, pos?: string) {
  return pos ? `${pos}-${index}` : `${index}`;
}

export function renderColumnTitle<RecordType>(
  title: ColumnTitle<RecordType>,
  props: ColumnTitleProps<RecordType>,
) {
  if (typeof title === 'function') {
    return title(props);
  }

  return title;
}

/**
 * Safe get column title
 * Should filter [object Object]
 */
export function safeColumnTitle<RecordType>(
  title: ColumnTitle<RecordType>,
  props: ColumnTitleProps<RecordType>,
) {
  const res = renderColumnTitle(title, props);

  if (Object.prototype.toString.call(res) === '[object Object]') {
    return '';
  }

  return res;
}

function fillTitle<RecordType>(
  columns: Columns<RecordType>,
  columnTitleProps: ColumnTitleProps<RecordType>,
) {
  return columns.map((column) => {
    const cloneColumn = { ...column };

    cloneColumn.title = renderColumnTitle(column.title, columnTitleProps);

    if ('children' in cloneColumn) {
      cloneColumn.children = fillTitle(cloneColumn.children, columnTitleProps);
    }

    return cloneColumn;
  });
}

export default function useTitleColumns<RecordType>(
  columnTitleProps: ColumnTitleProps<RecordType>,
): [TransformColumns<RecordType>] {
  const filledColumns = React.useCallback(
    (columns: Columns<RecordType>) => fillTitle(columns, columnTitleProps),
    [columnTitleProps],
  );

  return [filledColumns];
}
