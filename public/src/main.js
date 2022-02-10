var modalOkno = `<transition name="modal"><div v-if="show" class="modal-shadow" @click.self="closeModal">
<div class="modal">
<div class="modal-close" @click="closeModal">&#10006;</div>
<slot name="title">
<h5>Создать заявку</h5>
</slot>

<slot name="body">

<div class="modal-content">

<div class="modal-div"><label>Статус<br><input v-model="status" type="text" value="не назначена" required></label></div>
<div class="modal-div"><label>ФИО<br><input v-model="fio" type="text" value="" required placeholder="ФИО"></label></div>
<div class="modal-div"><label>Телефон<br><input v-model="phone" type="telephone" required placeholder="Телефон"></label></div>
<div class="modal-div"><label>Адрес<br><input v-model="address" type="text" required placeholder=""></label></div>
<div class="modal-div"><label>Коментарий<br><textarea v-model="comment" placeholder="Коментарий"></textarea></label></div>
</div>
</slot>
<slot name="footer">
<div class="modal-footer">
<button class="modal-footer__button" @click.prevent="sendDataFunction">Сохранить</button>
</div>
</slot>
</div></div></transition>`

var Loga =  `<div id="LoginContainer"><form name="loginform">
 <div class="login-div"><label><b>name</b><br><input type="text"  v-model="nick" placeholder="nick"></label></div>
 <div class="login-div"><label><b>password</b><br><input type="password" v-model="password" placeholder="password"></label></div>
 <div class="login-div"><button @click.prevent="login">sign in</button></div>
 </form></div>`;
const Home = { template: '<div>Ремонты</div>' }
const Bar = { template: '<div>ГСМ</div>' }
const Notes = { template: `<div><button @click="showModal">Создать заявку</button>
	<modal-window ref="modal"></modal-window>
	<note-list></note-list>	
</div>`,
	methods: { 
	showModal: function(){this.$refs.modal.show = true}
	 
	 }}
	 //address, fio, nomer telefona, status, data sozdanja, comment
const Login = { 
	template: Loga,
	data(){return { nick: '', password:'' } }, methods: {
		login(){
		this.$store.dispatch('login', { nick: this.nick, password: this.password })
	}
		 
 }}
 const Note = `<div class="note-div">
 <div><b>Статус:</b> {{ note.status }}</div>
 <div><b>ФИО:</b> {{ note.fio }}</div><div>{{ note.phone }}</div>
 <div><b>Комент:</b> {{ note.comment }}</div>
 <div><b>Адрес:</b> {{ note.address }}</div>
 <div><b>Создан:</b> {{ new Date(note.created).toLocaleString('en-US', { day: "numeric", month: 'long', year: "numeric" }) }}</div>
 </div>`;
 const NoteList = `
 <div v-if="notes"><note v-for="note in notes" :note="note" :key="note.id" /></div>`;
const routes =[ 
{ path: '/home', name:'construction', component: Home },
{ path: '/bar', name: 'gsm', component: Bar },
{ path: '/login', name: 'login', component: Login },
{ path: '/notes', name: 'notes', component: Notes, meta: { requiresAuth: true } }
]

const App = `<div><nav3></nav3><main><router-view></router-view></main></div>`
const navT=`<div>
<router-link v-if="!loggedIn" to="/login">login</router-link>
<router-link v-else to="/logout"><a @click="logout">logout</a></router-link>&nbsp;&nbsp;&nbsp;
<router-link to="/bar">Ремонты</router-link>&nbsp;&nbsp;&nbsp;
<router-link to="/home">ГСМ</router-link>&nbsp;&nbsp;&nbsp;
<router-link to="/notes">Заявки</router-link>&nbsp;&nbsp;&nbsp;
</div>`;
const router = new VueRouter({/*mode:'history',*/ base: '/test_vue', routes})

router.beforeEach((to, from, next)=>{
	if(to.matched.some(record => record.meta.requiresAuth)){
		if(store.getters.loggedIn){
			next()
			return
			}
			next('/login')
		}else{next()}
	})

Vue.component('modal-window', {name: 'ModalWindow', template: modalOkno, data: function(){return {status: '', fio: '',
	address:'',show: false, phone:'', comment:''}},
	methods:{closeModal:function(){this.show = false},
		 sendDataFunction: function(){
			 this.$store.dispatch('send_data',
		{ phone:this.phone, comment: this.comment, fio: this.fio, address: this.address, status: this.status })
		this.closeModal();
		}
		}
		}
		)
		
Vue.component('note', { name: 'note', template: Note, props: ["note"]})
Vue.component('note-list', {name: 'note-list', template: NoteList, data(){return {loading: true}}, mounted(){
	this.$store.dispatch('TAKE_NOTES')
	}, computed:{
		//...mapGetters(['notes'])
		notes (){ return this.$store.getters.notes;}
		}})
		Vue.component('nav3', {name:'nav3',template: navT,
			computed: {
				loggedIn:function(){
				return this.$store.getters.loggedIn
				}
				},
			methods:{
				logout: function(){
					this.$store.dispatch('logout')
					}
					}
			})
		Vue.component('app',{ name: 'app', template: App })
		var auth = { 
			namespaced: true, 
			state: {
				userId: (myId.value !="0" ? myId.value : null),
				user: null,
			
				},
				getters: {
					loggedIn: state => !!state.userId
					},
					mutations:{
					LOGIN(state, userData){
						state.userId = userData.userId
						state.user = userData.user
						},
						LOGOUT(state){
							state.userId = null;
							state.user = null;
							window.location.href = "/logout";
							}
					},
					actions:{
						login({ commit }, authData){
							
						let d = {}
						d.username = authData.nick;
						d.password = authData.password;
						vax("post", "/login", d, on_login, on_login_error, null, false);
							
						
								function on_login(l){
									console.log(l);
									note({content: l.info, type: "info", time: 5})
									commit('LOGIN', {
									userId: l.id,
									user: l.nick
									}) 
									bSpan.textContent= l.nick;
									router.push('/notes')
									}
								function on_login_error(l){
									note({ content: l, type: "error", time: 5 })
									}	
							},
							logout({commit}){
								commit('LOGOUT')
								router.push('/login')
								}
							}
			}
			
			var noteS = {
				namespaced: true,
				state: {
				notes: [] ,
				loading: true
				},
				getters: {
					notes: state => state.notes
					},
					mutations:{
						set_loading(state, flag){
							state.loading = flag
							},
						INSERT_NOTE(state, notesData){
							state.notes.push(notesData);
							},
							GET_NOTES(state, notes){
								state.notes = notes;
								}
					},
					actions:{
						send_data({ commit }, payload){
							vax("post", "/api/save_note", payload, on_set_note, on_set_note_error, null, false);
							function on_set_note(l){
								note({content: l.info, type: "info", time: 5})
								commit('INSERT_NOTE', l.data);
								}
							function on_set_note_error(l){
								note({content: l, type: "error", time: 5});
								}
								},
								TAKE_NOTES({commit}){
									commit('set_loading', true)
									vax("post", "/api/get_notes", {}, on_take_notes, on_take_notes_error, null, false);
								
							function on_take_notes(l){
								commit('set_loading', false)
								commit('GET_NOTES', l.data);
								}
							function on_take_notes_error(l){
								commit('set_loading', false)
								note({content: l, type: "error", time: 5})
								}
								}
								}
				}
			
		const store = new Vuex.Store({
			modules: {
				auth,
				noteS
				}
			})
		const app = new Vue({
			router,
			store
		}).$mount('#app')
		
