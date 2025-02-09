import React from 'react';
import cn from 'classnames';

import s from './TextField.module.css';

type TextFieldSlotElement = React.ComponentRef<'div'>;

export interface SlotProps extends React.HTMLProps<TextFieldSlotElement> {
  side?: 'left' | 'right';
}

const Slot = React.forwardRef<TextFieldSlotElement, SlotProps>(
  (props, forwardedRef) => {
    const { className, side = 'left', ...slotProps } = props;

    return (
      <div
        data-side={side}
        {...slotProps}
        ref={forwardedRef}
        className={cn(s.textFieldSlot, 'slot', className)}
      />
    );
  }
);

Slot.displayName = 'TextField.Slot';

export { Slot };