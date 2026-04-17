import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/task.store';
import { ConfirmModalAction } from '@/enums/confirm-modal-action.enum';
import { Events } from '@/enums/events.enum';
import type { Task } from '@/interfaces/task.interface';
import { formatIsoDateWithDots } from '@/utils/format-iso-date-with-dots.util';
import { isTaskOverdue } from '@/utils/is-task-overdue.util';

export const useTaskDetailView = () => {
  const route = useRoute();
  const router = useRouter();
  const taskStore = useTaskStore();
  const showDeleteModal = ref<boolean>(false);
  const breadcrumbLabel = '‹ Назад до списку';

  const taskId = computed<number>(() => Number(route.params.id));

  const task = computed<Task | undefined>(() => {
    if (Number.isNaN(taskId.value)) {
      return undefined;
    }

    return taskStore.getTaskById(taskId.value);
  });

  const deadlineFormatted = computed<string>(() => {
    if (!task.value) {
      return '-';
    }

    return formatIsoDateWithDots(task.value.deadline);
  });

  const statusLabel = computed<string>(() => {
    if (!task.value) {
      return '-';
    }

    return task.value.completed ? 'Виконана' : 'Активна';
  });

  const deleteModalMessage = computed<string>(() => {
    if (!task.value) {
      return 'Видалити задачу без можливості відновлення?';
    }

    return `Видалити задачу «${task.value.title}» без можливості відновлення?`;
  });

  const priorityChipClass = computed<string>(() => {
    if (!task.value) {
      return 'task-chip--priority-medium';
    }

    if (task.value.priority === 'Високий') {
      return 'task-chip--priority-high';
    }

    if (task.value.priority === 'Низький') {
      return 'task-chip--priority-low';
    }

    return 'task-chip--priority-medium';
  });

  const isOverdue = computed<boolean>(() => {
    if (!task.value || task.value.completed) {
      return false;
    }
    return isTaskOverdue(task.value);
  });
  const taskDescription = computed<string>(() => {
    if (!task.value) {
      return 'Опис відсутній';
    }

    return task.value.description.length > 0 ? task.value.description : 'Опис відсутній';
  });

  const openTaskEdit = (): void => {
    if (!task.value) {
      return;
    }

    router.push(`/tasks/${task.value.id}/edit`);
  };

  const openDeleteModal = (): void => {
    showDeleteModal.value = true;
  };

  const navigateBack = (): void => {
    router.push('/');
  };

  const deleteTask = (): void => {
    if (!task.value) {
      return;
    }

    taskStore.deleteTask(task.value.id);
    router.push('/');
  };

  const onModalClose = (action: ConfirmModalAction): void => {
    showDeleteModal.value = false;

    if (action === ConfirmModalAction.Confirm) {
      deleteTask();
    }
  };

  return {
    task,
    deadlineFormatted,
    statusLabel,
    priorityChipClass,
    isOverdue,
    showDeleteModal,
    deleteModalMessage,
    taskDescription,
    breadcrumbLabel,
    navigateBack,
    openTaskEdit,
    openDeleteModal,
    onModalClose,
    events: Events
  };
};
