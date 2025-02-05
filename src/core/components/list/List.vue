<script setup lang="ts">
import { ref, computed } from 'vue';

export interface TableRow {
  id: number | string;
  [key: string]: string | number;
}

const props = defineProps<{
  rows: TableRow[];
}>();

// TODO: implement all row selection

const selectedRows = ref<Array<number | string>>([]);

const toggleRowSelection = (id: number | string) => {
  const index = selectedRows.value.indexOf(id);
  if (index > -1) {
    selectedRows.value.splice(index, 1);
  } else {
    selectedRows.value.push(id);
  }
};

const headers = computed(() => {
  if (props.rows.length > 0) {
    return Object.keys(props.rows[0]).filter((key) => key !== 'id');
  }
  return [];
});
</script>

<template>
  <div class="h-full w-full overflow-auto border border-gray-200">
    <table class="relative table-fixed w-full divide-y divide-gray-200">
      <thead class="sticky top-0 bg-gray-300">
        <tr class="h-16">
          <th class="px-6 py-3 text-left text-xs text-gray-500 uppercase w-16">
            <!-- Empty header for the checkbox column -->
          </th>
          <th
            v-for="header in headers"
            :key="header"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="(row, index) in rows"
          :key="row.id"
          class="h-16"
          :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
        >
          <td class="px-6 py-4 whitespace-nowrap w-16">
            <input type="checkbox" :checked="selectedRows.includes(row.id)" @change="toggleRowSelection(row.id)" />
          </td>
          <td v-for="header in headers" :key="header" class="px-6 py-4 whitespace-nowrap truncate">
            <slot :name="header" :row="row">
              {{ row[header] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
