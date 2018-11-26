import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function persistState (name, items) {
  window.localStorage.setItem(`persist-${name}`, JSON.stringify(items))
}

function loadState (name, items) {
  var cached = window.localStorage.getItem(`persist-${name}`)
  if (cached) {
    return JSON.parse(cached)
  }
  return items
}

export default new Vuex.Store({
  state: {
    todos: loadState('todos', [
      {
        id: 0,
        title: 'One',
        complete: false,
        status: '',
        marked: false
      }
    ])
  },

  getters: {
    NEW_ID (state) {
      var idx = 0
      while (idx < 9999) {
        if (state.todos.find(t => t.id === idx)) {
          idx++
          continue
        }
        break
      }
      return idx
    }
  },

  mutations: {
    ADD_TODO (state, todo) {
      todo.status = todo.status || ''
      todo.marked = todo.marked || false
      state.todos = [...state.todos, todo]
      persistState('todos', state.todos)
    },

    TOGGLE_TODO (state, todo) {
      var f = state.todos.find(t => t.id === todo.id)
      if (f) {
        f.marked = !f.marked
        persistState('todos', state.todos)
      }
    },

    ARCHIVE_TODO (state, todo) {
      var f = state.todos.find(t => t.id === todo.id)
      if (f) {
        f.status = 'archived'
        persistState('todos', state.todos)
      }
    },

    REMOVE_TODO (state, todo) {
      var f = state.todos.find(t => t.id === todo.id)
      if (f) {
        var idx = state.todos.indexOf(f)
        state.todos.splice(idx, 1)
        persistState('todos', state.todos)
      }
    }
  },
  actions: {}
})
