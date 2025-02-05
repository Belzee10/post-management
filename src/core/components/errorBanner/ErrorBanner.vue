<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <div class="border border-red-500 text-red-500 px-10 py-2 rounded-sm">
    <p class="text-lg">An error has occurred: {{ message }}</p>
  </div>
</template>
