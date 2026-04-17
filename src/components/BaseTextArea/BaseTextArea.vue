<script setup lang="ts">
import { useBaseTextArea } from '@/composables/useBaseTextArea';
import type { BaseTextAreaEmits } from '@/interfaces/base-text-area-emits.interface';
import type { BaseTextAreaProperties } from '@/interfaces/base-text-area-properties.interface';
import { DESCRIPTION_MAX_LENGTH } from '@/constants/length-limits.constants';
import './BaseTextArea.css';

const properties = defineProps<BaseTextAreaProperties>();
const emit = defineEmits<BaseTextAreaEmits>();
const { charactersLeft, rows, onInput } = useBaseTextArea(properties, emit);
</script>

<template>
  <div class="base-textarea">
    <label class="base-textarea__label">{{ properties.label }}</label>
    <textarea
      class="base-textarea__input"
      :class="{ 'base-textarea__input--error': properties.error.length > 0 }"
      :rows="rows"
      :placeholder="properties.placeholder"
      :value="properties.modelValue"
      :maxlength="DESCRIPTION_MAX_LENGTH"
      @input="onInput"
    />
    <div class="base-textarea__meta">
      <span class="base-textarea__error">{{ properties.error }}</span>
      <span class="base-textarea__count">Залишилось: {{ charactersLeft }}</span>
    </div>
  </div>
</template>
