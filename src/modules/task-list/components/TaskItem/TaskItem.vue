<script setup lang="ts">
import { Events } from '@/enums/events.enum';
import type { TaskItemProperties } from '@/modules/task-list/interfaces/task-item-properties.interface';
import type { TaskItemEmits } from '@/modules/task-list/interfaces/task-item-emits.interface';
import { useTaskItem } from '@/modules/task-list/composables/useTaskItem';
import './TaskItem.css';

defineProps<TaskItemProperties>();
const emit = defineEmits<TaskItemEmits>();

const {
  getDeadlineColorClass,
  formatShortDate,
  getCategoryClass,
  getPriorityClass,
  isOverdue
} = useTaskItem();
</script>

<template>
  <article v-if="variant === Events.COMPACT" class="stats-list__item">
    <button class="stats-list__title-button" type="button" @click="emit(Events.ACTION, Events.OPEN, task.id)">
      <span class="stats-list__title">{{ task.title }}</span>
    </button>
    <span class="stats-list__meta">
      <span class="stats-list__badge" :class="getCategoryClass(task.category)">
        {{ task.category }}
      </span>
      <span class="stats-list__date" :class="getDeadlineColorClass(task)">
        {{ formatShortDate(task.deadline) }}
      </span>
    </span>
  </article>

  <article v-else class="task-item" :class="{ 'task-item--completed': task.completed }">
    <button
        class="task-item__toggle"
        type="button"
        :class="{ 'task-item__toggle--active': task.completed }"
        @click="emit(Events.ACTION, Events.TOGGLE, task.id)"
    />

    <div class="task-item__content" @click="emit(Events.ACTION, Events.OPEN, task.id)">
      <h3>{{ task.title }}</h3>
      <div class="task-item__meta-row">
        <span class="task-item__badge">{{ task.category }}</span>
        <span class="task-item__badge" :class="getPriorityClass(task.priority)">
          {{ task.priority }}
        </span>
        <span class="task-item__deadline" :class="{ 'task-item__deadline--overdue': isOverdue(task) }">
          {{ isOverdue(task) ? 'прострочено до' : 'до' }} {{ formatShortDate(task.deadline) }}
        </span>
      </div>
    </div>

    <div class="task-item__actions">
      <button class="task-item__action" type="button" @click="emit(Events.ACTION, Events.EDIT, task.id)">✎</button>
      <button class="task-item__action" type="button" @click="emit(Events.ACTION, Events.OPEN, task.id)">◉</button>
      <button class="task-item__action" type="button" @click="emit(Events.ACTION, Events.DELETE, task.id)">✕</button>
    </div>
  </article>
</template>
