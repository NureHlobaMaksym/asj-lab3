<script setup lang="ts">
import TaskForm from '@/modules/task-form/components/TaskForm/TaskForm.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import { useTaskFormView } from '@/modules/task-form/composables/useTaskFormView';
import './TaskFormView.css';

const {
  model,
  errors,
  isEditMode,
  isSubmitting,
  showNotFoundState,
  pageTitle,
  submitLabel,
  breadcrumbLabel,
  navigateBack,
  categories,
  priorities,
  onSubmit,
  onTitleUpdate,
  onDescriptionUpdate,
  onCategoryUpdate,
  onPriorityUpdate,
  onDeadlineUpdate,
  onCompletedUpdate
} = useTaskFormView();
</script>

<template>
  <section class="page-shell">
    <button class="link-button" type="button" @click="navigateBack">
      {{ breadcrumbLabel }}
    </button>

    <div v-if="showNotFoundState" class="empty-state">
      <h2>Задачу не знайдено</h2>
      <BaseButton label="Повернутися назад" type="button" variant="secondary" :disabled="false" @click="navigateBack" />
    </div>

    <div v-else>
      <h1 class="task-form-view__title">{{ pageTitle }}</h1>
      <TaskForm
          :model="model"
          :errors="errors"
          :categories="categories"
          :priorities="priorities"
          :submit-label="submitLabel"
          cancel-label="Скасувати"
          :is-edit-mode="isEditMode"
          :is-submitting="isSubmitting"
          @submit="onSubmit"
          @cancel="navigateBack"
          @update:title="onTitleUpdate"
          @update:description="onDescriptionUpdate"
          @update:category="onCategoryUpdate"
          @update:priority="onPriorityUpdate"
          @update:deadline="onDeadlineUpdate"
          @update:completed="onCompletedUpdate"
      />
    </div>
  </section>
</template>