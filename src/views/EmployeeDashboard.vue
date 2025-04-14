<template>
  <div>
    <DataTable
      :value="employees"
      :paginator="true"
      :rows="10"
      :lazy='true'
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

      <Column header="Actions">
        <template #body="{ data }">
          <div class="flex gap-2">
            <button class="p-button p-button-text p-button-sm" @click="onView(data)">
              <i class="pi pi-search"></i>
            </button>
            <button class="p-button p-button-text p-button-sm" @click="onEdit(data)">
              <i class="pi pi-pencil"></i>
            </button>
            <button class="p-button p-button-text p-button-sm p-button-danger" @click="onDelete(data)">
              <i class="pi pi-times"></i>
            </button>
          </div>
        </template>
      </Column>
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

const onView = (rowData: any) => {
  console.log('View clicked for:', rowData);
};

const onEdit = (rowData: any) => {
  console.log('Edit clicked for:', rowData);
};

const onDelete = (rowData: any) => {
  console.log('Delete clicked for:', rowData);
};
</script>
