import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ConfirmModalAction } from '@/enums/confirm-modal-action.enum';
import { Events } from '@/enums/events.enum';
import { FilterMode } from '@/enums/filter-mode.enum';
import { useTaskStore } from '@/stores/task.store';
import type { Task } from '@/interfaces/task.interface';
import { CATEGORY_OPTIONS, PRIORITY_OPTIONS, SORT_OPTIONS } from '@/constants/task-filter-options.constants';
import { parseDate } from '@/utils/parse-date.util';

export const useTaskListView = () => {
  const router = useRouter();
  const taskStore = useTaskStore();
  const selectedCategory = ref<string>(FilterMode.All);
  const selectedPriority = ref<string>(FilterMode.All);
  const selectedSort = ref<string>('deadline-asc');
  const searchQuery = ref<string>('');
  const normalizedQuery = computed<string>(() => searchQuery.value.trim().toLowerCase());
  const showDeleteModal = ref<boolean>(false);
  const deletingTaskId = ref<number>(0);
  const deletingTaskTitle = computed<string>(() => {
    if (deletingTaskId.value <= 0) {
      return '';
    }

    const deletingTask = taskStore.getTaskById(deletingTaskId.value);
    return deletingTask ? deletingTask.title : '';
  });
  const deleteModalMessage = computed<string>(() => `Видалити задачу «${deletingTaskTitle.value}» без можливості відновлення?`);

  const filteredTasks = computed<Task[]>(() => {
    const tasks = taskStore.tasks.filter((task: Task): boolean => {
      const categoryMatches = selectedCategory.value === FilterMode.All || task.category === selectedCategory.value;
      const priorityMatches = selectedPriority.value === FilterMode.All || task.priority === selectedPriority.value;
      const searchMatches = normalizedQuery.value.length === 0 || task.title.toLowerCase().includes(normalizedQuery.value);

      return categoryMatches && priorityMatches && searchMatches;
    });

    const sorted = [...tasks];

    if (selectedSort.value === 'deadline-asc') {
      sorted.sort((left: Task, right: Task): number => parseDate(left.deadline) - parseDate(right.deadline));
    } else if (selectedSort.value === 'deadline-desc') {
      sorted.sort((left: Task, right: Task): number => parseDate(right.deadline) - parseDate(left.deadline));
    } else if (selectedSort.value === 'priority-desc') {
      sorted.sort((left: Task, right: Task): number => taskStore.getPriorityWeight(right.priority) - taskStore.getPriorityWeight(left.priority));
    } else if (selectedSort.value === 'priority-asc') {
      sorted.sort((left: Task, right: Task): number => taskStore.getPriorityWeight(left.priority) - taskStore.getPriorityWeight(right.priority));
    }

    return sorted;
  });

  const openCreatePage = (): void => {
    router.push('/tasks/new');
  };

  const onCategoryUpdate = (value: string): void => {
    selectedCategory.value = value;
  };

  const onPriorityUpdate = (value: string): void => {
    selectedPriority.value = value;
  };

  const onSortUpdate = (value: string): void => {
    selectedSort.value = value;
  };

  const onSearchUpdate = (value: string): void => {
    searchQuery.value = value;
  };

  const handleTaskAction = (action: Events, id: number): void => {
    if (action === Events.TOGGLE) {
      taskStore.toggleTaskCompletion(id);
      return;
    }

    if (action === Events.OPEN) {
      router.push(`/tasks/${id}`);
      return;
    }

    if (action === Events.EDIT) {
      router.push(`/tasks/${id}/edit`);
      return;
    }

    if (action === Events.DELETE) {
      deletingTaskId.value = id;
      showDeleteModal.value = true;
    }
  };

  const onModalClose = (action: ConfirmModalAction): void => {
    showDeleteModal.value = false;

    if (action === ConfirmModalAction.Confirm && deletingTaskId.value > 0) {
      taskStore.deleteTask(deletingTaskId.value);
    }

    deletingTaskId.value = 0;
  };

  return {
    selectedCategory,
    selectedPriority,
    selectedSort,
    searchQuery,
    filteredTasks,
    openCreatePage,
    onCategoryUpdate,
    onPriorityUpdate,
    onSortUpdate,
    onSearchUpdate,
    handleTaskAction,
    showDeleteModal,
    onModalClose,
    deleteModalMessage,
    categoryOptions: CATEGORY_OPTIONS,
    priorityOptions: PRIORITY_OPTIONS,
    sortOptions: SORT_OPTIONS,
    events: Events
  };
};
