<script setup lang="ts">
import LanguageSwitcher from './components/LanguageSwitcher.vue';

</script>

<template>
  <div class="container">
    <h1>{{ $t('message.hello') }}</h1>
    <h1>{{ $t('message.bye') }}</h1>
    <LanguageSwitcher />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
