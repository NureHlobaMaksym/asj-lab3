<script setup lang="ts">
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import BaseTextArea from '@/components/BaseTextArea/BaseTextArea.vue';
import { useTaskForm } from '@/modules/task-form/composables/useTaskForm';
import type { TaskFormEmits } from '@/modules/task-form/interfaces/task-form-emits.interface';
import type { TaskFormProperties } from '@/modules/task-form/interfaces/task-form-properties.interface';
import { TITLE_MAX_LENGTH } from '@/constants/length-limits.constants';
import './TaskForm.css';

const properties = defineProps<TaskFormProperties>();
const emit = defineEmits<TaskFormEmits>();
const {
  today,
  onTitleInput,
  onCategoryChange,
  onPriorityChange,
  onDeadlineChange,
  onCompletedChange,
  onDescriptionInput,
  onSubmit,
  onCancel
} = useTaskForm(emit);
</script>

<template>
  <form class="task-form" @submit.prevent.stop="onSubmit">
    <BaseInput
      :model-value="properties.model.title"
      label="Назва задачі"
      type="text"
      placeholder="Введіть назву задачі"
      :error="properties.errors.title"
      :max-length="TITLE_MAX_LENGTH"
      min-value=""
      :disabled="false"
      @update:modelValue="onTitleInput"
    />

    <BaseTextArea
        :model-value="properties.model.description"
        label="Опис"
        placeholder="Опишіть задачу"
        :rows="4"
        error=""
        @update:model-value="onDescriptionInput"
    />

    <div class="task-form__grid task-form__grid--double">
      <div>
        <label class="task-form__label">Категорія</label>
        <select class="task-form__input task-form__input--select" :value="properties.model.category" @change="onCategoryChange">
          <option v-for="option in properties.categories" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div>
        <label class="task-form__label">Пріоритет</label>
        <select class="task-form__input task-form__input--select" :value="properties.model.priority" @change="onPriorityChange">
          <option v-for="option in properties.priorities" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="task-form__grid task-form__grid--double">
      <div>
        <BaseInput
          :model-value="properties.model.deadline"
          label="Дедлайн"
          type="date"
          placeholder=""
          :error="properties.errors.deadline"
          :max-length="0"
          :min-value="today"
          :disabled="false"
          @update:modelValue="onDeadlineChange"
        />
      </div>

      <div>
        <label class="task-form__label">Статус</label>
        <select class="task-form__input task-form__input--select" :value="properties.model.completed ? 'completed' : 'active'" @change="onCompletedChange">
          <option value="active">Активна</option>
          <option value="completed">Виконана</option>
        </select>
      </div>
    </div>

    <div class="task-form__actions">
      <BaseButton :label="properties.cancelLabel" type="button" variant="secondary" :disabled="false" @click="onCancel" />
      <BaseButton :label="properties.submitLabel" type="submit" variant="primary" :disabled="false" />
    </div>
  </form>
</template>
