<!--
=============================================================
  DAY 2 ASSIGNMENT — Reusable TaskCard Component
  Topic: Props, Emits, Slots, Component Lifecycle
  Files: TaskCard.vue (child)  +  TaskListView.vue (parent)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reusable TaskCard child component that accepts data as props
and communicates back to the parent via custom events (emits). The
parent renders a list of TaskCards and handles all state changes.

WHAT TO BUILD — TaskCard.vue (this file)
-----------------------------------------
  1. Accept a "task" prop: { id, name, done, dueDate }
  2. Display the task name and dueDate (via a named slot "meta")
  3. Emit "complete" event (payload: task.id) when Complete/Undo clicked
  4. Emit "delete" event (payload: task.id) when Delete clicked
  5. Show "Complete" when task.done is false, "Undo" when true
  6. Apply a visual style change when task.done is true

WHAT TO BUILD — TaskListView.vue (see that file)
-------------------------------------------------
  1. Hold a tasks ref array with at least 3 sample tasks
  2. Render a TaskCard for each task using v-for
  3. Handle @complete → toggle that task's done property
  4. Handle @delete → remove that task from the array
  5. Fill the "meta" named slot with the due date

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] TaskCard uses defineProps({ task: Object })
  [x] TaskCard uses defineEmits(['complete', 'delete'])
  [x] TaskCard has <slot name="meta" /> for optional metadata
  [x] Parent passes :task="task" and listens @complete @delete
  [x] Parent fills the slot with <template #meta>...</template>
  [x] Data flows DOWN (props) and events flow UP (emits)
  [x] Parent owns the state — TaskCard never mutates props directly

EXTENSION (if you finish early)
---------------------------------
  - Add a priority badge prop (low/medium/high) with colour coding
  - Add an edit mode: clicking the task name turns it into an input
  - Emit an "update" event when the edited name is saved

HINTS (read only if stuck)
---------------------------
  Hint 1: const props = defineProps({ task: { type: Object, required: true } })
  Hint 2: const emit = defineEmits(['complete', 'delete'])
  Hint 3: @click="emit('complete', props.task.id)"
  Hint 4: In the parent — @complete="handleComplete"
           function handleComplete(id) { find task by id, toggle done }
  Hint 5: Named slot in child  → <slot name="meta" />
           Fill in parent      → <template #meta>Due: {{ task.dueDate }}</template>
  Hint 6: NEVER do this inside TaskCard: props.task.done = !props.task.done
           That mutates a prop directly — Vue will warn you. Emit instead.
=============================================================
-->

<!-- ─── TaskCard.vue ─── -->
<script setup>
// TODO 1: import defineProps and defineEmits (they are compiler macros — no import needed
//          but you DO need to call them)
import { ref, defineProps, defineEmits } from 'vue'

// Created ref and computed for task priority filter extension
// TODO 2: Define the task prop with type Object, required: true
// const props = defineProps({ ... })
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

// TODO 3: Define emits for 'complete' and 'delete'
// const emit = defineEmits([...])
const emit = defineEmits(['complete', 'delete', 'update', 'update-priority'])

// Edit state and Edit name
const isEditing = ref(false)
const editName = ref('')

function startEdit() {
  editName.value = props.task.name
  isEditing.value = true
}

function saveEdit() {
  if (editName.value.trim()) {
    emit('update', props.task.id, editName.value.trim())
  }
  isEditing.value = false
}

function cancelEdit() {
  isEditing.value = false
}

const priorityClass = {
  Low: 'priority-low',
  Medium: 'priority-medium',
  High: 'priority-high'
}

</script>

<template>
  <!-- TODO 4: Wrap everything in a div with class "task-card"
               Add :class="{ completed: task.done }" to the wrapper div -->
  <div class="task-card" :class="{ completed: props.task.done }">

    <div class="task-header">
      <!-- TODO 5: Display the task name -->
      <!-- Input for new task name with v-model and @keyup.enter to trigger addTask -->
      <div v-if="isEditing" class="edit-row">
        <input
          v-model="editName"
          @keyup.enter="saveEdit"
          @keyup.escape="cancelEdit"
          class="edit-input"
          placeholder="Edit task name..."
          autofocus
        />
        <button @click="saveEdit" class="btn-save">✓</button>
        <button @click="cancelEdit" class="btn-cancel">✕</button>
      </div>
      
      <div v-else class="name-row">
        <span 
          class="task-name task-text" 
          :class="{ done: props.task.done }"
          @click="startEdit"
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
      <!-- TODO 6: Add the named slot for metadata -->
      <!-- <slot name="meta" /> -->
      <div class="meta meta-slot">
        <slot name="meta" />
      </div>
    </div>

    <div class="task-actions">
      <!-- TODO 7: Add Complete/Undo button — text changes based on task.done -->
      <!--         @click should emit 'complete' with task.id as payload -->

      <button @click="emit('complete', props.task.id)" class="btn-complete task-checkbox-btn">
        {{ props.task.done ? 'Undo' : 'Complete' }}
      </button>

      <button v-if="!isEditing" @click="startEdit" class="btn-edit">
        Edit
      </button>
      <button v-else disabled style="opacity: 0; width: 0; padding: 0;"></button>
      
      <button @click="emit('delete', props.task.id)" class="btn-delete remove-button-alt">
        Delete
      </button>

      <!-- Select dropdown for task priority -->
      <select 
        :value="props.task.priority" 
        class="priority-select inline-select"
        @change="emit('update-priority', props.task.id, $event.target.value)"
      >
        <option disabled value="">Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: var(--color-background);
  border: 1px solid #2e4060;
  border-radius: 12px;
  padding: 16px 18px;
  margin-bottom: 12px;
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

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
}

.task-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: #e2e8f0;
}

.task-name--done {
  text-decoration: line-through;
  color: #64748b;
}
.meta {
  font-size: 0.78rem;
  color: #64748b;
  white-space: nowrap;
}

.edit-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.edit-input {
  flex: 1;
  background: #0f1e30;
  border: 1px solid var(--color-green);
  border-radius: 6px;
  padding: 5px 10px;
  color: #e2e8f0;
  font-size: 0.9rem;
  outline: none;
}

.task-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-complete, .btn-edit, .btn-delete, .btn-save, .btn-cancel {
  padding: 5px 14px;
  border: none;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.btn-complete, .btn-edit, .btn-save {
  background: var(--color-green);
  color: #fff;
}

.btn-delete {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
}

.btn-cancel {
  background: #2e4060;
  color: #94a3b8;
}

.btn-complete:hover, .btn-edit:hover, .btn-save:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.28);
  transform: translateY(-1px);
}

.btn-cancel:hover {
  background: #3a4f6a;
}
</style>