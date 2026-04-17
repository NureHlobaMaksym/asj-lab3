<script setup lang="ts">
import { useBaseButton } from '@/composables/useBaseButton';
import type { BaseButtonEmits } from '@/interfaces/base-button-emits.interface';
import type { BaseButtonProperties } from '@/interfaces/base-button-properties.interface';
import './BaseButton.css';

const properties = defineProps<BaseButtonProperties>();
const emit = defineEmits<BaseButtonEmits>();
const { handleClick } = useBaseButton(emit);
</script>

<template>
  <button :type="properties.type" :class="['base-button', `base-button--${properties.variant}`]" :disabled="properties.disabled" @click="handleClick">
    {{ properties.label }}
  </button>
</template>
