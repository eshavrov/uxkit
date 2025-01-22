import React from 'react';

export const TableContext = React.createContext({
  interactive: false,
  focusedCol: -1,
  onDirectionChange: undefined,
  tableDirection: 'vertical',
  needUseStretch: undefined,
} as any);
