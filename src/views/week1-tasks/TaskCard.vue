<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Props and Emits
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

// Define events to communicate user actions back up to the parent/store container
const emit = defineEmits(['complete', 'delete', 'update', 'update-priority'])
const router = useRouter()

// Local UI State Management
const isEditing = ref(false) // Toggles inline form fields layout visibility
const editName = ref('')     // Local buffer variable for updating task name text
const editDate = ref('')     // Local buffer variable for updating deadline date string

// Pre-fills form fields local state variables with current active data properties
function startEdit() {
  editName.value = props.task.name
  // Clean fallback mapping check if no explicit date timestamp exists
  editDate.value = props.task.dueDate === '-' ? '' : props.task.dueDate
  isEditing.value = true
}

// Dispatches validation text checks and fires changes back up to the store component
function saveEdit() {
  if (editName.value.trim()) {
    // Notify store to patch mutated task text parameters
    emit('update', props.task.id, editName.value.trim())
    
    // Direct assignment check fallback safely processing reactive dates if present
    if (props.task.dueDate !== undefined) {
      props.task.dueDate = editDate.value || '-'
    }
  }
  isEditing.value = false
}

// Drops changes and restores layout mode back to static display grid row element
function cancelEdit() {
  isEditing.value = false
}

// Safe routing guard transition preventing unexpected route pushes while user types data
function navigateToDetails() {
  if (isEditing.value) return
  router.push(`/task/${props.task.id}`)
}
</script>

<template>
  <div class="task-card" :class="{ completed: props.task.done }">
    <div class="task-container">
      
      <input 
        type="checkbox" 
        :checked="props.task.done"
        @change="emit('complete', props.task.id)"
        class="task-checkbox"
      />

      <div class="task-content-wrapper">
        
        <div class="task-main-row">
          <div class="task-title-area">
            
            <div v-if="isEditing" class="edit-row">
              <input
                v-model="editName"
                @keyup.enter="saveEdit"
                @keyup.escape="cancelEdit"
                class="edit-input"
                placeholder="Edit task name..."
                autofocus
              />
              
              <input v-model="editDate" type="date" class="edit-date-input"/>

              <select 
                :value="props.task.priority" 
                class="priority-select inline-select edit-priority-select"
                @change="emit('update-priority', props.task.id, $event.target.value)"
              >
                <option disabled value="">Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <button @click="saveEdit" class="btn-save" title="Save changes">✓</button>
              <button @click="cancelEdit" class="btn-cancel" title="Discard updates">✕</button>
            </div>
            
            <div v-else class="name-wrapper">
              <span 
                class="task-name task-text" 
                :class="{ done: props.task.done }"
                @click="navigateToDetails"
                title="Click to view details"
              >
                {{ props.task.name }}
              </span>
              
              <span
                v-if="props.task.priority"
                class="priority"
                :class="props.task.priority.toLowerCase()"
              >
                {{ props.task.priority }}
              </span>
            </div>
          </div>

          <div class="task-actions">
            <template v-if="!isEditing">
              <button @click="navigateToDetails" class="btn-details">
                Details →
              </button>

              <button @click.stop="startEdit" class="btn-edit-icon" title="Edit Task Name">
                <font-awesome-icon icon="fa-solid fa-pen" />
              </button>

              <button @click="emit('delete', props.task.id)" class="remove-button" title="Delete Task">
                X
              </button>
            </template>
          </div>
        </div>

        <div class="task-sub-row" v-if="!isEditing">
          <div class="meta meta-slot">
            <slot name="meta" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: var(--color-background);
  border: 1px solid #2e4060;
  border-radius: 8px;
  padding: 12px 14px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
  color: #e2e8f0;
}

.task-card:hover {
  border-color: #42B883;
  box-shadow: 0 2px 12px rgba(66, 184, 131, 0.1);
}

.task-card.completed {
  background: #162d22;
  border-color: #42B883;
  opacity: 0.75;
}

.task-container {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.task-checkbox {
  margin-top: 4px;
}

.task-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.task-main-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.task-title-area {
  flex: 1;
}

.name-wrapper {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.task-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: #e2e8f0;
  cursor: pointer;
}

.task-name:hover {
  color: var(--color-green);
  text-decoration: underline;
}

.task-card.completed .task-name {
  text-decoration: line-through;
  color: #64748b !important;
}

.meta {
  font-size: 0.7rem;
  color: #8b97a5;
  white-space: nowrap;
}

.edit-row {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  flex-wrap: wrap;
}

.edit-input {
  flex: 2;
  min-width: 130px;
  background: #0f1e30;
  border: 1px solid var(--color-green);
  border-radius: 5px;
  padding: 4px 8px;
  color: #e2e8f0;
  font-size: 0.85rem;
  outline: none;
}

.edit-date-input {
  flex: 1;
  min-width: 100px;
  background: #0f1e30;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  padding: 3px 6px;
  color: #e2e8f0;
  font-size: 0.75rem;
  outline: none;
}

.edit-date-input::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

.edit-priority-select {
  flex: 0 0 auto;
}
.task-actions {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
}

.btn-details, .btn-save, .btn-cancel {
  padding: 4px 10px;
  border: none;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-save {
  background: var(--color-green);
  color: #fff;
}

.btn-details {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  white-space: nowrap;
}

.btn-details:hover {
  border-color: var(--color-green);
  color: var(--color-green);
}

.btn-edit-icon {
  background: transparent;
  border: 1px solid var(--color-border);
  color: #94a3b8;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
}

.btn-edit-icon:hover {
  border-color: var(--color-green);
  color: var(--color-green);
}

.btn-cancel {
  background: #2e4060;
  color: #94a3b8;
}

/* Priority badge adjustments for inline display */
.priority {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  white-space: nowrap;
}

.priority.low {
  background: rgba(60, 114, 72, 0.1);
  color: var(--color-green);
}

.priority.medium {
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
}

.priority.high {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.inline-select {
  padding: 3px 20px 3px 6px;
  font-size: 0.75rem;
  height: 24px;
  border-radius: 5px;
}
</style>