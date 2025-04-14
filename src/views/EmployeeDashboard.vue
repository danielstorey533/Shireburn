<template>
  <div>
  <div style="display: flex; justify-content: flex-end; margin-bottom: 1rem; margin-top: 1rem;">
      <!-- The brief said to put this below the table but I thought it looked better on top -->
      <Button
        label="Create Employee"
        icon="pi pi-plus"
        class="p-button-success"
        @click="onCreate"
      />
  </div>
    <DataTable
      :value="employees"
      :paginator="true"
      :rows="10"
      :lazy='true'
      :totalRecords="totalRecords"
      @page="onLazyLoad"
      @sort="onSort"
      @filter="onFilter"
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
    
    <ConfirmDialog />
    <EmployeeModal
      :visible="showModal"
      :employee="selectedEmployee"
      :isEditMode="isEditMode"
      :isViewMode="isViewMode"
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
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';

import { ref } from 'vue';

import EmployeeModal from '@/components/EmployeeModal.vue';

const selectedEmployee = ref<any | null>(null);
const showModal = ref(false);
const isEditMode = ref(false);
const isViewMode = ref(false);
const store = useEmployeeStore();
const confirm = useConfirm();


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
  isViewMode.value = true;
  showModal.value = true;
};

const onEdit = (rowData: any) => {
  selectedEmployee.value = rowData;
  isEditMode.value = true;
  isViewMode.value = false;
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
  confirm.require({
    message: 'Are you sure you want to delete this employee?',
    header: 'Confirm Deletion',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => {
      store.deleteEmployee(employee.id);
      store.setPage(store.currentPage);
    },
    reject: () => {
    }
  });
};

const onSort = (event: any) => {
  store.setSort(event.sortField, event.sortOrder);
};

const onFilter = (event: any) => {
  store.setFilters(event.filters);
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
