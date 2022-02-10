const show_crm = async function(ctx){
	ctx.body = await ctx.render('test_vue', {})
	}
	
const save_note = async function(ctx){
	let { status, comment, phone, fio, address } = ctx.request.body;
	if(!phone || !fio || !address ) ctx.throw(400, "No data")
	let result = {}
	result.phone = phone;
	result.status = "Не назначена";
	result.comment = comment;
	result.fio = fio;
	result.address = address;
	result.created = new Date();
	result.id = 3;
	ctx.body = { info: "OK saved!", data: result }
	}
	
	var notes = [
	{ id: 1, phone: '89634623542', 
		address: "Челябинск, пр. Ленина, 24", 
		fio: "Пупкевич Василий Григорьевич", 
		status: "не назначена", 
		comment: "Дали лопату", 
		created: new Date() 
		},
		{
			id: 2,
			phone: "8909888888",
			address: "Челябинск, ул. Воровского 25", 
		fio: "Лукашевич Дмитрий Григорьевич", 
		status: "не назначена", 
		comment: "Дали кирпич", 
		created: new Date() 
			}
		]
	
const get_notes = async function(ctx){
	ctx.body = { data: notes }
	}
	
	module.exports = { show_crm, save_note, get_notes }
