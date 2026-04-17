const CATEGORY_CLASS_MAP: Record<string, string> = {
  'Робота': 'stats-list__badge--work',
  'Навчання': 'stats-list__badge--study',
  'Особисте': 'stats-list__badge--personal'
};

export const getTaskCategoryClass = (category: string): string => {
  return CATEGORY_CLASS_MAP[category] ?? '';
};
