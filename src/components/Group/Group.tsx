import cn from 'classnames';
import React from 'react';

import s from './Group.module.css';

interface Props {
  className?: string;
  children?: React.ReactNode;
  gridArea?: string;
}

export const Group = React.memo(
  React.forwardRef((props: Props, ref: any) => {
    const { children, className, gridArea } = props;

    const style = React.useMemo(
      () => (gridArea ? { gridArea } : undefined),
      [gridArea],
    );

    return (
      <div className={cn(s.root)} style={style} ref={ref}>
        <div className={cn(s.body, className)}>{children}</div>
      </div>
    );
  }),
);

Group.displayName = 'Group';
