import React from 'react';

export const toArray = (children?: React.ReactNode) => {
  let ret: any[] = [];

  React.Children.forEach(children, (c) => {
    ret.push(c);
  });

  return ret;
};