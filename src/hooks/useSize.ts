import React from 'react';

import usePrevious from './usePrevious';

export default function useSize(ref: React.RefObject<Element>) {
  const [size, setSize] = React.useState<{
    width: number;
    height: number;
    borderWidth: number;
    borderHeight: number;
  } | null>(null);

  const prevRef = usePrevious(ref.current);

  const observer = React.useMemo(
    () =>
      new ResizeObserver((entries) => {
        const { width, height } = entries[0]?.contentRect ?? {};
        const { blockSize: borderHeight, inlineSize: borderWidth } =
          entries[0]?.borderBoxSize[0] ?? {};

        setSize({
          width,
          height,
          borderWidth,
          borderHeight,
        });
      }),
    [],
  );

  React.useEffect(() => {
    const refCurrent = ref.current;

    if (prevRef == null && refCurrent != null) {
      observer.observe(refCurrent);
    }

    return () => {
      if (refCurrent) {
        observer.disconnect();
      }
    };
  });

  return size;
}

export function useElementSize(element?: Element | null) {
  const [size, setSize] = React.useState<{
    width: number;
    height: number;
    borderWidth: number;
    borderHeight: number;
  } | null>(null);

  const observer = React.useMemo(
    () =>
      new ResizeObserver((entries) => {
        const { width, height } = entries[0]?.contentRect ?? {};
        const { blockSize: borderHeight, inlineSize: borderWidth } =
          entries[0]?.borderBoxSize[0] ?? {};

        setSize({
          width,
          height,
          borderWidth,
          borderHeight,
        });
      }),
    [],
  );

  React.useLayoutEffect(() => {
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.disconnect();
      }
    };
  }, [observer, element]);

  return size;
}

export function useWindowSize() {
  const [size, setSize] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return size;
}
