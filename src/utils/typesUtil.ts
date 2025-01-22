import type { ColumnGroup, Columns } from '@components/Table/interface';

export const isSubColumn = <T>(
  column: Columns<T>[number],
): column is ColumnGroup<T> => 'children' in column && column.children != null;
