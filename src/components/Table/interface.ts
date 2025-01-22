// import type { WidthType } from '@redux/ui';
export enum WidthType {
  NORMAL = 'NORMAL',
  CONDENSE_MAX = 'CONDENSE_MAX',
  CONDENSE_75 = 'CONDENSE_75',
  CONDENSE_50 = 'CONDENSE_50',
  CONDENSE_25 = 'CONDENSE_25',
}

import type React from 'react';

// import { RootState } from '@root/store';
type RootState = any;

export type Key = React.Key;

/** Values for aria-sort */
export type SortOrder = 'ascend' | 'descend' | 'none';

export type ColumnAlign = 'center' | 'left' | 'right';
// export type AlignType = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';

export type Direction = 'ltr' | 'rtl';

export type FixedType = boolean | 'left' | 'right';

export type DataIndex = string[] | string; // string | number | readonly (string | number)[];

type ColScopeType = 'col' | 'colgroup';

type RowScopeType = 'row' | 'rowgroup';

export type ScopeType = ColScopeType | RowScopeType;

// =================== Column ===================
export interface CellType<RecordType> {
  key?: Key;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  column?: Columns<RecordType>[number];
  colSpan?: number;
  rowSpan?: number;

  /** Only used for table header */
  hasSubColumns?: boolean;
  colStart?: number;
  colEnd?: number;
  isLeft: boolean;
  tableDirection: TableDirection;
}

// export type ColumnTitle<T = any> = string;
export type ColumnTitle<RecordType> =
  | React.ReactNode
  | string
  | ((props: ColumnTitleProps<RecordType>) => React.ReactNode);

export interface ColumnTitleProps<RecordType> {
  sortColumns?: { column: Column<RecordType>; order: SortOrder }[];
}

export interface Column<RecordType = any> {
  /** Unique key of this column, you can ignore this prop if you've set a unique `dataIndex` */
  key?: string;

  align?: ColumnAlign;

  /** Display field of the data record, support nest path by string array */
  dataIndex: DataIndex;

  /** Title of this column */
  title: ColumnTitle<RecordType>;

  fullTitle?: string;

  sorter?: boolean;

  render?: (
    value: any,
    record: RecordType,
    index?: number,
  ) => React.ReactNode | string;
  renderPure?: (value: any, record: RecordType, state: RootState) => string;

  /**
   * Order of sorted values: `ascending` `descending` `none`
   * !WARN antd uses different values
   */
  sortOrder?: SortOrder;

  sortTitle?: string;

  fixed?: FixedType;

  ellipsis?: boolean;

  className?: string;

  width?: number | string;

  colSpan?: number;
  rowSpan?: number;

  stretch?: WidthType;
  headerStyle?: { whiteSpace?: React.CSSProperties['whiteSpace'] };
}

export interface ColumnGroup<RecordType>
  extends Omit<Column<RecordType>, 'dataIndex'> {
  children: Columns<RecordType>;
}

export type Columns<RecordType = any> = (
  | Column<RecordType>
  | ColumnGroup<RecordType>
)[];

// ??? no use of this
export type TransformColumns<RecordType> = (
  columns: Columns<RecordType>,
) => Columns<RecordType>;

export type DataSource = Record<string, any>;

export interface Pagination {
  current?: number;
  pageSize?: number;
}

export interface Filters {
  name: null;
  address: null;
}

export interface Sorter {
  columnIndex: number;
  column: Column;
  order: SortOrder; // "ascend"
  field: string[] | string;
  columnKey?: string;
}

export type TableDirection = 'horizontal' | 'vertical';

// ================= Fix Column =================
export interface StickyOffsets {
  left: readonly number[];
  right: readonly number[];
  isSticky?: boolean;
}

// ================= Customized =================

export type GetRowKey<RecordType> = (record: RecordType, index?: number) => Key;

// =================== Events ===================
export type TriggerEventHandler<RecordType> = (
  record: RecordType,
  event: React.MouseEvent<HTMLElement>,
) => void;
