import { Events } from '@/enums/events.enum';
import type { TaskFormEmits } from '@/modules/task-form/interfaces/task-form-emits.interface';
import { getTodayDate } from '@/utils/get-today-date.util';

export const useTaskForm = (emit: TaskFormEmits) => {
  const today = getTodayDate();

  const onTitleInput = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    emit(Events.UPDATE_TITLE, target.value);
  };

  const onCategoryChange = (event: Event): void => {
    const target = event.target as HTMLSelectElement;
    emit(Events.UPDATE_CATEGORY, target.value);
  };

  const onPriorityChange = (event: Event): void => {
    const target = event.target as HTMLSelectElement;
    emit(Events.UPDATE_PRIORITY, target.value);
  };

  const onDeadlineChange = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    emit(Events.UPDATE_DEADLINE, target.value);
  };

  const onCompletedChange = (event: Event): void => {
    const target = event.target as HTMLSelectElement;
    emit(Events.UPDATE_COMPLETED, target.value === 'completed');
  };

  const onDescriptionInput = (value: string): void => {
    emit(Events.UPDATE_DESCRIPTION, value);
  };

  const onSubmit = (): void => {
    emit(Events.SUBMIT);
  };

  const onCancel = (): void => {
    emit(Events.CANCEL);
  };

  return {
    today,
    onTitleInput,
    onCategoryChange,
    onPriorityChange,
    onDeadlineChange,
    onCompletedChange,
    onDescriptionInput,
    onSubmit,
    onCancel
  };
};
