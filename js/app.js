const list = JSON.parse(localStorage.getItem('todo')) || [];
const router = new VueRouter({
  linkExactActiveClass: 'selected'
})
const vm = new Vue({
	router,
	el: '.todoapp',
	data: {
		list,
	},
	methods: {
		del(id) {	
			this.list = this.list.filter(item => item.id !== id);
		},
		add(temp) {
			this.list.unshift(temp);
		},
		edit(id,thing) {
			// console.log(temp)
			this.list.forEach(item => {
				if(item.id === id) {
					item.thing = thing;
					// console.log(temp.thing)
					// item.done = temp.done;
				}
			});
			console.log(this.list);
		},
		checkAll(value) {
			// console.log(value);
			this.list.forEach(item => item.done = value);
		},
		clear() {
			this.list = this.list.filter(item => !item.done);
		},
		change (id) {
      const temp = this.list.find(item => item.id === id)
      temp.done = !temp.done
    },
	},
	computed: {
		isShow() {
			return this.list.length;
		},
		showList() {
			const path = this.$route.path;
			if(path === '/active'){
				return this.list.filter(item => !item.done)
			}else if (path === '/completed') {
				return this.list.filter(item => item.done);
			}else {
				return this.list;
			}
			// console.log(path);
		}
	},
	watch: {
		list: {
			deep:true,
			handler(value) {
				localStorage.setItem('todo',JSON.stringify(value));
			}
		}
	}
})