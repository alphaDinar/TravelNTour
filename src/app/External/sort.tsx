interface defType extends Record<string, any> { };

export const sortByPriority = (tours: defType[]) => {
  return tours.sort((a, b) => b.priority - a.priority);
};

export const sortByViews = (tours: defType[]) => {
  // return tours.sort((a, b) => b.views - a.views);
  return tours.sort((a, b) => a.priority - b.priority);
};