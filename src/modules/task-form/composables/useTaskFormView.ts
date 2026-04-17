import { computed, reactive, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/task.store';
import { Events } from '@/enums/events.enum';
import type { Task } from '@/interfaces/task.interface';
import type { TaskFormErrors } from '@/modules/task-form/interfaces/task-form-errors.interface';
import type { TaskFormModel } from '@/interfaces/task-form-model.interface';
import type { TaskPriority } from '@/types/task-priority.type';
import { FORM_CATEGORY_OPTIONS, FORM_PRIORITY_OPTIONS } from '@/constants/task-filter-options.constants';
import { getTodayDate } from '@/utils/get-today-date.util';
import { parseDate } from '@/utils/parse-date.util';

export const useTaskFormView = () => {
  const route = useRoute();
  const router = useRouter();
  const taskStore = useTaskStore();

  const isSubmitting = ref(false);

  const model = reactive<TaskFormModel>({
    title: '',
    description: '',
    category: 'Робота',
    priority: 'Середній',
    deadline: getTodayDate(),
    completed: false
  });

  const errors = reactive<TaskFormErrors>({
    title: '',
    deadline: ''
  });

  const resetValidation = (): void => {
    errors.title = '';
    errors.deadline = '';
  };

  const fillFromTask = (task: Task): void => {
    model.title = task.title;
    model.description = task.description;
    model.category = task.category;
    model.priority = task.priority;
    model.deadline = task.deadline;
    model.completed = task.completed;
  };

  const validate = (): boolean => {
    resetValidation();

    if (model.title.trim().length === 0) {
      errors.title = 'Назва є обовʼязковою';
    }

    if (model.deadline.length === 0) {
      errors.deadline = 'Дедлайн є обовʼязковим';
    }

    if (model.deadline.length > 0 && parseDate(model.deadline) < parseDate(getTodayDate())) {
      errors.deadline = 'Дедлайн не може бути у минулому';
    }

    return errors.title.length === 0 && errors.deadline.length === 0;
  };

  const taskId = computed<number>(() => Number(route.params.id));
  const isEditMode = computed<boolean>(() => route.path.includes('/edit'));

  const editingTask = computed<Task | undefined>(() => {
    if (!isEditMode.value || Number.isNaN(taskId.value)) {
      return undefined;
    }
    return taskStore.getTaskById(taskId.value);
  });

  watch(
      editingTask,
      (task: Task | undefined): void => {
        if (task) {
          fillFromTask(task);
        }
      },
      { immediate: true }
  );

  const pageTitle = computed<string>(() => (isEditMode.value ? 'Редагування задачі' : 'Створення задачі'));
  const submitLabel = computed<string>(() => (isEditMode.value ? 'Зберегти зміни' : 'Створити задачу'));
  const showNotFoundState = computed<boolean>(() => isEditMode.value && !editingTask.value);

  const breadcrumbLabel = '‹ Назад до списку';

  const navigateBack = (): void => {
    router.push('/');
  };

  const onPriorityUpdate = (value: string): void => {
    if (value === 'Низький' || value === 'Середній' || value === 'Високий') {
      model.priority = value as TaskPriority;
    }
  };

  const onTitleUpdate = (value: string): void => { model.title = value; };
  const onDescriptionUpdate = (value: string): void => { model.description = value; };
  const onCategoryUpdate = (value: string): void => { model.category = value; };
  const onDeadlineUpdate = (value: string): void => { model.deadline = value; };
  const onCompletedUpdate = (value: boolean): void => { model.completed = value; };

  const onSubmit = (): void => {
    if (isSubmitting.value || !validate()) {
      return;
    }

    isSubmitting.value = true;
    const taskData = { ...model };

    if (isEditMode.value) {
      if (editingTask.value) {
        taskStore.updateTask(editingTask.value.id, taskData);
      }
    } else {
      taskStore.addTask(taskData);
    }

    router.push('/');
  };

  return {
    model,
    errors,
    isEditMode,
    isSubmitting,
    editingTask,
    showNotFoundState,
    pageTitle,
    submitLabel,
    breadcrumbLabel,
    navigateBack,
    onSubmit,
    onTitleUpdate,
    onDescriptionUpdate,
    onCategoryUpdate,
    onPriorityUpdate,
    onDeadlineUpdate,
    onCompletedUpdate,
    categories: FORM_CATEGORY_OPTIONS,
    priorities: FORM_PRIORITY_OPTIONS,
    events: Events
  };
};