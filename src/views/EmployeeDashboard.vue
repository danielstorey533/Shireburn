<template>
  <div>
    <h2>Employees</h2>
    <DataTable
  :value="employees"
  :paginator="true"
  :rows="10"
  :totalRecords="totalRecords"
  @page="onLazyLoad"
>
  <Column field="fullName" header="Name" sortable filter />
  <Column field="occupation" header="Occupation" sortable filter />
  <Column field="department" header="Department" sortable filter />
  <Column field="employmentStatus" header="Employment Status">
  <template #body="{ data }">
    {{ renderEmploymentStatus(data) }}
  </template>
</Column>
<Column field="terminationStatus" header="Termination Status">
  <template #body="{ data }">
    {{ renderTerminationStatus(data) }}
  </template>
</Column>
  <Column header="Actions" :body="renderActions" />
</DataTable>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useEmployeeStore } from '@/stores/employeeStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const store = useEmployeeStore();

onMounted(() => {
  store.loadEmployees();
});

const employees = computed(() => store.paginatedEmployees);
const currentPage = computed(() => store.currentPage);
const pageSize = computed(() => store.pageSize);
const totalRecords = computed(() => store.totalEmployees);
const today = new Date();

const hasNextPage = computed(() => {
  return store.currentPage * store.pageSize < store.totalEmployees;
});

const onLazyLoad = (event: any) => {
  store.setPage(event.page + 1);
  store.setPageSize(event.rows);
};

//Function to check if employee is currently employed.
const renderEmploymentStatus = (rowData: any) => {
  const employmentDate = new Date(rowData.employmentDate);

  return employmentDate > today ? 'employed soon' : 'currently employed';
};


//Function to check if employee has been terminated.
const renderTerminationStatus = (rowData: any) => {
  if (!rowData.terminationDate) return 'N/A';

  const terminationDate = new Date(rowData.terminationDate);

  return terminationDate > today ? 'to be terminated' : 'terminated';
};



</script>
