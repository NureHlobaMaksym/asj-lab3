import { Events } from '@/enums/events.enum';
import type { BaseButtonEmits } from '@/interfaces/base-button-emits.interface';

export const useBaseButton = (emit: BaseButtonEmits) => {
  const handleClick = (): void => {
    emit(Events.CLICK);
  };

  return {
    handleClick
  };
};
