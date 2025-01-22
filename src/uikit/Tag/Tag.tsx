import cn from 'classnames';
import React from 'react';

import s from './Tag.module.css';

type Color = 'blue' | 'default' | 'green' | 'orange' | 'red';

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
  color?: Color;
  disabled?: boolean; // todo
  style?: React.CSSProperties;
}

export const Tag = React.memo(
  React.forwardRef((props: Props, ref: any) => {
    const { children, className, id, color = 'default' } = props;

    return (
      <span
        className={cn(s.root, className, s[color as any])}
        ref={ref}
        id={id}
      >
        {children}
      </span>
    );
  }),
);
