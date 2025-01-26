import cn from 'classnames';
import React from 'react';

import s from './Radio.module.css';
import RadioGroupContext from './context';

interface RadioProps {
  /** Whether get focus when component mounted */
  autoFocus?: boolean;

  /** Specifies whether the radio is selected */
  checked?: boolean;

  /** Specifies the initial state: whether or not the radio is selected */
  defaultChecked?: boolean;

  /** Disable radio */
  disabled?: boolean;

  /** According to value for comparison, to determine whether the selected */
  value?: any;

  children: React.ReactNode;

  /** The callback function that is triggered when the state changes */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Radio = React.memo(
  React.forwardRef(
    (props: RadioProps, ref: React.ForwardedRef<HTMLInputElement>) => {
      const {
        autoFocus = false,
        defaultChecked = false,
        checked: radioChecked = defaultChecked,
        disabled: radioDisabled = false,
        value,
        children,
        onChange: onRadioChange,
      } = props;

      const groupContext = React.useContext(RadioGroupContext);

      const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onRadioChange?.(event);
        groupContext?.onChange?.(event);
      };

      const name = groupContext?.name;
      const disabled = radioDisabled || Boolean(groupContext?.disabled);
      const checked = groupContext ? value == groupContext.value : radioChecked;

      const callbackRef = React.useCallback(
        (inputElement: any) => {
          if (inputElement) {
            if (autoFocus) {
              setTimeout(() => {
                inputElement.focus();
              });
            }

            if (ref) {
              if (typeof ref === 'function') {
                ref(inputElement);
              } else {
                ref.current = inputElement;
              }
            }
          }
        },
        [autoFocus, ref],
      );

      const radio = (
        <span
          className={cn(s.root, {
            [s.checked]: checked,
            [s.disabled]: disabled,
          })}
        >
          <input
            checked={checked}
            className={s.input}
            disabled={disabled}
            name={name}
            ref={callbackRef}
            type="radio"
            value={value}
            onChange={onChange}
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
            {radio}
            <span>{children}</span>
          </label>
        );
      }

      return radio;
    },
  ),
);

Radio.displayName = 'Radio';
