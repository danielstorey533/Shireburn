import { defineStore } from 'pinia'
import employeeData from '@/assets/employees.json'

export interface Employee {
  id: number;
  fullName: string;
  code: string;
  occupation: string;
  department: string;
  employmentDate: string;
  terminationDate: string | null;
}


//This is my mock for the employee database. Important to note: this won't be persistent if the application is restarted. That is,
//we won't be making literal alterations to the Employees.json, so if an employee is deleted, it will come back if application
// is restarted. In an actual application, this would be reading/updating/creating/deleting to a database table, but as this is
//front-end only I'm just going to mock it.
export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [] as Employee[],
    totalEmployees: 0,
    pageSize: 10,
    currentPage: 1,
  }),
  getters: {
    paginatedEmployees(state): Employee[] {
      const start = (state.currentPage - 1) * state.pageSize;
      return state.employees.slice(start, start + state.pageSize);
    }
  },
  actions: {
    loadEmployees() {
      this.employees = employeeData;
      this.totalEmployees = employeeData.length;
    },
    addEmployee(newEmployee: Employee) {
      //I'm calculating MaxId to prevent any duplicate employee ID's in the store.
      //In an actual application, database software (SQL probably) would handle this 
      //automatically with auto-incrementation.
      const maxId = this.employees.reduce((max, e) => Math.max(max, e.id), 0);
      newEmployee.id = maxId + 1;
      this.employees.push({ ...newEmployee });
      this.totalEmployees = this.employees.length;
    },    
    updateEmployee(updated) {
      const index = this.employees.findIndex(e => e.id === updated.id);
      if (index !== -1) {
        this.employees[index] = { ...updated };
      }
    },
    deleteEmployee(id: number) {
      this.employees = this.employees.filter(e => e.id !== id);
      this.totalEmployees = this.employees.length;
    },
    setPage(page: number) {
      this.currentPage = page;
    },
    setPageSize(size: number) {
      this.pageSize = size;
    }
  }
});
