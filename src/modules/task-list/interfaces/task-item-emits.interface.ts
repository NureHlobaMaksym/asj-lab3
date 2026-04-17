import { Events } from '@/enums/events.enum';

export interface TaskItemEmits {
    (event: Events.ACTION, action: Events, id: number): void;
}