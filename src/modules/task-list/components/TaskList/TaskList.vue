<script setup lang="ts">
import TaskItem from '@/modules/task-list/components/TaskItem/TaskItem.vue';
import type { TaskListProperties } from '@/modules/task-list/interfaces/task-list-properties.interface';
import type { TaskItemEmits } from '@/modules/task-list/interfaces/task-item-emits.interface';
import { Events } from '@/enums/events.enum';
import './TaskList.css';

defineProps<TaskListProperties>();

const emit = defineEmits<TaskItemEmits>();

const onTaskAction = (action: Events, id: number): void => {
  emit(Events.ACTION, action, id);
};
</script>

<template>
  <section :class="variant === Events.FULL ? 'task-list' : 'stats-list'">
    <div v-if="tasks.length === 0" class="task-list__empty">
      {{ emptyText }}
    </div>

    <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :variant="variant"
        @[Events.ACTION]="onTaskAction"
    />
  </section>
</template>