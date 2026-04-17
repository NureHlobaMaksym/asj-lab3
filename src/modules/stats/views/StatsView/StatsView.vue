<script setup lang="ts">
import TaskList from '@/modules/task-list/components/TaskList/TaskList.vue';
import StatsCard from '@/modules/stats/components/StatsCard/StatsCard.vue';
import { useStatsView } from '@/modules/stats/composables/useStatsView';
import './StatsView.css';

const { taskStore, handleAction, events, compactVariant } = useStatsView();
</script>

<template>
  <section class="page-shell stats-view">
    <div class="stats-grid">
      <StatsCard :count="taskStore.totalTasks" label="Всього задач" variant="default" />
      <StatsCard :count="taskStore.activeCount" label="Активних" variant="active" />
      <StatsCard :count="taskStore.completedCount" label="Виконано" variant="done" />
      <StatsCard :count="taskStore.overdueCount" label="Прострочено" variant="overdue" />
    </div>

    <article class="stats-section">
      <h3>Найближчі дедлайни (наступні 3 дні)</h3>
      <TaskList
        v-if="taskStore.upcomingDeadlines.length > 0"
        :tasks="taskStore.upcomingDeadlines"
        :variant="compactVariant"
        empty-text=""
        @[events.ACTION]="handleAction"
      />
      <p v-else class="stats-empty">Немає задач із дедлайном у найближчі 3 дні.</p>
    </article>
  </section>
</template>
