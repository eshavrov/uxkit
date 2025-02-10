import React from 'react';
import cn from 'classnames';

import s from './TextArea.module.css';

type TextAreaElement = React.ComponentRef<'textarea'>;

export interface TextAreaProps
  extends  React.HTMLProps<TextAreaElement> {
  resize?: 'both' | 'horizontal' | 'none' | 'vertical';
}

export const TextArea = React.forwardRef<TextAreaElement, TextAreaProps>((props, forwardedRef) => {
  const { className, style, resize, ...textAreaProps } = props;
  return (
    <div
      className={cn(s.textArea, className, {
        [s.resizeNone]: resize === 'none',
        [s.resizeVertical]: resize === 'vertical',
        [s.resizeHorizontal]: resize === 'horizontal',
        [s.resizeBoth]: resize === 'both',
      })}
      style={style}
    >
      <textarea className={s.textAreaInput} ref={forwardedRef} {...textAreaProps} />
    </div>
  );
});

TextArea.displayName = 'TextArea';
