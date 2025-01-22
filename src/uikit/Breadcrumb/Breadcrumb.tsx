import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import s from './Breadcrumb.module.css';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  readonly?: boolean;
}

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { items, className, readonly } = props;

  return (
    <nav className={cn(className, s.breadcrumb)} aria-label="Breadcrumb">
      <ol
        className={s.ol}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;

          let breadcrumbItem = (
            <Link
              to={item.path}
              itemProp="item"
              aria-current={isLastItem ? 'location' : undefined}
            >
              <span className={s.item} itemProp="name">
                {item.label}
              </span>
            </Link>
          );

          if (readonly) {
            breadcrumbItem = (
              <span
                className={s.item}
                itemProp="item"
                aria-current={isLastItem ? 'location' : undefined}
              >
                {item.label}
              </span>
            );
          }

          const separator = isLastItem ? null : (
            <span className={s.separator} aria-hidden="true">
              ›
            </span>
          );

          return (
            <React.Fragment key={item.path}>
              {item.label ? (
                <li
                  className={s.li}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  {breadcrumbItem}
                  {separator}
                  <meta itemProp="position" content={`${++index}`} />
                </li>
              ) : null}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
