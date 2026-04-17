import { Events } from '@/enums/events.enum';
import type { ConfirmModalAction } from '@/enums/confirm-modal-action.enum';

export interface ConfirmModalEmits {
  (event: Events.CLOSE, action: ConfirmModalAction): void;
}
