<script setup lang="ts">
import type { StatsCardProperties } from '@/modules/stats/interfaces/stats-card-properties.interface';
import './StatsCard.css';

defineProps<StatsCardProperties>();
</script>

<template>
  <article class="stats-card" :class="`stats-card--${variant}`">
    <strong>{{ count }}</strong>
    <span>{{ label }}</span>
  </article>
</template>