// @ts-nocheck
import React from 'react';

import observeRect from './observeRect';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function useRect(
  nodeRef,
  initialRect = { width: 0, height: 0 },
) {
  const [element, setElement] = React.useState(nodeRef.current);
  const [rootRect, dispatch] = React.useReducer(rectReducer, initialRect);
  const initialRectSet = React.useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (nodeRef.current !== element) {
      setElement(nodeRef.current);
    }
  });

  useIsomorphicLayoutEffect(() => {
    if (element && !initialRectSet.current) {
      initialRectSet.current = true;

      const rect = element.getBoundingClientRect();

      dispatch({ rect });
    }
  }, [element]);

  React.useEffect(() => {
    if (!element) {
      return undefined;
    }

    const observer = observeRect(element, (rect) => {
      dispatch({ rect });
    });

    observer.observe();

    return () => {
      observer.unobserve();
    };
  }, [element]);

  return rootRect;
}

function rectReducer(state, action) {
  const rect = action.rect;

  if (state.height !== rect.height || state.width !== rect.width) {
    return rect;
  }

  return state;
}
