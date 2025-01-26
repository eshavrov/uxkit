
import React from 'react';

import { Slot } from '@components/Slot';

const NODES = [
  'a',
  'button',
  'div',
  'form',
  'h2',
  'h3',
  'img',
  'input',
  'label',
  'li',
  'nav',
  'ol',
  'p',
  'span',
  'svg',
  'ul',
] as const;

export type NodePropsWithRef<E extends React.ElementType> = React.ComponentPropsWithRef<E> & {
  asChild?: boolean;
};

interface NodeForwardRefComponent<E extends React.ElementType>
  extends React.ForwardRefExoticComponent<NodePropsWithRef<E>> {}

type Nodes = { [E in (typeof NODES)[number]]: NodeForwardRefComponent<E> };

const Node = NODES.reduce((acc, tag) => {
  const Tag = React.forwardRef((props: NodePropsWithRef<typeof tag>, forwardedRef: any) => {
    const { asChild, ...nodeProps } = props;

    const Component: any = asChild ? Slot : tag;

    return <Component {...nodeProps} ref={forwardedRef} />;
  });

  Tag.displayName = `Node.${tag}`;

  return { ...acc, [tag]: Tag };
}, {} as Nodes);

export { Node };
