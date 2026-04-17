import { Events } from '@/enums/events.enum';
import { ConfirmModalAction } from '@/enums/confirm-modal-action.enum';
import type { ConfirmModalEmits } from '@/interfaces/confirm-modal-emits.interface';

export const useConfirmModal = (emit: ConfirmModalEmits) => {
  const cancel = (): void => emit(Events.CLOSE, ConfirmModalAction.Cancel);
  const confirm = (): void => emit(Events.CLOSE, ConfirmModalAction.Confirm);

  return {
    cancel,
    confirm
  };
};
