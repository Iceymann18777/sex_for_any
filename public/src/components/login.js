var Loga =  `<div id="LoginContainer"><form name="loginform">
 <div class="login-div"><label><small>Ник</small><br><input class="inputLog" type="text"  v-model="nick" placeholder="nick"></label></div>
 <div class="login-div"><label><small>Пароль</small><br><input class="inputLog" type="password" v-model="password" placeholder="password"></label></div>
 <div class="login-div"><button @click.prevent="login">Войти</button></div>
 </form></div>`;

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
