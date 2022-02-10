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
			
