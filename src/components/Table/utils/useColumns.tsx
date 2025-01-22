import * as React from 'react';

import { toArray } from '@utils/toArray';

import { isSubColumn } from './typesUtil';

import type { Column, Columns, Direction, FixedType } from '../interface';

export function convertChildrenToColumns<RecordType>(
  children: React.ReactNode,
): Columns<RecordType> {
  return toArray(children)
    .filter((node) => React.isValidElement(node))
    .map(({ key, props }: React.ReactElement) => {
      // @ts-expect-error
      const { children: nodeChildren, ...restProps } = props;
      const column = {
        key,
        ...restProps,
      };

      if (nodeChildren) {
        column.children = convertChildrenToColumns(nodeChildren);
      }

      return column;
    });
}

export function flatColumns<RecordType>(
  columns: Columns<RecordType>,
  parentKey = 'key',
): Column<RecordType>[] {
  return columns
    .filter((column) => column && typeof column === 'object')
    .reduce<Column<RecordType>[]>((list, column, index) => {
      const { fixed } = column;

      // Convert `fixed='true'` to `fixed='left'` instead
      const parsedFixed = fixed === true ? 'left' : fixed;
      const mergedKey = `${parentKey}-${index}`;

      if (isSubColumn(column)) {
        const subColumns = column.children;

        if (subColumns.length > 0) {
          return [
            ...list,
            ...flatColumns(subColumns, mergedKey).map((subColumn) => ({
              fixed: parsedFixed,
              ...subColumn,
            })),
          ];
        } else {
          return list;
        }
      }

      return [
        ...list,
        {
          key: mergedKey,
          ...column,
          fixed: parsedFixed,
        },
      ];
    }, []);
}

function warningFixed(flattenColumns: readonly { fixed?: FixedType }[]) {
  let allFixLeft = true;

  for (let i = 0; i < flattenColumns.length; i += 1) {
    const col = flattenColumns[i];

    if (allFixLeft && col.fixed !== 'left') {
      allFixLeft = false;
    } else if (!allFixLeft && col.fixed === 'left') {
      console.warn(
        false,
        `Index ${i - 1} of \`columns\` missing \`fixed='left'\` prop.`,
      );
      break;
    }
  }

  let allFixRight = true;

  for (let i = flattenColumns.length - 1; i >= 0; i -= 1) {
    const col = flattenColumns[i];

    if (allFixRight && col.fixed !== 'right') {
      allFixRight = false;
    } else if (!allFixRight && col.fixed === 'right') {
      console.warn(
        false,
        `Index ${i + 1} of \`columns\` missing \`fixed='right'\` prop.`,
      );
      break;
    }
  }
}

function revertForRtl<RecordType>(
  columns: Column<RecordType>[],
): Column<RecordType>[] {
  return columns.map((column) => {
    const { fixed, ...restProps } = column;

    // Convert `fixed='left'` to `fixed='right'` instead
    let parsedFixed = fixed;

    if (fixed === 'left') {
      parsedFixed = 'right';
    } else if (fixed === 'right') {
      parsedFixed = 'left';
    }

    return {
      fixed: parsedFixed,
      ...restProps,
    };
  });
}

/**
 * Parse `columns` & `children` into `columns`.
 */
export function useColumns<RecordType>(
  {
    columns,
    children,

    dir,
    scrollWidth,
    clientWidth,
  }: {
    columns?: Columns<RecordType>;
    children?: React.ReactNode;

    dir?: Direction;
    clientWidth: number;
    scrollWidth?: number;
  },
  transformColumns?: (columns: Columns<RecordType>) => Columns<RecordType>,
): [
  columns: Columns<RecordType>,
  flattenColumns: readonly Column<RecordType>[],
  realScrollWidth: number | undefined,
  ] {
  const baseColumns = React.useMemo<Columns<RecordType>>(
    () => columns ?? convertChildrenToColumns(children),
    [columns, children],
  );

  // ========================= Transform ========================
  const transformedColumns = React.useMemo(() => {
    let finalColumns = baseColumns;

    if (transformColumns) {
      finalColumns = transformColumns(finalColumns);
    }

    // Always provides at least one column for table display
    if (finalColumns.length === 0) {
      finalColumns = [
        {
          title: '',
          dataIndex: '',
          render: () => null,
        },
      ];
    }

    return finalColumns;
  }, [transformColumns, baseColumns]);

  // ========================== Flatten =========================
  const flattenColumns = React.useMemo(() => {
    if (dir === 'rtl') {
      return revertForRtl(flatColumns(transformedColumns));
    }

    return flatColumns(transformedColumns);
  }, [transformedColumns, dir]);

  // Only check out of production since it's waste for each render
  if (process.env.NODE_ENV !== 'production') {
    warningFixed(
      dir === 'rtl' ? flattenColumns.slice().reverse() : flattenColumns,
    );
  }

  // ========================= FillWidth ========================

  // TODO: currently not worked as never scrollWidth init

  // const [filledColumns, realScrollWidth] = useWidthColumns<RecordType>(
  //   flattenColumns,
  //   scrollWidth,
  //   clientWidth,
  // );

  return [transformedColumns, flattenColumns, scrollWidth];
}
