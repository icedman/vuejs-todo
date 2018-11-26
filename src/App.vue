<template lang='pug'>
  section.mt6.mw5.center.w-100
    h1.tc.f3.fw7.ttu.tracked Todos
    hr.bt.b--moon-gray
    div.mb5
      template(v-for='(todo, i) in todos' v-if='todo.status !== "archived"')
        div.mb1.bb.bw1
          div.f4.todo(:class='todo.marked?"strike":null' @click='toggleTodo(todo)')
            i.fa.fa-times(@click='archiveTodo(todo)')
            span {{todo.title}}

      input.bw1.mt2(v-model='newItem' @keyup.13='addTodo()')

    template(v-if="todos.filter((todo) => todo.status === 'archived').length")
      h1.tc.f5.fw5.ttu.tracked Archived Todos
      hr.bt.b--moon-gray
      div.mb5
        template(v-for='(todo, i) in todos' v-if='todo.status === "archived"')
          div.mb1.bb.bw1
            div.f4.todo(:class='todo.marked?"strike":null' @click='toggleTodo(todo)')
              i.fa.fa-times(@click='removeTodo(todo)')
              span {{todo.title}}
</template>

<script>
import {mapState} from 'vuex'

export default {
  components: {},
  data: () => ({
    newItem: ''
  }),
  computed: {
    ...mapState(['todos'])
  },
  methods: {
    addTodo () {
      if (this.newItem === '') {
        return
      }
      this.$store.commit('ADD_TODO', { id: this.$store.getters['NEW_ID'], title: this.newItem, complete: false, status: '' })
      this.newItem = ''
    },

    toggleTodo (todo) {
      this.$store.commit('TOGGLE_TODO', { id: todo.id })
    },

    archiveTodo (todo) {
      this.$store.commit('ARCHIVE_TODO', { id: todo.id })
    },

    removeTodo (todo) {
      this.$store.commit('REMOVE_TODO', { id: todo.id })
    }
  }
}
</script>
<style lang="stylus">
.todo {
  min-width: 200px;
  padding: 8px;
}
.fa-times {
  float: right;
  padding: 4px;
  color: #c0c0c0;
}
input {
  min-width: 230px;
  padding: 8px;
  border: 2px solid #c0c0c0;
}
</style>
