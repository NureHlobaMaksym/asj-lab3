import { computed } from 'vue';
import { useRoute } from 'vue-router';

export const useApp = () => {
  const route = useRoute();

  const isTasksTab = computed<boolean>(() => {
    return route.path === '/' || route.path.startsWith('/tasks');
  });

  const isStatsTab = computed<boolean>(() => {
    return route.path.startsWith('/stats');
  });

  return {
    isTasksTab,
    isStatsTab
  };
};
