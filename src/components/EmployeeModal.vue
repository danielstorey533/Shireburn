<template>
  <Dialog v-model:visible="internalVisible" :visible="visible" modal header="Employee" :closable="true" @hide="emitClose" class="employee-dialog">
    <div class="p-fluid">

      <div v-if="isViewMode" class="view-mode">
        <div class="view-field">
          <span class="view-label">Code:</span>
          <span class="view-value">{{ form.code }}</span>
        </div>
        <div class="view-field">
          <span class="view-label">Full Name:</span>
          <span class="view-value">{{ form.fullName }}</span>
        </div>
        <div class="view-field">
          <span class="view-label">Occupation:</span>
          <span class="view-value">{{ form.occupation }}</span>
        </div>
        <div class="view-field">
          <span class="view-label">Department:</span>
          <span class="view-value">{{ form.department }}</span>
        </div>

        <div class="flex justify-end mt-4">
          <Button label="Close" class="p-button-text" @click="emitClose" />
        </div>
      </div>

      <div v-else>
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
  isViewMode: boolean; //I could probably replace isViewMode with a logic check (!isEditMode && employee not null)
                       //but it would make the code less readable (in my opinion).
}>();

const emit = defineEmits(['close', 'save']);
const internalVisible = ref(props.visible);

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

//Links the Dialog x button to cancel button.
watch(() => props.visible, (val) => {
  internalVisible.value = val;
});


const emitClose = () => {
  emit('close');
};

const emitSave = () => {
  emit('save', { ...form.value });
};
</script>


<style scoped>
.employee-dialog {
  min-width: 450px;
}

.view-mode {
  padding: 0.5rem;
}

.view-field {
  display: flex;
  margin-bottom: 0.75rem;
}

.view-label {
  font-weight: bold;
  width: 120px;
}

.view-value {
  color: #333;
}
</style>