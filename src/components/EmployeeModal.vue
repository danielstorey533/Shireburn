<template>
  <Dialog :visible="visible" modal header="Employee" :closable="true" @hide="emitClose">
    <div class="p-fluid">
      <div class="field">
        <label for="code">Code</label>
        <InputText id="code" v-model="form.code" />
      </div>
      <div class="field">
        <label for="fullName">Full Name</label>
        <InputText id="fullName" v-model="form.fullName" />
      </div>
      <div class="field">
        <label for="occupation">Occupation</label>
        <InputText id="occupation" v-model="form.occupation" />
      </div>
      <div class="field">
        <label for="department">Department</label>
        <InputText id="department" v-model="form.department" />
      </div>

      <div class="flex justify-end mt-4">
        <Button label="Cancel" class="p-button-text" @click="emitClose" />
        <Button :label="isEditMode ? 'Save' : 'Create'" @click="emitSave" />
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const props = defineProps<{
  visible: boolean;
  employee?: any;
  isEditMode: boolean;
}>();

const emit = defineEmits(['close', 'save']);

const form = ref({
  id: null,
  code: '',
  fullName: '',
  occupation: '',
  department: '',
});

//Populating the form with employee details if modal is clicked in edit mode.
watch(
  () => props.employee,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal };
    } else {
      form.value = {
        id: null,
        code: '',
        fullName: '',
        occupation: '',
        department: '',
      };
    }
  },
  { immediate: true }
);

const emitClose = () => {
  emit('close');
};

const emitSave = () => {
  emit('save', { ...form.value });
};
</script>
