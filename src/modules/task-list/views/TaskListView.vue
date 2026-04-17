<script setup lang="ts">
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseFilters from '@/components/BaseFilters/BaseFilters.vue';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal.vue';
import TaskList from '@/modules/task-list/components/TaskList/TaskList.vue';
import { useTaskListView } from '@/modules/task-list/composables/useTaskListView';
import './TaskListView.css';

const {
  selectedCategory,
  selectedPriority,
  selectedSort,
  searchQuery,
  filteredTasks,
  openCreatePage,
  categoryOptions,
  priorityOptions,
  sortOptions,
  onCategoryUpdate,
  onPriorityUpdate,
  onSortUpdate,
  onSearchInput,
  handleTaskAction,
  showDeleteModal,
  onModalClose,
  deleteModalMessage,
  events
} = useTaskListView();
</script>

<template>
  <section class="page-shell task-list-view">
    <div class="task-list-view__controls">
      <BaseFilters
        :category-value="selectedCategory"
        :priority-value="selectedPriority"
        :sort-value="selectedSort"
        :category-options="categoryOptions"
        :priority-options="priorityOptions"
        :sort-options="sortOptions"
        @[events.UPDATE_CATEGORY_VALUE]="onCategoryUpdate"
        @[events.UPDATE_PRIORITY_VALUE]="onPriorityUpdate"
        @[events.UPDATE_SORT_VALUE]="onSortUpdate"
      />
      <div class="task-list-view__toolbar">
        <BaseButton label="+ Додати задачу" type="button" variant="primary" :disabled="false" @click="openCreatePage" />
      </div>
    </div>

    <input
      class="task-list-view__search"
      type="text"
      :value="searchQuery"
      placeholder="Пошук за назвою задачі"
      @input="onSearchInput"
    />

    <TaskList :tasks="filteredTasks" empty-text="Наразі задач немає" :variant="events.FULL" @[events.ACTION]="handleTaskAction" />

    <ConfirmModal
      title="Видалення задачі"
      :message="deleteModalMessage"
      :is-open="showDeleteModal"
      confirm-label="Видалити"
      cancel-label="Скасувати"
      @[events.CLOSE]="onModalClose"
    />
  </section>
</template>
