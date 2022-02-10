const Note = `<div class="note-div">
 <div><b>Статус:</b> {{ note.status }}</div>
 <div><b>ФИО:</b> {{ note.fio }}</div>
 <div><b>Телефон:</b> {{ note.phone }}</div>
 <div><b>Комент:</b> {{ note.comment }}</div>
 <div><b>Адрес:</b> {{ note.address }}</div>
 <div><b>Создан:</b> {{ new Date(note.created).toLocaleString('en-US', { day: "numeric", month: 'long', year: "numeric" }) }}</div>
 </div><hr>`;
Vue.component('note', { name: 'note', template: Note, props: ["note"]})
