import cn from 'classnames';
import React from 'react';

import { RadioGroupContextProvider } from './context';
import s from './RadioGroup.module.css';

// type RadioButtonStyle = 'outline' | 'solid';

type OptionType = 'button' | 'default';

type Size = 'large' | 'middle' | 'small';

// interface Option {
//   label: React.ReactNode;
//   value: string;
//   disabled?: boolean;
// }

interface GroupProps {
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
  id?: string;
  tag?: 'div' | 'fieldset';
  /** The style type of radio button */
  // buttonStyle?: RadioButtonStyle;

  /** Default selected value */
  defaultValue?: any;

  /** Disable all radio buttons */
  disabled?: boolean;

  /** The `name` property of all `input[type="radio"]` children */
  name?: string;

  /** Override style of root component */
  className?: string;

  /** Set children optional */
  // options?: number[] | Option[] | string[];

  /** Set Radio optionType */
  optionType?: OptionType;

  /** The size of radio button style */
  size?: Size;

  /** Used for setting the currently selected value */
  value?: any;

  children: React.ReactNode;

  /** The callback function that is triggered when the state changes */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const RadioGroup = React.memo(
  React.forwardRef((props: GroupProps, ref: any) => {
    const {
      tag = 'div',
      id,
      // buttonStyle = 'outline',
      defaultValue,
      disabled = false,
      name,
      className,
      // options,
      // optionType = 'default',
      // size,
      value: radioGroupValue,
      children,
      onChange: onRadioGroupChange,
      'aria-describedby': ariaDescribedby,
      'aria-labelledby': ariaLabelledby,
    } = props;

    const [value, setValue] = React.useState(() => {
      if (radioGroupValue !== undefined) {
        return radioGroupValue;
      }

      if (defaultValue !== undefined) {
        return defaultValue;
      }

      return undefined;
    });

    const onChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        // const lastValue = value;
        const currentValue = event.target.value;

        setValue((lastValue: any) => {
          if (onRadioGroupChange && currentValue !== lastValue) {
            onRadioGroupChange(event);
          }

          return currentValue;
        });
      },
      [onRadioGroupChange],
    );

    const contextValue = React.useMemo(
      () => ({
        onChange,
        value,
        disabled,
        name,
        // optionType,
      }),
      [disabled, name, onChange, value],
    );

    const Tag = tag;

    return (
      <Tag
        id={id}
        aria-describedby={ariaDescribedby}
        aria-labelledby={ariaLabelledby}
        className={cn(s.root, className)}
      >
        <RadioGroupContextProvider value={contextValue}>
          {children}
        </RadioGroupContextProvider>
      </Tag>
    );
  }),
);

RadioGroup.displayName = 'RadioGroup';
