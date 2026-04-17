<script setup lang="ts">
import { useBaseFilters } from '@/composables/useBaseFilters';
import type { BaseFiltersEmits } from '@/interfaces/base-filters-emits.interface';
import type { BaseFiltersProperties } from '@/interfaces/base-filters-properties.interface';
import './BaseFilters.css';

const properties = defineProps<BaseFiltersProperties>();
const emit = defineEmits<BaseFiltersEmits>();
const { updateCategory, updatePriority, updateSort } = useBaseFilters(emit);

</script>

<template>
  <div class="base-filters">
    <div class="base-filters__row">
      <select class="base-filters__select" :value="properties.categoryValue" @change="updateCategory">
        <option v-for="option in properties.categoryOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <select class="base-filters__select" :value="properties.priorityValue" @change="updatePriority">
        <option v-for="option in properties.priorityOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <select class="base-filters__select" :value="properties.sortValue" @change="updateSort">
        <option v-for="option in properties.sortOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>
