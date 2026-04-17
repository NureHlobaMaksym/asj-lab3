<script setup lang="ts">
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal.vue';
import { useTaskDetailView } from '@/modules/task-detail/composables/useTaskDetailView';
import './TaskDetailView.css';

const {
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
  events
} = useTaskDetailView();
</script>

<template>
  <section class="page-shell">
    <button class="link-button" type="button" @click="navigateBack">{{ breadcrumbLabel }}</button>

    <div v-if="task" class="detail-view">
      <h1>{{ task.title }}</h1>

      <div class="detail-view__tags">
        <span class="task-chip">{{ task.category }}</span>
        <span class="task-chip" :class="priorityChipClass">{{ task.priority }} пріоритет</span>
        <span v-if="isOverdue" class="detail-view__overdue">Прострочено до {{ deadlineFormatted }}</span>
      </div>

      <div class="detail-view__grid">
        <article class="detail-card">
          <h4>Статус</h4>
          <p>{{ statusLabel }}</p>
        </article>
        <article class="detail-card">
          <h4>Категорія</h4>
          <p>{{ task.category }}</p>
        </article>
        <article class="detail-card">
          <h4>Дата створення</h4>
          <p>{{ task.createdAt }}</p>
        </article>
        <article class="detail-card">
          <h4>Дедлайн</h4>
          <p :class="{ 'detail-card__deadline': isOverdue }">{{ deadlineFormatted }}</p>
        </article>
      </div>

      <article class="detail-card">
        <h4>Опис</h4>
        <p>{{ taskDescription }}</p>
      </article>

      <div class="detail-view__actions">
        <BaseButton label="✎ Редагувати" type="button" variant="primary" :disabled="false" @click="openTaskEdit" />
        <BaseButton label="✕ Видалити" type="button" variant="danger" :disabled="false" @click="openDeleteModal" />
      </div>
    </div>

    <div v-else class="empty-state">
      <h2>Задачу не знайдено</h2>
      <BaseButton label="Повернутися до списку" type="button" variant="secondary" :disabled="false" @click="navigateBack" />
    </div>

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
