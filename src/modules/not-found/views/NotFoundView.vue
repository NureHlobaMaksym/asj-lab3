<script setup lang="ts">
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import { useNotFoundView } from '@/modules/not-found/composables/useNotFoundView';
import './NotFoundView.css';

const { goToHome } = useNotFoundView();
</script>

<template>
  <section class="page-shell empty-state not-found-view">
    <h1>Сторінку не знайдено</h1>
    <BaseButton label="На головну" type="button" variant="secondary" :disabled="false" @click="goToHome" />
  </section>
</template>
