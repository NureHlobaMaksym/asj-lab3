import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from '@/router/router';
import { useTaskStore } from '@/stores/task.store';
import '@/style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

const taskStore = useTaskStore();
taskStore.loadTasksFromStorage();

taskStore.$subscribe((): void => {
  taskStore.persistTasks();
});

app.mount('#app');
