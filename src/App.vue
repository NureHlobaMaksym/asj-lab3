<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useApp } from '@/composables/useApp';
import './App.css';

const { isTasksTab, isStatsTab } = useApp();
</script>

<template>
  <div class="app-wrapper">
    <div class="app-panel">
      <header class="app-header">
        <h2>Менеджер задач</h2>
        <nav class="app-nav">
          <RouterLink to="/" class="app-nav__link" :class="{ 'app-nav__link--active': isTasksTab }">Задачі</RouterLink>
          <RouterLink to="/stats" class="app-nav__link" :class="{ 'app-nav__link--active': isStatsTab }">Статистика</RouterLink>
        </nav>
      </header>

      <RouterView v-slot="{ Component }">
        <Transition name="route-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>
