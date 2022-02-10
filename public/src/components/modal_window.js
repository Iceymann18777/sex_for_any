var modalOkno = `<transition name="modal"><div v-if="show" class="modal-shadow" @click.self="closeModal">
<div class="modal">
<div class="modal-close" @click="closeModal">&#10006;</div>
<slot name="title">
<h5>Создать заявку</h5>
</slot>

<slot name="body">

<div class="modal-content">

<div class="modal-div"><label>Статус<br><input v-model="status" type="text" value="не назначена" required></label></div>
<div class="modal-div"><label>ФИО<br><input v-model="fio" type="text" required placeholder="ФИО"></label></div>
<div class="modal-div"><label>Телефон<br><input v-model="phone" type="text" required placeholder="Телефон"></label></div>
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

Vue.component('modal-window', {name: 'ModalWindow', template: modalOkno, data: function(){
	return { status: '', 
		fio: '',
	address:'',
	show: false,
	 phone:'',
	  comment:''
	  }
	  },
	methods:{
		closeModal:function(){
			this.show = false
			},
		 sendDataFunction: function(){
			 this.$store.dispatch('send_data',
		{ phone:this.phone,
			 comment: this.comment,
			  fio: this.fio, 
			  address: this.address,
			   status: this.status }
			   )
		this.closeModal();
		}
		}
		}
		)
