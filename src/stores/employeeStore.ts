import { defineStore } from 'pinia'
import employeeData from '@/assets/employees.json'

export interface Employee {
  fullName: string;
  occupation: string;
  department: string;
  employmentDate: string;      // ISO string
  terminationDate: string | null;
}

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
    setPage(page: number) {
      this.currentPage = page;
    },
    setPageSize(size: number) {
      this.pageSize = size;
    }
  }
});
