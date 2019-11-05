const list = JSON.parse(localStorage.getItem('todo')) || [];
const vm = new Vue({
	el: '.todoapp',
	data: {
		list,
		currentTemp: '',
		currentId: '',
		currentThing:''

	},
	methods: {
		del(id) {
			this.list = this.list.filter(item => item.id !== id);
		},
		add() {
			if (!this.currentTemp.trim() ){
				alert('输入内容不能为空');
				return;
			}
			let temp = {
				id: +new Date(),
				thing: this.currentTemp,
				done: false
			};
			this.list.unshift(temp);
			// console.log(this.list);
			this.currentTemp = '';
		},
		edit(id,thing) {
			this.currentId = id;
			this.currentThing = thing;
		},
		editUp() {
			const todo = this.list.filter(item => item.id === this.currentId);
			if(!todo[0].thing.trim()){
				this.list = this.list.filter(item => item.id !== this.currentId);
			}
			this.currentId = ''
		},
		cancel(item) {
			item.thing = this.currentThing;
			this.currentId = '';
		},
		clear() {
			this.list = this.list.filter(item => !item.done);
		}
	},
	computed: {
			leftCount() {
				return this.list.filter(item => !item.done).length;
			},
			isClear() {
				return this.list.some(item => item.done);
			},
			isCheckAll: {
				get() {
					return this.list.every(item => item.done);
				},
				set(value){
					this.list.forEach(item => item.done = value);
				}
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