import type { TaskFormModel } from '@/interfaces/task-form-model.interface';
import type { TaskFormErrors } from '@/modules/task-form/interfaces/task-form-errors.interface';
import type { SelectOption } from '@/interfaces/select-option.interface';

export interface TaskFormProperties {
  model: TaskFormModel;
  errors: TaskFormErrors;
  categories: SelectOption[];
  priorities: SelectOption[];
  submitLabel: string;
  cancelLabel: string;
  isEditMode: boolean;
}
