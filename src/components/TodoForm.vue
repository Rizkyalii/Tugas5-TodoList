<template>
  <form @submit.prevent="submit" class="form">
    <input v-model="title" placeholder="Tugas baru..." required />
    <button type="submit">➕ Tambah</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../store/todo'

const title = ref('')
const todo = useTodoStore()

const submit = async () => {
  if (title.value.trim()) {
    await todo.tambahTodo(title.value)
    title.value = ''
  }
}
</script>

<style scoped>
.form {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 8px;
  font-size: 1em;
}
button {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #1e8449;
}
</style>
