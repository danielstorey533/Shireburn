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
    <div class="flex justify-end mt-4">
      <Button
        label="Create Employee"
        icon="pi pi-plus"
        class="p-button-success"
        @click="onCreate"
      />
  </div>

    <EmployeeModal
  :visible="showModal"
  :employee="selectedEmployee"
  :isEditMode="isEditMode"
  @close="onModalClose"
  @save="onModalSave"
/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useEmployeeStore } from '@/stores/employeeStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref } from 'vue';

import EmployeeModal from '@/components/EmployeeModal.vue';

const selectedEmployee = ref<any | null>(null);
const showModal = ref(false);
const isEditMode = ref(false);
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
const onView = (rowData: any) => {
  selectedEmployee.value = rowData;
  isEditMode.value = false;
  showModal.value = true;
};

const onEdit = (rowData: any) => {
  selectedEmployee.value = rowData;
  isEditMode.value = true;
  showModal.value = true;
};

const onCreate = () => {
  selectedEmployee.value = {
    id: -1,
    fullName: '',
    code: '',
    occupation: '',
    department: '',
    employmentDate: null,
    terminationDate: null
  };
  isEditMode.value = false;
  showModal.value = true;
};

const onModalClose = () => {
  showModal.value = false;
  selectedEmployee.value = null;
};

//Either update existing employee or add new employee and then close modal. Data table should (hopefully)
//Automatically update with the new employee store.
const onModalSave = (updatedEmployee: any) => {
  if (isEditMode.value) {
    store.updateEmployee(updatedEmployee);
  } else {
    store.addEmployee(updatedEmployee);
  }

  showModal.value = false;
};

const onDelete = (employee: any) => {
  store.deleteEmployee(employee.id);
};

//Function to check if employee is currently employed.
const renderEmploymentStatus = (rowData: any) => {
  const employmentDate = new Date(rowData.employmentDate);
  return employmentDate > today ? 'Employed soon' : 'Currently employed';
};


//Function to check if employee has been terminated.
const renderTerminationStatus = (rowData: any) => {
  if (!rowData.terminationDate) return 'N/A';
  const terminationDate = new Date(rowData.terminationDate);
  return terminationDate > today ? 'To be terminated' : 'Terminated';
};

</script>
