import cn from 'classnames';
import React from 'react';

import s from './Fieldset.module.css';

interface Props {
  id?: string;
  className?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
  legend: string;
  title?: React.ReactNode;
  labelHidden?: boolean;
  gridArea?: string;
  style?: any;

  // native disable (todo add context)
  disabled?: boolean;
}

export const Fieldset = React.memo(
  React.forwardRef((props: Props, ref: any) => {
    const {
      id,
      children,
      className,
      bodyClassName,
      style: _style,
      legend,
      title,
      labelHidden = false,
      gridArea,
      disabled,
    } = props;

    const style = React.useMemo(
      () => (gridArea ? { gridArea } : undefined),
      [gridArea],
    );

    return (
      <fieldset
        className={cn(s.root, className)}
        style={style}
        ref={ref}
        id={id}
        disabled={disabled}
      >
        <legend className={s.legend}>{legend}</legend>
        {!labelHidden && (
          <header className={s.header}>{title ?? legend}</header>
        )}
        <div className={cn(s.body, bodyClassName)} style={_style}>
          {children}
        </div>
      </fieldset>
    );
  }),
);
