const navT = `<div id="navContainer">
<router-link v-if="!loggedIn" to="/login">login</router-link>
<router-link v-else to="/logout"><a @click="logout">logout</a></router-link>&nbsp;&nbsp;&nbsp;
<router-link to="/bar">ГСМ</router-link>&nbsp;&nbsp;&nbsp;
<router-link to="/home"> Ремонты</router-link>&nbsp;&nbsp;&nbsp;
<router-link to="/notes">Заявки</router-link>&nbsp;&nbsp;&nbsp;
</div>`;

Vue.component('nav3', { name: 'nav3', template: navT,
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
