var larr = [];
var marr = [
	{id: 1, name: "alik", view: "noview"},
	{id: 2, name: "vadik", view: "active"},
	{id: 3, name: "alena", view: "fake"},
	{id: 4, name: "misha", view: "active"},
	{id: 5, name: "john", view: "fake"},
	{id: 6, name: "doo", view: "noview"},
	{id: 7, name: "lena", view: "privat"},
	{id: 8, name: "masha", view: "all"},
	{id: 9, name: "lara", view: "fake"},
	{id: 10, name: "baba", view: "fake"}
];


var is_admin = false;
var no_views = marr.filter( el => (el.view !="noview" || is_admin))

var fakes = no_views.filter( el => (el.view == 'fake'))
console.log('fakes: ', fakes);
var active = no_views.filter( el=> (el.view == "active" || el.view == "all" || el.view == "privat"))

var numbers = Array.from( { length: fakes.length }, () => Math.floor(Math.random() * fakes.length));
console.log('numbers: ',  numbers);
var unique_numbers = [...new Set([...numbers])];
console.log('unique numbers: ', unique_numbers)
var saka = [];
for (var i=0;i<Math.round(Math.random()*unique_numbers.length);i++){
	saka.push(unique_numbers[i])
	}
console.log("saka: ", saka);
console.log('unique numbers: ', unique_numbers.splice(0,1));
var fake_random = [];
unique_numbers.forEach(function(fake,i){
	fake_random.push( fakes[ fake ] );
	})
console.log('fake random: ', fake_random);
var zusammen = [...active, ...fake_random];
console.log('zusammen: ', zusammen)
const is_fakes_enabled = false;
function show(arr, is_admin){
	let s = '';
	let active, fakes, unique_numbers, fake_random, zusammen;
	let no_views = arr.filter( el => (el.view !="noview" || is_admin))
	

if(!is_admin){
if(no_views.length > 0){
	active = no_views.filter( el=> (el.view == "active" || el.view == "all" || el.view == "privat"))
if(is_fakes_enabled)fakes = no_views.filter( el => (el.view == 'fake'))	
}
if(fakes && fakes.length > 0){
var numbers = Array.from( { length: fakes.length }, () => Math.floor(Math.random() * fakes.length));

 unique_numbers = [...new Set([...numbers])];
 fake_random = [];
unique_numbers.forEach(function(fake,i){
	fake_random.push( fakes[ fake ] );
	})
if(active && active.length > 0){
 zusammen = [...active, ...fake_random];
}else{
	zusammen =  fake_random;
	}
}else {
	zusammen = active;
	}
}else{zusammen = arr;}

if(zusammen.length > 0){	
	zusammen.forEach(function(el,i){
		s+= `{id: ${el.id}, name: ${el.name}, view: ${el.view}}`;
		})
	}else{return s+="no view";}
		return s;
}

var ba = show(marr, false);
console.log('ba: ', ba);

//var dar = [{no: "yes"}, {no: "yes"}]
//var dar2 = dar.filter(el=>(el.no=="no"))
//console.log('dar2: ', dar2, dar2.length);
var m = [];
var l=[1,2,3]
console.log([...l, ...m])
var t = "2021-06-24 22:21:17.206618";
var t2 = new Date(t);
console.log(t2.getHours(), t2.getMinutes(),t2.getFullYear(), t2.getDay(),t2.getMonth());
// был онлайн 8 декабря 10:18
//профиль создан 8 декабря
console.log("был онлайн ", t2.toLocaleString('en-US', { day: "numeric", month: 'long', year:"numeric" }))
console.log("профиль создан ", t2.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric'}))
console.log(t2.toLocaleDateString())
//console.log("был онлайн ", t2.getDay())
function tolocsup(){
	try{new Date().toLocaleString('i');}catch(e){console.log('e.name: ', e.name);return false;} return true;
	}
var did = tolocsup();
console.log("to locale string: ", did);

