import React from 'react';

import s from './Kbd.module.css';

export interface KbdProps {
  size?: number;
  children?: any;
}

/**
 * Represents keyboard input or a hotkey.
 */ 
export const Kbd = (props: KbdProps) => {
  const {
    children,
  } = props;

  return <kbd className={s.kbd}>{children}</kbd>;
}