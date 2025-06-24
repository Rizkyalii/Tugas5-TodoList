<template>
  <div class="container">
    <h2>Todo List</h2>
    <TodoForm />

    <ul class="todo-list">
      <li v-for="item in todo.todos" :key="item.id" class="todo-item">
        <input
          type="checkbox"
          :checked="item.completed"
          @change="toggle(item)"
          class="checkbox"
          id="chk-{{item.id}}"
        />
        <label
          :for="'chk-' + item.id"
          :class="{ selesai: item.completed }"
          class="title"
        >
          <template v-if="editId === item.id">
            <input v-model="editTitle" class="edit-input" />
          </template>
          <template v-else>
            {{ item.title }}
          </template>
        </label>

        <div class="buttons">
          <template v-if="editId === item.id">
            <button @click="saveEdit(item)" class="btn btn-save">💾 Save</button>
            <button @click="cancelEdit" class="btn btn-cancel">✖ Cancel</button>
          </template>
          <template v-else>
            <button @click="startEdit(item)" class="btn btn-edit">🪛 Edit</button>
          </template>
          <button @click="hapus(item.id)" class="btn btn-delete">🗑️</button>
        </div>
      </li>
    </ul>

    <p class="summary">Total: {{ todo.total }} | Selesai: {{ todo.selesai }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '../store/todo'
import TodoForm from '../components/TodoForm.vue'

const todo = useTodoStore()

const editId = ref(null)
const editTitle = ref('')

const startEdit = (item) => {
  editId.value = item.id
  editTitle.value = item.title
}

const cancelEdit = () => {
  editId.value = null
  editTitle.value = ''
}

const saveEdit = (item) => {
  if (editTitle.value.trim() === '') {
    alert('Judul tidak boleh kosong')
    return
  }
  todo.editTodo(item.id, {
    title: editTitle.value,
    completed: item.completed,
  })
  editId.value = null
  editTitle.value = ''
}

const hapus = (id) => todo.hapusTodo(id)

const toggle = (item) => {
  todo.editTodo(item.id, {
    title: item.title,
    completed: !item.completed,
  })
}

onMounted(() => {
  todo.fetchTodos()
})
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 30px auto;
  background: #ffffff;
  padding: 25px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  color: #34495e;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  gap: 10px;
}

.checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #27ae60;
}

.title {
  flex: 1;
  font-size: 1.1em;
  color: #2c3e50;
  user-select: none;
  cursor: pointer;
}

.selesai {
  text-decoration: line-through;
  color: #95a5a6;
}

.edit-input {
  width: 100%;
  font-size: 1.1em;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.buttons {
  display: flex;
  gap: 6px;
}

.btn {
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
  user-select: none;
}

.btn-edit {
  background-color: #2980b9;
  color: white;
}

.btn-edit:hover {
  background-color: #1f6391;
}

.btn-save {
  background-color: #27ae60;
  color: white;
}

.btn-save:hover {
  background-color: #1f7a44;
}

.btn-cancel {
  background-color: #7f8c8d;
  color: white;
}

.btn-cancel:hover {
  background-color: #616f71;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background-color: #c0392b;
}

.summary {
  margin-top: 20px;
  font-weight: 600;
  color: #34495e;
  text-align: center;
}
</style>
