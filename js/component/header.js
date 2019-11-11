Vue.component('todos-header',{
  template:`
  <header class="header">
      <h1>todos</h1>
      <input class="new-todo" @keyup.enter="add" v-model="thing" placeholder="What needs to be done?" autofocus>
    </header>
  `,
  data() {
    return {
      thing: ''
    }
  },
  methods: {
    add() {
      if (!this.thing.trim()) {
        alert('不能为空');
        return;
      }
      let temp = {
        id: +new Date(),
        thing: this.thing,
        done: false
      }
      // console.log(temp);
      this.$emit('add', temp)
      this.thing = '';
    },
  }
})