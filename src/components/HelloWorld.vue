<template>
  <h1>{{msg}}</h1>
  <button @click="setCount">{{count}}</button>
  <input type="text" v-model="todo">
  <button class="add-todo" @click="addTodo">add</button>
  <button class="load-user" @click="loadUser">load</button>
  <p v-if="user.loading" class="loading">Loading...</p>
  <div v-else class="user-name">{{user.data && user.data.username}}</div>
  <p v-if="user.error" class="error">error!</p>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">{{todo}}</li>
  </ul>
  <hello :msg="'123'"></hello>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue"
import axios from 'axios'
import Hello from './Hello.vue'
export default defineComponent({
  name: "HelloWorld",
  components: {
    Hello
  },
  props: {
    msg: String
  },
  emits: ['send'],
  setup(props, context) {
    const count = ref(1)
    const todo = ref('')
    const todos = ref([])
    const user = reactive({
      data: null as any,
      loading: false,
      error: false
    })
    const setCount = () => {
      count.value++
    }
    const addTodo = () => {
      if(todo.value) {
        todos.value.push(todo.value)
        context.emit('send', todo.value)
      }
    }
    const loadUser = () => {
      user.loading = true
      axios.get('https://jsonplaceholder.typicode.com/users/1').then(resp => {
        console.log(resp)
        user.data = resp.data
      }).catch(() => {
        user.error = true
      }).finally(() => {
        user.loading = false
      })
    }
    return {
      count,
      setCount,
      todo,
      addTodo,
      todos,
      user,
      loadUser
    }
  },
});
</script>

<style scoped>

</style>