import { computed, toRef } from 'vue';
import { Events } from '@/enums/events.enum';
import { DESCRIPTION_MAX_LENGTH } from '@/constants/length-limits.constants';
import type { BaseTextAreaEmits } from '@/interfaces/base-text-area-emits.interface';
import type { BaseTextAreaProperties } from '@/interfaces/base-text-area-properties.interface';

export const useBaseTextArea = (properties: BaseTextAreaProperties, emit: BaseTextAreaEmits) => {
  const valueRef = toRef(properties, 'modelValue');

  const charactersLeft = computed<number>(() => {
    return DESCRIPTION_MAX_LENGTH - valueRef.value.length;
  });

  const rows = computed<number>(() => Math.max(3, properties.rows));

  const onInput = (event: Event): void => {
    const target = event.target as HTMLTextAreaElement;
    emit(Events.UPDATE_MODEL_VALUE, target.value);
  };

  return {
    charactersLeft,
    rows,
    onInput
  };
};
