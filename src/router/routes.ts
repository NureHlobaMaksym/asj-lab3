import type { RouteRecordRaw } from 'vue-router';
import TaskListView from '@/modules/task-list/views/TaskListView.vue';
import TaskDetailView from '@/modules/task-detail/views/TaskDetailView.vue';
import TaskFormView from '@/modules/task-form/views/TaskFormView.vue';
import StatsView from '@/modules/stats/views/StatsView/StatsView.vue';
import NotFoundView from '@/modules/not-found/views/NotFoundView.vue';

export const APP_ROUTES: RouteRecordRaw[] = [
  { path: '/', name: 'tasks', component: TaskListView },
  { path: '/tasks/new', name: 'task-new', component: TaskFormView },
  { path: '/tasks/:id', name: 'task-details', component: TaskDetailView },
  { path: '/tasks/:id/edit', name: 'task-edit', component: TaskFormView },
  { path: '/stats', name: 'stats', component: StatsView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
];
