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
