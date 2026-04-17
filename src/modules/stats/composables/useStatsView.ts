import { useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/task.store';
import { Events } from '@/enums/events.enum';

export const useStatsView = () => {
  const router = useRouter();
  const taskStore = useTaskStore();
  const compactVariant: Events.COMPACT = Events.COMPACT;

  const handleAction = (action: Events, id: number): void => {
    if (action === Events.OPEN) {
      router.push(`/tasks/${id}`);
    }
  };

  return {
    taskStore,
    handleAction,
    events: Events,
    compactVariant
  };
};
