<template>
  <div class="container mx-auto px-5 py-8 max-w-sm min-screen">
    <h1 class="text-5xl mb-8">
      {{ title }}
      <span class="text-pink-600">{{ titleSpan }}</span>
    </h1>
    <div class="wrap">
      <p>{{ todo }}</p>
      <div class="flex justify-between mb-8">
        <input
          v-model="todo"
          type="text"
          placeholder="Todo..."
          @keyup.enter="addTodo(id++)"
          class="inputTodo placeholder:text-pink-600"
        />
        <button @click="addTodo(id++)" class="btn">Add ToDo</button>
      </div>
      <section class="main" v-show="todos.length">
        <TransitionGroup name="list" tag="div">
          <div
            v-for="(todo, i) in filteredTodos"
            :key="todo.id"
            :class="{ completed: todo.completed }"
          >
            <div class="flex items-center justify-between mb-4">
              <div class>
                <span class="text-pink-600 font-bold">{{ i + 1 }}.</span>
                <span
                  class="text-sm"
                  :class="{ linethrough: todo.isComplete }"
                  for="isComplete"
                  @dblclick="removeTodo(i)"
                  >{{ todo.text }}</span
                >
                <input
                  v-model="todo.isComplete"
                  id="isComplete"
                  type="checkbox"
                  class="mx-2 text-green-600 border-0 rounded-md focus:ring-0"
                />
              </div>
              <button @click="removeTodo(i)" class="btn" aria-label="Trash">
                <span class="text-white"><IconTrash/></span>
              </button>
            </div>
          </div>
        </TransitionGroup>

        <hr />
        <div class>
          <p>Task list {{ todos.length }}</p>
          <p>Tasks not completed {{ remaining }}</p>
        </div>
      </section>
      <!-- <button @click="todo.isComplete" class="bg-pink-600 px-2 py-1 text-white">Выполнено</button>
      <a href="#/isComplete" :class="{ linethrough: todo.isComplete === 'isComplete' }">Completed</a>
      <ul class="filters">
        <li>
          <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
        </li>
        <li>
          <a href="#/active" :class="{ selected: visibility === 'active' }">Active</a>
        </li>
        <li>
          <a href="#/completed" :class="{ selected: visibility === 'isComplete' }">Completed</a>
        </li>
            </ul>-->
    </div>
  </div>
</template>

<script>
import IconTrash from "./icons/IconTrash.vue";
const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.isComplete),
  isComplete: (todos) => todos.filter((todo) => todo.isComplete),
};
export default {
  components: {
    IconTrash,
  },
  data() {
    return {
      title: "I`m off",
      titleSpan: "ToDo",
      todo: "",
      todos: [],
      isDone: false,
      id: 0,
      visibility: "all",
    };
  },

  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler(todos) {
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
      deep: true,
    },
  },

  async mounted() {
    const data = await localStorage.getItem("todos");
    data ? (this.todos = JSON.parse(data)) : null;
  },

  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return filters.active(this.todos).length;
    },
  },

  methods: {
    toggleAll(e) {
      this.todos.forEach((todo) => (todo.completed = e.target.checked));
    },
    addTodo(e) {
      if (this.todo != "") {
        this.todos.push({
          id: this.id,
          text: this.todo,
          isComplete: this.isDone,
        });

        localStorage.setItem("todos", JSON.stringify(this.todos));
      }
      this.todo = "";
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    removeCompleted() {
      this.todos = filters.active(this.todos);
    },
    onHashChange() {
      var visibility = window.location.hash.replace(/#\/?/, "");
      if (filters[visibility]) {
        this.visibility = visibility;
      } else {
        window.location.hash = "";
        this.visibility = "all";
      }
    },
  },
};
</script>

<style scoped>
.linethrough {
  text-decoration-line: line-through;
  text-decoration-color: #db2777;
  color: #acacac;
}

.min-screen {
  min-height: 80vh;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
