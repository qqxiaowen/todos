Vue.component('todos-main',{
  template:`
  <section class="main">
  <input id="toggle-all" class="toggle-all" type="checkbox" v-model="checkAll">
  <label for="toggle-all">Mark all as complete</label>
  <ul class="todo-list">

    <li v-for="item in list" :key="item.id" :class="{completed:item.done,editing:currentId === item.id}">
      <div class="view">
        <input class="toggle" type="checkbox" :checked="item.done" @click="change(item.id,item.done)">
        <label @dblclick="showEdit(item.id)">{{item.thing}}</label>
        <button class="destroy" @click="del(item.id)"></button>
      </div>
      <input class="edit" v-focus :value="item.thing" @keyup.enter="edit" @keyup.esc="cancel">
    </li>

  </ul>
</section>
  `,
  props: ['list'],
  data() {
    return {
      currentId: '',
      // editThing: '',
    }
  },
  directives: {
    focus: {
      update(el) {
        // console.log(el,binding);
        el.focus()
      }
    }
  },
  methods: {
    del(id) {
      this.$emit('del',id);
    },
    showEdit(id) {
      this.currentId = id;
    },
    edit(e) {
      if (!e.target.value.trim()) {
        this.del(this.currentId);
        return;
      }
      this.$emit('edit',this.currentId,e.target.value);
      this.currentId = '';
    },
    cancel() {
      this.currentId='';
    },
    change(id,done) {
      this.$emit('change',id,done)
    },
  },
  computed: {
    checkAll: {
      get() {
        return this.list.every(item => item.done);
      },
      set(value) {
        this.$emit('check-all',value)
      }
    }
  }
})