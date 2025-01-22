import React from 'react';

export default function usePrevious<ValueType>(value: ValueType): ValueType {
  const ref: any = React.useRef<ValueType>(undefined);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
