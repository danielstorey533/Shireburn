<template>
  <div class="app-container">
    <TopBar />
    <div class="app-content">
      <EmployeeDashboard />
    </div>
  </div>
</template>

<script lang="ts" setup>
import EmployeeDashboard from './views/EmployeeDashboard.vue'
import TopBar from './components/TopBar.vue'
</script>

<style>
/*Vue was putting some default padding which messed up the Topbar. It might be better
practice to move this into a separate style.css file */
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.p-datatable .p-datatable-tbody > tr > td,
.p-datatable .p-datatable-thead > tr > th {
  padding: 0.25rem 0.5rem; 
  font-size: 0.85rem;
}

.p-datatable .p-datatable-thead > tr {
  height: 2rem;
}

.p-datatable .p-datatable-tbody > tr {
  height: 2.25rem;
}
</style>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-content {
  flex-grow: 1;
  padding: 1rem;
}

html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>

