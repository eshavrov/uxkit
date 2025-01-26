import cn from 'classnames';
import React from 'react';

import s from './Button.module.css';

// TODO: need add loading status

type ButtonSize = 'large' | 'middle' | 'small';

export type ButtonType = 'dashed' | 'default' | 'link' | 'primary' | 'text';

export interface Props {
  [key: `data-${string}`]: string;

  /** Option to fit button width to its parent width */
  block?: boolean;

  /** className */
  className?: string;

  /** Disabled state of button */
  disabled?: boolean;

  /** Set the original html type of button (example: "submit" | "reset" | "button") */
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];

  /** id */
  id?: string;

  /** Set the loading status of button */
  loading?: boolean;

  /** Set the size of button */
  size?: ButtonSize;

  /** @deprecated `WARNING:` CSS inline styles should not be used, move styles to an external CSS file */
  style?: React.CSSProperties;

  /** type */
  type?: ButtonType;

  title?: string;

  tabIndex?: number;

  /** Set the icon component of button */
  icon?: React.ReactNode;

  children?: React.ReactNode;

  /** Set the handler to handle `click` event */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = React.memo(
  React.forwardRef((props: Props, ref: any) => {
    const {
      block,
      children,
      className,
      disabled,
      htmlType,
      icon,
      id,
      loading = false,
      size = 'middle',
      style,
      tabIndex,
      title,
      type = 'default',
      onClick,
      ...rest
    } = props;

    return (
      <button
        {...rest}
        className={cn(
          s.button,
          {
            [s[type]]: true,
            [s[size]]: size !== 'middle',
            [s.loading]: loading,
            [s.block]: block,
          },
          className,
        )}
        disabled={disabled || loading}
        id={id}
        ref={ref}
        style={style}
        tabIndex={tabIndex}
        title={title}
        type={htmlType}
        onClick={onClick}
      >
        {icon}
        {children}
        {loading && <span className={cn(s.loader, 'loaderFlash')} />}
      </button>
    );
  }),
);

Button.displayName = 'Button';
