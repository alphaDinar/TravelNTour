interface defType extends Record<string, any> { };

export const sortByPriority = (items: defType[]) => {
  return items.sort((a, b) => b.priority - a.priority);
};

export const sortByViews = (items: defType[]) => {
  return items.sort((a, b) => a.priority - b.priority);
};

export const sortByTimestamp = (items: defType[]) => {
  return items.sort((a, b) => b.timestamp - a.timestamp);
};