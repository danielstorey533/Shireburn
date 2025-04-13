<template>
  <div>
    <h2>Employees</h2>
    <ul>
      <li v-for="employee in employees" :key="employee.fullName">
        {{ employee.fullName }} - {{ employee.occupation }} - {{ employee.department }}
      </li>
    </ul>
    <div>
      Page: {{ currentPage }}
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="!hasNextPage">Next</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useEmployeeStore } from '@/stores/employeeStore';

const store = useEmployeeStore();

onMounted(() => {
  store.loadEmployees();
});

const employees = computed(() => store.paginatedEmployees);
const currentPage = computed(() => store.currentPage);
const hasNextPage = computed(() => {
  return store.currentPage * store.pageSize < store.totalEmployees;
});

const nextPage = () => {
  if (hasNextPage.value) store.setPage(store.currentPage + 1);
};

const prevPage = () => {
  if (store.currentPage > 1) store.setPage(store.currentPage - 1);
};
</script>
