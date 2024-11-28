<template>
    <div>
      <h2 class="text-5xl mb-8">
        <span class="text-dark-500">{{ title }}</span>
        <span class="text-pink-600">{{ titleSpan }}</span>
      </h2>
      <div class="wrap">
        <p>{{ todo }}</p>
        <div class="flex justify-between mb-8">
          <input v-model="todo" type="text" placeholder="Todo..." @keyup.enter="addTodo(id++)"
            class="inputTodo placeholder:text-pink-600 focus:ring focus:ring-pink-200 focus:border-pink-500" />
          <button @click="addTodo(id++)" class="btn">Add ToDo</button>
        </div>
        <section class="main" v-show="todos.length">
          <TransitionGroup name="list" tag="div">
            <div v-for="(todo, i) in filteredTodos" :key="todo.id" :class="{ completed: todo.completed }">
              <div class="flex items-center justify-between mb-4">
                <div class="text-gray-600">
                  <span class="text-pink-600 font-bold">{{ i + 1 }}.</span>
                  <label class="text-2xl md:text-sm" :class="{ linethrough: todo.isComplete }"
                    @dblclick="removeTodo(i)">{{ todo.text }}
                    <input v-model="todo.isComplete" type="checkbox"
                      class="mx-2 text-green-600 border-0 rounded-md focus:ring-0 checkbox" />
                  </label>
                </div>
                <button @click="removeTodo(i)" class="btn" aria-label="Trash">
                  <span class="text-white">
                    <IconTrash />
                  </span>
                </button>
              </div>
            </div>
          </TransitionGroup>

          <hr />
          <div class="text-gray-600">
            <p>Task list {{ todos.length }}</p>
            <p>Tasks not completed {{ remaining }}</p>
          </div>
        </section>
      </div>
      <Transition name="list" tag="div">
        <div v-if="todos.length === 0" class="text-gray-600 text-lg">
          <p class="py-2">This amazing web application will help you quickly checklist your to-dos or purchases on your
            smartphone or
            computer. The application runs on PWA technology and can be installed locally as a web application on a
            smartphone or computer.
          </p>
          <p class="py-2">
            To compile the list and the application does not require an Internet connection and
            cloud databases. The application saves all information in the Local Storage.
          </p>
          <p class="text-pink-600 ">
            Use to your heart's content!<br /> PoliWeb is for you!
          </p>
        </div>
      </Transition>
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

<style>
.linethrough {
  text-decoration-line: line-through;
  text-decoration-color: #db2777;
  color: #acacac;
}

.checkbox {
  accent-color: #db2777;
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
