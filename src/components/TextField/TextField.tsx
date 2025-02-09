import React from 'react';
import cn from 'classnames';

import { composeRefs } from '@utils/composeRefs';

import s from './TextField.module.css';

type TextFieldElement = React.ComponentRef<'input'>;

interface TextFieldInputProps extends React.HTMLProps<TextFieldElement> {
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  
  defaultValue?: any;
};

export interface TextFieldProps extends TextFieldInputProps {}

export const TextField = React.forwardRef<TextFieldElement, TextFieldProps>(
  (props, forwardedRef) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const { children, className, style, ...inputProps } = props; 

    return (
      <div
        style={style}
        className={cn(s.textField, className)}
        onPointerDown={(event) => {
          const target = event.target as HTMLElement;
        
          if (target.closest('input, button, a')) {
            return;
          }

          const input = inputRef.current;

          if (!input) {
            return;
          }

          const slotClassName = s.textFieldSlot;

          // Same selector as in the CSS to find the right slot
          const isRightSlot = target.closest(`
            .${slotClassName}[data-side='right'],
            .${slotClassName}:not([data-side='right']) ~ .${slotClassName}:not([data-side='left'])
          `);

          const cursorPosition = isRightSlot ? input.value.length : 0;

          requestAnimationFrame(() => {
            // Only some input types support this, browsers will throw an error if not supported
            // See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange#:~:text=Note%20that%20according,not%20support%20selection%22.
            try {
              input.setSelectionRange(cursorPosition, cursorPosition);
            } catch {}

            input.focus();
          });
        }}
      >
        <input
          spellCheck="false"
          {...inputProps}
          ref={composeRefs(inputRef, forwardedRef)}
          className={cn(s.textFieldInput)}
        />
        {children}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
