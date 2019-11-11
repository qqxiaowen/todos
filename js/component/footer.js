Vue.component('todos-footer',{
  template:`
  <footer class="footer" >
  <span class="todo-count"><slot name="count"> </slot><strong>{{itemCount}}</strong></span>
  <ul class="filters">
    <li>
      <router-link to="/">All</router-link>
    </li>
    <li>
      <router-link to="/active">Active</router-link>
    </li>
    <li>
      <router-link to="/completed">Completed</router-link>
    </li>
  </ul>
  <!-- Hidden if no completed items are left ↓ -->
  <button class="clear-completed" v-show="isClear" @click="clear"><slot name="clear"></slot></button>
</footer>
  `,
  props:['list'],
  methods: {
    clear() {
      let con = confirm('是否清空？');
      if (con) {
        this.$emit('clear');
      }
    }
  },
  computed: {
    itemCount() {
      return this.list.filter(item => !item.done).length;
    },
    isClear() {
      return this.list.some(item => item.done)
    }
  }
})