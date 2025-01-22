import { isSubColumn } from '@utils/typesUtil';

import type { ColumnGroup, Columns } from '@components/Table/interface';

const hasChild = <RecordType>(
  columnKey: string,
  columns: ColumnGroup<RecordType>,
) => {
  return columns.children
    .filter((column) => !isSubColumn(column))
    .find((childColumn) => childColumn.key === columnKey);
};

export const findParentGroup = <RecordType>(
  columnKey: string,
  columns: Columns<RecordType>,
): ColumnGroup<RecordType> | null => {
  const subColumns = columns.filter(isSubColumn);

  for (let subColumn of subColumns) {
    if (hasChild(columnKey, subColumn)) {
      return subColumn;
    }

    const innerResult = findParentGroup(columnKey, subColumn.children);

    if (innerResult != null) {
      return innerResult;
    }
  }

  return null;
};
