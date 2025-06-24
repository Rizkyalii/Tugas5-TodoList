import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loading: false
  }),
  getters: {
    total: (state) => state.todos.length,
    selesai: (state) => state.todos.filter(t => t.completed).length
  },
  actions: {
    async fetchTodos() {
      this.loading = true
      try {
        const res = await axios.get('http://localhost:3000/todos')
        this.todos = res.data
      } catch (error) {
        console.error('Fetch todos gagal:', error)
      } finally {
        this.loading = false
      }
    },
    async tambahTodo(title) {
      try {
        const res = await axios.post('http://localhost:3000/todos', {
          title,
          completed: false
        })
        this.todos.unshift(res.data)
      } catch (error) {
        console.error('Tambah todo gagal:', error)
      }
    },
    async hapusTodo(id) {
      try {
        await axios.delete(`http://localhost:3000/todos/${id}`)
        this.todos = this.todos.filter(t => t.id !== id)
      } catch (error) {
        console.error('Hapus todo gagal:', error)
      }
    },
    async editTodo(id, updatedData) {
      try {
        const res = await axios.put(`http://localhost:3000/todos/${id}`, updatedData)
        const index = this.todos.findIndex(t => t.id === id)
        if (index !== -1) this.todos[index] = res.data
      } catch (error) {
        console.error('Edit todo gagal:', error)
      }
    }
  }
})
