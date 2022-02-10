const NoteList = `<div v-if="notes"><note v-for="note in notes" :note="note" :key="note.id" /></div>`;
Vue.component('note-list', { 
	name: 'note-list', 
	template: NoteList, 
	data(){
		return {loading: true}
		},
	mounted(){
	this.$store.dispatch('TAKE_NOTES')
	}, computed:{
		//...mapGetters(['notes'])
		notes (){ return this.$store.getters.notes;}
		}
		}
		)
