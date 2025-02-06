<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  value: string;
  placeholder?: string;
}>();

const emits = defineEmits(['update:value']);

const updateValue = (event: Event) => {
  emits('update:value', (event.target as HTMLInputElement).value);
};

const clearValue = () => {
  emits('update:value', '');
};
</script>

<template>
  <div class="w-full">
    <div class="relative flex items-center h-12 rounded-4xl bg-white overflow-hidden border border-gray-200">
      <div class="grid place-items-center h-full w-14 text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        data-test="search-input"
        class="h-full w-full outline-none pr-2"
        type="text"
        id="search-input"
        :value="value"
        @input="updateValue"
        :placeholder="placeholder"
      />

      <button
        v-if="value"
        @click="clearValue"
        data-test="clear-button"
        class="absolute right-0 h-full w-14 flex items-center justify-center text-gray-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>
