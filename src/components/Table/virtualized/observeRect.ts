/* eslint-disable */
// @ts-nocheck

export interface RectProps {
  rect: DOMRect | undefined;
  hasRectChanged: boolean;
  callbacks: Function[];
}

const props: (keyof DOMRect)[] = [
  'bottom',
  'height',
  'left',
  'right',
  'top',
  'width',
];

const rectChanged = (a: DOMRect = {} as DOMRect, b: DOMRect = {} as DOMRect) =>
  props.some((prop) => a[prop] !== b[prop]);

const observedNodes = new Map<Element, RectProps>();

let rafId: number | undefined;

const run = () => {
  const changedStates: RectProps[] = [];

  observedNodes.forEach((state, node) => {
    const newRect = node.getBoundingClientRect();

    if (rectChanged(newRect, state.rect)) {
      state.rect = newRect;
      changedStates.push(state);
    }
  });

  changedStates.forEach((state) => {
    state.callbacks.forEach((cb) => cb(state.rect));
  });

  rafId = window.requestAnimationFrame(run);
};

export default function observeRect(
  node: Element,
  cb: (rect: DOMRect) => void,
) {
  return {
    observe() {
      const wasEmpty = observedNodes.size === 0;

      if (observedNodes.has(node)) {
        observedNodes.get(node)!.callbacks.push(cb);
      } else {
        observedNodes.set(node, {
          rect: undefined,
          hasRectChanged: false,
          callbacks: [cb],
        });
      }

      if (wasEmpty) {
        run();
      }
    },

    unobserve() {
      const state = observedNodes.get(node);

      if (state) {
        // Remove the callback
        const index = state.callbacks.indexOf(cb);

        if (index >= 0) {
          state.callbacks.splice(index, 1);
        }

        // Remove the node reference
        if (!state.callbacks.length) {
          observedNodes.delete(node);
        }

        // Stop the loop
        if (!observedNodes.size) {
          cancelAnimationFrame(rafId);
        }
      }
    },
  };
}

export type PartialRect = Partial<DOMRect>;
