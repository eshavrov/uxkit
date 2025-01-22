import cn from 'classnames';
import React from 'react';

import { Checkbox } from '../Checkbox';

import s from './Checkboxes.module.css';

interface Column {
  /** Unique key of this column, you can ignore this prop if you've set a unique `dataIndex` */
  key?: string;

  /** Display field of the data record, support nest path by string array */
  dataIndex: string;

  /** Title of this column */
  title: string;

  /** Title of this column */
  ariaLabel: string;

  render?: (text: unknown, record: unknown) => React.ReactNode | string;
}

interface CheckboxesProps {
  id?: string;

  columns?: Column[];

  value: Record<string, boolean>;

  disabled?: boolean;

  onChange: any;
}

export const Checkboxes = React.memo(
  React.forwardRef((props: CheckboxesProps, ref: any) => {
    const {
      id,
      disabled = false,
      onChange,
      value,
      columns: columnsInitial,
    } = props;

    const columns = React.useMemo<Column[]>(() => {
      if (columnsInitial) {
        return columnsInitial;
      }

      return Object.entries(value).map(([propertyName]) => ({
        dataIndex: propertyName,
        title: propertyName,
      })) as Column[];
    }, [columnsInitial, value]);

    const { headers, data } = React.useMemo(() => {
      const _headers = columns.map(({ title, dataIndex }) => {
        return (
          <th key={dataIndex} className={s.th}>
            {title}
          </th>
        );
      });

      const _data = columns.map(({ dataIndex, ariaLabel, title }) => {
        const checked = Boolean(value[dataIndex]);

        return (
          <td key={dataIndex} className={s.td}>
            <Checkbox
              className={s.checkbox}
              checked={checked}
              aria-label={ariaLabel ?? title}
              aria-describedby={id}
              disabled={disabled}
              onChange={(event: any) => {
                const nextChecked = event.target.checked;

                if (checked !== nextChecked) {
                  onChange({ ...value, [dataIndex]: nextChecked });
                }
              }}
            />
          </td>
        );
      });

      return {
        headers: _headers,
        data: _data,
      };
    }, [columns, value, id, onChange, disabled]);

    return (
      <table
        className={cn(s.table, {
          [s.disabled]: disabled,
        })}
        role="presentation"
      >
        <thead className={s.thead}>
          <tr
            className={cn(s.headers, {
              [s.disabled]: disabled,
            })}
          >
            {headers}
          </tr>
        </thead>
        <tbody className={s.tbody}>
          <tr className={s.tr}>{data}</tr>
        </tbody>
      </table>
    );
  }),
);
