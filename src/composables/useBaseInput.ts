import { computed } from 'vue';
import { Events } from '@/enums/events.enum';
import type { BaseInputEmits } from '@/interfaces/base-input-emits.interface';
import type { BaseInputProperties } from '@/interfaces/base-input-properties.interface';

export const useBaseInput = (properties: BaseInputProperties, emit: BaseInputEmits) => {
  const maxLengthAttribute = computed<number | undefined>(() => {
    return properties.maxLength > 0 ? properties.maxLength : undefined;
  });

  const minAttribute = computed<string | undefined>(() => {
    return properties.minValue.length > 0 ? properties.minValue : undefined;
  });

  const onInput = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    emit(Events.UPDATE_MODEL_VALUE, target.value);
  };

  return {
    maxLengthAttribute,
    minAttribute,
    onInput
  };
};
