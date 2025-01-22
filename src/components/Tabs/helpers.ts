import type { TabItem } from './Tabs';

export const getRestrictedItems = (items: TabItem[], restricted: string[]) => {
  return items.filter(
    (item) => item.id == null || !restricted.includes(item.id),
  );
};
