import cn from 'classnames';
import React from 'react';

import s from './Checkbox.module.css';

interface CheckboxProps {
  className?: string;

  /** Whether get focus when component mounted */
  autoFocus?: boolean;

  /** Specifies whether the checkbox is selected */
  checked?: boolean;

  /** Disable checkbox */
  disabled?: boolean;

  id?: string;

  /** The `name` property of all `input[type="checkbox"]` children */
  name?: string;

  children?: React.ReactNode;

  inside?: boolean;

  'aria-label'?: string;
  'aria-describedby'?: string;

  /** The callback function that is triggered when the state changes */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = React.memo(
  React.forwardRef((props: CheckboxProps, ref: any) => {
    const {
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      autoFocus = false,
      checked,
      children,
      className,
      disabled = false,
      id,
      inside,
      name,
      onChange,
    } = props;

    const callbackRef = React.useCallback(
      (inputElement: HTMLInputElement) => {
        if (inputElement) {
          if (autoFocus) {
            setTimeout(() => {
              inputElement.focus();
            });
          }

          if (ref) {
            ref.current = inputElement;
          }
        }
      },
      [autoFocus, ref],
    );

    const checkbox = (
      <span
        className={cn(s.root, className, {
          [s.checked]: checked,
          [s.disabled]: disabled,
          [s.inside]: inside,
        })}
      >
        <input
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          checked={checked}
          className={s.input}
          disabled={disabled}
          id={id}
          name={name}
          ref={callbackRef}
          type="checkbox"
          onChange={onChange}
          value=""
        />
        <span className={s.inner} />
      </span>
    );

    if (children) {
      return (
        <label
          className={cn(s.wrapper, {
            [s.wrapperDisabled]: disabled,
          })}
        >
          {checkbox}
          <span className={s.span}>{children}</span>
        </label>
      );
    }

    return checkbox;
  }),
);
