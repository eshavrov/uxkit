import React from 'react';
import ReactDOM from 'react-dom';

type PortalElement = React.ElementRef<'div'>;
type PortalBaseProps = React.ComponentPropsWithoutRef<'div'>;

export interface PortalProps extends PortalBaseProps {
  /** An optional container where the portaled content should be appended. */
  container?: Element | DocumentFragment | null;
}

/**
 * Renders a React subtree in a different part of the DOM.
 * 
 * Anything you put inside this component will be rendered in a separate `<div>` element.
 * By default, this element will be appended to `document.body` but you can choose a different container by using the container prop.
 */
export const Portal = React.forwardRef<PortalElement, PortalProps>((props, forwardedRef) => {
  const {
    container: containerProp,
    ...portalProps
  } = props;

  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => setMounted(true), []);

  const container = containerProp || (mounted && globalThis?.document?.body);

  return container
    ? ReactDOM.createPortal(<div {...portalProps} ref={forwardedRef} />, container)
    : null;
});

Portal.displayName = 'Portal';
