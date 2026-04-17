<script setup lang="ts">
import { useConfirmModal } from '@/composables/useConfirmModal';
import type { ConfirmModalProperties } from '@/interfaces/confirm-modal-properties.interface';
import type { ConfirmModalEmits } from '@/interfaces/confirm-modal-emits.interface';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import './ConfirmModal.css';

const properties = defineProps<ConfirmModalProperties>();
const emit = defineEmits<ConfirmModalEmits>();
const { cancel, confirm } = useConfirmModal(emit);
</script>

<template>
  <div v-if="properties.isOpen" class="confirm-modal">
    <div class="confirm-modal__backdrop" @click="cancel" />
    <div class="confirm-modal__content">
      <h3>{{ properties.title }}</h3>
      <p>{{ properties.message }}</p>
      <div class="confirm-modal__actions">
        <BaseButton :label="properties.cancelLabel" type="button" variant="secondary" :disabled="false" @click="cancel" />
        <BaseButton :label="properties.confirmLabel" type="button" variant="danger" :disabled="false" @click="confirm" />
      </div>
    </div>
  </div>
</template>
