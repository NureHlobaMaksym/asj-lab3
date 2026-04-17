<script setup lang="ts">
import { useBaseInput } from '@/composables/useBaseInput';
import type { BaseInputEmits } from '@/interfaces/base-input-emits.interface';
import type { BaseInputProperties } from '@/interfaces/base-input-properties.interface';
import './BaseInput.css';

const properties = defineProps<BaseInputProperties>();
const emit = defineEmits<BaseInputEmits>();
const { maxLengthAttribute, minAttribute, onInput } = useBaseInput(properties, emit);
</script>

<template>
  <div class="base-input">
    <label class="base-input__label">{{ properties.label }}</label>
    <input
      class="base-input__field"
      :class="{ 'base-input__field--error': properties.error.length > 0 }"
      :type="properties.type"
      :value="properties.modelValue"
      :placeholder="properties.placeholder"
      :maxlength="maxLengthAttribute"
      :min="minAttribute"
      :disabled="properties.disabled"
      @input="onInput"
    />
    <p class="base-input__error">{{ properties.error }}</p>
  </div>
</template>
