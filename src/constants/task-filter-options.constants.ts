import type { SelectOption } from '@/interfaces/select-option.interface';

export const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'all', label: 'Усі категорії' },
  { value: 'Робота', label: 'Робота' },
  { value: 'Навчання', label: 'Навчання' },
  { value: 'Особисте', label: 'Особисте' }
];

export const PRIORITY_OPTIONS: SelectOption[] = [
  { value: 'all', label: 'Усі пріоритети' },
  { value: 'Низький', label: 'Низький' },
  { value: 'Середній', label: 'Середній' },
  { value: 'Високий', label: 'Високий' }
];

export const SORT_OPTIONS: SelectOption[] = [
  { value: 'deadline-asc', label: 'Сортування: дедлайн ↑' },
  { value: 'deadline-desc', label: 'Сортування: дедлайн ↓' },
  { value: 'priority-desc', label: 'Сортування: пріоритет ↓' },
  { value: 'priority-asc', label: 'Сортування: пріоритет ↑' }
];

export const FORM_CATEGORY_OPTIONS: SelectOption[] = CATEGORY_OPTIONS.filter(
  (option: SelectOption): boolean => option.value !== 'all'
);

export const FORM_PRIORITY_OPTIONS: SelectOption[] = PRIORITY_OPTIONS.filter(
  (option: SelectOption): boolean => option.value !== 'all'
);
