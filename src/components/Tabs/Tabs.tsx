import cn from 'classnames';
import React from 'react';

import s from './Tabs.module.css';

export interface TabItem {
  children: any;
  className?: string;
  id?: string;
  key: string;
  label: string;
}

export interface TabsRef {
  getClientWidth: () => number | undefined;
  select: (activeKey: string) => void;
}

interface TabsProps {
  'aria-labelledby'?: string;
  activeKey?: string;
  className?: string;
  defaultActiveKey: string;
  destroyInactiveTabPanel?: boolean;
  items: TabItem[];
  onTabClick?: (tab: any) => void;
}

export const Tabs = React.forwardRef<TabsRef, TabsProps>((props, ref) => {
  const {
    activeKey,
    className,
    defaultActiveKey,
    destroyInactiveTabPanel = false,
    items,
    onTabClick,
  } = props;

  const tabKeys = items.map(({ key }) => key);
  const [firstTab, lastTab] = [tabKeys.at(0)!, tabKeys.at(-1)!];

  const tablistNode = React.useRef<HTMLDivElement>(null);

  const [_activeTabKey, setActiveTabKey] = React.useState(
    () => defaultActiveKey || firstTab,
  );

  const activeTabKey = activeKey ?? _activeTabKey;

  const setSelectedTab = (currentTab: any) => {
    setActiveTabKey(currentTab);

    if (onTabClick) {
      onTabClick(currentTab);
    }
  };

  const moveFocusToTab = (currentTabKey: string) => {
    const currentTab = tablistNode.current?.querySelector<HTMLButtonElement>(
      `button[id='${currentTabKey}']`,
    );

    currentTab?.focus();
  };

  const moveFocusToTabPanel = (currentTabKey: string) => {
    const currentTab =
      tablistNode.current?.parentNode?.querySelector<HTMLElement>(
        `section[id='tabpanel-${currentTabKey}']`,
      );

    currentTab?.focus();
  };

  const moveFocusToPreviousTab = (currentTab: any) => {
    if (currentTab === firstTab) {
      moveFocusToTab(lastTab);
    } else {
      const index = tabKeys.indexOf(currentTab);

      moveFocusToTab(tabKeys[index - 1]);
    }
  };

  const moveFocusToNextTab = (currentTab: any) => {
    if (currentTab === lastTab) {
      moveFocusToTab(firstTab);
    } else {
      const index = tabKeys.indexOf(currentTab);

      moveFocusToTab(tabKeys[index + 1]);
    }
  };

  const onKeydown = (event: any) => {
    const tgt = event.currentTarget.id;

    let flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        moveFocusToPreviousTab(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        moveFocusToNextTab(tgt);
        flag = true;
        break;

      case 'ArrowDown':
        moveFocusToTabPanel(activeTabKey);
        flag = false;
        break;

      case 'Home':
        moveFocusToTab(firstTab);
        flag = true;
        break;

      case 'End':
        moveFocusToTab(lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  React.useImperativeHandle(
    ref,
    () => ({
      getClientWidth: () => tablistNode.current?.clientWidth,
      select: (_activeKey) => {
        if (items.find(({ key }) => key === _activeKey)) {
          setSelectedTab(_activeKey);
        }
      },
    }),
    [items],
  );

  // Since this uses buttons for the tabs, the click onr also is activated
  // with the space and enter keys
  const onClick = (event: any) => {
    setSelectedTab(event.currentTarget.id);
  };

  const tabs = items.map(({ label, key }) => {
    const selected = key === activeTabKey;

    return (
      <button
        className={s.tab}
        key={key}
        id={key}
        type="button"
        role="tab"
        aria-selected={`${selected}`}
        aria-controls={`tabpanel-${key}`}
        tabIndex={selected ? undefined : -1}
        onKeyDown={onKeydown}
        onClick={onClick}
      >
        <span className={s.focus}>{label}</span>
      </button>
    );
  });

  const tabpanels = items.map(({ children, key, className: tabClassName }) => {
    const selected = key === activeTabKey;

    if (destroyInactiveTabPanel && !selected) {
      return null;
    }

    return (
      <section
        key={key}
        className={cn(s.tabpanel, tabClassName, {
          [s.isHidden]: !selected,
        })}
        id={`tabpanel-${key}`}
        role="tabpanel"
        aria-labelledby={`tab-${key}`}
        tabIndex={-1}
      >
        {children}
      </section>
    );
  });

  return (
    <div className={cn(s.tabs, className)}>
      <div
        className={s.tablist}
        ref={tablistNode}
        role="tablist"
        aria-labelledby={props['aria-labelledby']}
      >
        {tabs}
      </div>
      {tabpanels}
    </div>
  );
});
