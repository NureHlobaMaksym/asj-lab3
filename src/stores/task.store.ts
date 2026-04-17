import { defineStore } from 'pinia';
import type { Task } from '@/interfaces/task.interface';
import type { TaskFormModel } from '@/interfaces/task-form-model.interface';
import { formatCreatedAtDate } from '@/utils/format-created-at-date.util';
import { getTodayTimestamp } from '@/utils/get-today-timestamp.util';
import { parseDate } from '@/utils/parse-date.util';

const STORAGE_KEY = 'asj-lab3-tasks';

const priorityWeight: Record<Task['priority'], number> = {
  'Низький': 1,
  'Середній': 2,
  'Високий': 3
};

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[]
  }),
  getters: {
    activeTasks: (state): Task[] => state.tasks.filter((task: Task): boolean => !task.completed),
    completedTasks: (state): Task[] => state.tasks.filter((task: Task): boolean => task.completed),
    overdueTasks: (state): Task[] => {
      const today = getTodayTimestamp();
      return state.tasks.filter((task: Task): boolean => {
        return !task.completed && parseDate(task.deadline) < today;
      });
    },
    tasksByCategory: (state): Record<string, number> => {
      return state.tasks.reduce((accumulator: Record<string, number>, task: Task) => {
        const currentCount = accumulator[task.category] ?? 0;
        accumulator[task.category] = currentCount + 1;
        return accumulator;
      }, {});
    },
    upcomingDeadlines: (state): Task[] => {
      const today = getTodayTimestamp();
      const inTwoDays = today + 2 * 24 * 60 * 60 * 1000;
      return state.tasks
          .filter((task: Task): boolean => {
            const deadline = parseDate(task.deadline);
            return !task.completed && deadline >= today && deadline <= inTwoDays;
          })
          .sort((left: Task, right: Task): number => parseDate(left.deadline) - parseDate(right.deadline));
    },
    nearestDeadlines: (state): Task[] => {
      return state.tasks
          .filter((task: Task): boolean => !task.completed)
          .sort((left: Task, right: Task): number => parseDate(left.deadline) - parseDate(right.deadline))
          .slice(0, 3);
    },
    totalTasks: (state): number => state.tasks.length,
    activeCount(): number { return this.activeTasks.length; },
    completedCount(): number { return this.completedTasks.length; },
    overdueCount(): number { return this.overdueTasks.length; },
    completionProgress(): number {
      if (this.totalTasks === 0) return 0;
      return Math.round((this.completedCount / this.totalTasks) * 100);
    }
  },
  actions: {
    addTask(taskData: TaskFormModel): number {
      const id = Date.now();
      const createdAt = formatCreatedAtDate(new Date());
      const task: Task = {
        id,
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        priority: taskData.priority,
        deadline: taskData.deadline,
        completed: taskData.completed,
        createdAt
      };
      this.tasks.push(task);
      this.persistTasks();
      return id;
    },
    updateTask(taskId: number, taskData: TaskFormModel): void {
      const taskIndex = this.tasks.findIndex((task: Task): boolean => task.id === taskId);
      if (taskIndex === -1) return;
      this.tasks[taskIndex] = {
        ...this.tasks[taskIndex],
        ...taskData
      };
      this.persistTasks();
    },
    deleteTask(taskId: number): void {
      this.tasks = this.tasks.filter((task: Task): boolean => task.id !== taskId);
      this.persistTasks();
    },
    toggleTaskCompletion(taskId: number): void {
      const task = this.tasks.find((currentTask: Task): boolean => currentTask.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.persistTasks();
      }
    },
    getTaskById(taskId: number): Task | undefined {
      return this.tasks.find((task: Task): boolean => task.id === taskId);
    },
    loadTasksFromStorage(): void {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      try {
        this.tasks = JSON.parse(raw) as Task[];
      } catch {
        this.tasks = [];
      }
    },
    persistTasks(): void {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    },
    getPriorityWeight(priority: Task['priority']): number {
      return priorityWeight[priority];
    }
  }
});