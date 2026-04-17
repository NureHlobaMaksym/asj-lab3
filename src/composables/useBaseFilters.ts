import { Events } from '@/enums/events.enum';
import type { BaseFiltersEmits } from '@/interfaces/base-filters-emits.interface';

export const useBaseFilters = (emit: BaseFiltersEmits) => {
  const updateCategory = (event: Event): void => {
    const target = event.target as HTMLSelectElement;
    emit(Events.UPDATE_CATEGORY_VALUE, target.value);
  };

  const updatePriority = (event: Event): void => {
    const target = event.target as HTMLSelectElement;
    emit(Events.UPDATE_PRIORITY_VALUE, target.value);
  };

  const updateSort = (event: Event): void => {
    const target = event.target as HTMLSelectElement;
    emit(Events.UPDATE_SORT_VALUE, target.value);
  };

  return {
    updateCategory,
    updatePriority,
    updateSort
  };
};
