
const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');
const icons_menu = require('./icons_menu');
const html_admin_nav_menu = require('./html_admin_nav_menu');
const html_footer = require('./html_footer');
const { get_meta } = require('./get_meta');
const doska = require('./doska');
const { people } = require('./people');
const { get_banner, get_banner_podval } = require('./reklama_s');
const { check_age } = require('../config/app.json');
const board_str_ru = `Также обратите внимание на <strong>доску объявлений</strong>.
 Без регистрации и совершенно бесплатно в ней можно разместить свое объявление`;
const board_str_en = `Pay attention on the <strong>message board</strong>. You can write there your messages for free.`;

const main_page = function(n){
const { lusers } = n;
const buser = n.user, roomers = n.roomers; n.current = "main";

return `<!DOCTYPE html><html lang="en"><!-- main_page.js -->
<head>${html_head.html_head({title: `${n.site} - webcam site для видеообщений`,
 meta: 
  get_meta({
url: n.meta.url, 
image: n.meta.image,
 site_name: n.meta.site_name, 
 title: n.meta.main_page.title, 
description: n.meta.main_page.description
}),
csslink: "/css/main2.css", cssl: ["/css/main_page.css", "/css/mediasoup.css"], luser:buser})}
<!-- https://app.onesignal.com -->
${process.env.DEVELOPMENT == "yes" ? '' : '<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>'}
</head>
<body>${n.warnig ? `<div id="warnig">${n.warnig}</div>` : ''}
<div id="oldBrowser">You have the old browser. Please use the latest browsers - Firebox oder Chrome.</div>
<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
${icons_menu.icons_menu(n)}
${buser && buser.brole == 'superadmin' ?  html_admin_nav_menu.html_admin_nav_menu(n) : ''}
${check_age?`
<script>
function check_age(){
if(is_local_storage()){
if(localStorage.getItem('age')==1){
return;
}
}
if(is_dialogi()){
dialogConfirm2.showModal();
dialogConfirm2.onclose = function(ev){
//alert(ev.target.returnValue);
ev.target.returnValue == 'true' ? gsiska() : gpiska();
function gsiska(){set_yes();}
function gpiska(){say_no();}
}
}else{
window.location.href = "#message_box2";
var qtar = document.querySelector('.overlay:target');
if(qtar){
qtar.onclick = function(){in_rem_hash();}
}
}
}
check_age();
function say_yes(){
window.location.href = "#";
in_rem_hash();
set_yes();
}
function say_no(){
window.location.href = "https://www.yandex.ru";
}
function set_yes(){
if(is_local_storage()){
localStorage.setItem('age', 1);
}
}
</script>
` : ''}
${n.banner && n.banner.length ? `<div id="haupt-banner">${get_banner(n.banner)}</div>` : ''}

<main id="pagewrap">
<div id="right">

${n.m ? n.m.msg : ''}
<div id="privet">${buser ? `${n.user.lng == 'ru' ? 'Привет' : 'Hello'} <a href="/webrtc/${buser.id}">${buser.bname}</a>!` : 'Hello guest!'}</div>
<!--
<article id="mainArticle"><h1>${n.user ? n.user.lng == 'ru'?'Добро пожаловать на сайт видеотрансляций' : 'Welcome to the webcam site' : 'Welcome to the chelikon webcam site! Добро пожаловать на сайт видеотрансляций'}!</h1>
<p>Donations in bitcoins or tokens!</p>
<p>${n.user ? n.user.lng == 'ru' ? 'Вы можете' : 'Right now you can' : 'После простой регистрации вы сможете'}:
<ul id="ulKomnata">
<li><strong>${n.user ? n.user.lng == 'ru' ? 'стримить видео':'stream your video':'стримить видео'}</strong>
<li>${n.user ? n.user.lng == 'ru' ? 'получать от юзеров <strong>чаевые в биткоинах</strong> и <strong>токенaх</strong>':
'get tips from users in <strong>bitcoins</strong> and <strong>tokens</strong>':
'получать от юзеров <strong>чаевые в биткоинах</strong> и <strong>токенaх</strong>'}.
</ul>
</p>
<p>${n.user?n.user.lng == 'ru' ? board_str_ru : board_str_en : board_str_ru}</p>
<p> ${!buser?' &nbsp;<button class="regabutton"><a class="rega" href="/signup">Хочу стать стримером!</a></button>':
` &nbsp;<button class="regabutton"><a class="rega" href="/webrtc/${buser.id}">${n.user.lng == 'ru' ? 'Хочу стримить' : 'Wanna be a streamer'}!</a></button>`}</p></article>
<hr>
-->

<div><button onclick="showAnketaForms(this);">Start an anonym live broadcasting</button></div>
<div id="anketaForms">
<div><label>Your bitcoin addresse:&nbsp;&nbsp;<input type="text" placeholder="Your bitcoin address"></label>&nbsp;&nbsp;<button>save</button></div>
<div><label>Your bank cards number:&nbsp;&nbsp;<input type="text" placeholder="Your bank card number"></label>&nbsp;&nbsp;<button>save</button></div>
<div><label>Your status:&nbsp;&nbsp;<input  type="text" placeholder="Your status"></label>&nbsp;&nbsp;<button>save</button></div>
<div><button onclick="broadcasting(this);">Are you ready broadcasting? Go!</button></div>
</div>
<div id="mainpanel">here is my status</div>
<section id="multimedia">
<div id="chatinfo">
<div class="span"><span><b>bitcoins:</b></span><span>0</span>&nbsp;&nbsp;<span><b>viewers:</b></span>&nbsp;<span>0</span>
<span><b>chat:</b></span>&nbsp;<span id="chatCount">0</span>&nbsp;
</div>
<div class="imghalter2" onclick="hide_chat(this);"><img src="/images/FullScreen.png"></div>
</div>
<div id="allwrapper">

<div id="videosection">
	<div id="videowrapper"><div class="knopka" onclick="video_knopka_start(this);"><img src="/images/play2.svg"></div><video poster="/images/tvpic.jpg"></video></div>

</div>
<div id="chatsection">
	<div id="chat"><div id="chatNehmung">Chat</div></div>

</div>
</section>
<div id="underchat">
	<textarea  id="textarea" placeholder="Your message"></textarea><div class="knopka-send" onclick="send_up(this);"><img src="/images/play.svg"></div>
</div>
<!-- <div id="undervideo"></div> -->
<div id="footerDonate">
<div>Donations:</div><hr>
<div><span>Bitcoins addresse</span><span id="bitcoinsSpan"></span></div><hr>
<div><span>Bank cards</span><span id="cardsSpan"></span></div><hr>
<div><button id="pushLiveNotes" onclick="go_ahead(this);">Subscribe to the live broadcasting</button></div>
</div><hr>




${n.user && n.user.brole == 'superadmin' ? `<small><b>${n.is_fakes_enabled ? 'fakes' : 'no fakes'}</b></small>` : ''}
<section id="onlineVideo">
<header id="onlineVideoHeader">${n.user ? n.user.lng == 'ru' ? 'Видеочат-комнаты':'Video Chat rooms':'Video Chat rooms'}</header>
<section id="videoContainer">
${n.videoUsers && n.videoUsers.length > 0 ? show_list(n.videoUsers, (buser && buser.brole == 'superadmin' ? true : false), n) : get_zaglushka(n)}
</section>
</section>

<hr>
<section id="newUserSection">
<h2>${n.user ? n.user.lng == 'ru' ? 'Новые профили' : 'New profiles' : 'New profiles'}</h2>

${n.new_users ? get_new_users_list(n.new_users, n.user) : n.user ? n.user.lng == 'ru' ? 'Пока нет никого.' : 'Nodody yet.' : 'Пока нет никого.'}
</section>

<input type="hidden" id="yourLang" value="${buser ? buser.lng : 'ru'}">
<hr>
<section id="pushContainer">
<div class="loopdiv"><h3>Stay in the loop</h3>

<p>Get all things video business, straight to your tablets.</p>
<div><button id="webPush" onclick="subscribe_webpush(this);">SUBSCRIBE TO THE NEWS</button></div>
</div><hr>
<output id="out7"></output>
</section>

${doska.doska(n)}
<hr>${people({})}
${n.banner && n.banner.length ? `<section id="reklamaPodval">${get_banner_podval(n.banner)}</section>`:''}
</div></main>
<input type="hidden" id="buserli" value="${buser ? buser.id : 0}">
<input type="hidden" id="buserBname" value="${n.user ? n.user.bname : ''}">
<input type="hidden" id="randomString" value="${n.randomStr}">
<script src="/js/gesamt.js"></script>
<footer id="footer">${html_footer.html_footer({banner: n.banner})}</footer></body></html>`;}

module.exports = { main_page };

function roomers_list(n){
let s = '';
if(Array.isArray(n)){
 n.forEach(function(el,i){
s+= `<div data-roomid="${el.us_id}" сlass="img-online-container">
<img class="img-online" src="${el.ava?el.ava:'/images/default.jpg'}">
<footer class="img-footer"><a href="/webrtc/${el.us_id}">${el.nick}</a>&nbsp;,&nbsp;${el.age?el.age:18}&nbsp;лет.&nbsp;
(<span data-vid="${el.us_id}">${el.v}</span> чел.)</footer>
</div>`;
});
 }
return s;
}


function get_zaglushka(n){
return `<span id="zagln2">${n.user ? n.user.lng == 'ru' ? 'Пока нет никого' : 'Nobody yet' : 'Пока нет никого'}.
 &nbsp;<a class="ahero" href="${n.user ? `/webrtc/${n.user.id}` : '/login'}">${n.user ? n.user.lng == 'ru' ? 'Будь первым':'Be the firts one':'Будь первым'}!</a></span>`;
	}

function show_list(arr, is_admin, n){
	let s = '';
	let active, fakes, unique_numbers, fake_random, zusammen;
	let no_views = arr.filter( el => (el.typ !="noview" || is_admin))
	
if(!is_admin){
if(no_views.length > 0){
	active = no_views.filter( el=> (el.typ == "active" || el.typ == "all" || el.typ == "privat"))
if(n.is_fakes_enabled)fakes = no_views.filter( el => (el.typ == 'fake'))	
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
s+= `<div data-roomidi="${el.us_id}" class="vroomers">
${el.typ == 'activ' ? '' : `<div data-indicator="${el.us_id}" class="indicator${el.typ == 'all'|| el.typ == 'fake' ? ' red' : ' green'}"></div>`}
${is_admin ? `<input type="checkbox" data-bnick="${el.nick}" onchange="do_noview(this);" ${el.typ == 'noview' ? 'checked' : ''} />` : ''}
<a rel="nofollow" href="/webrtc/${el.us_id}">
<header>${el.nick}</header></a>
<p>${el.stat ? (el.stat).substring(0,52) : "I'm online :)"}</p>
<section class="imageHalter">
<img class="videovroomers" data-avid="${el.us_id}" onerror="foto_error(this);"
 src="${el.typ == 'fake' || el.typ == 'noview' ? '/vid/' + el.p : (el.p ? el.p : (el.ava ? el.ava : '/images/default.svg'))}"
  data-vidi="${el.us_id}">
  </section>
<header class="untervideo"><span class="timecl" data-min_time="${el.us_id}">${el.typ == 'fake' ? get_min() : get_mini(el.crat).t}</span>&nbsp;<span class="timecl" data-min_str="${el.us_id}">${el.typ=='fake'?'мин':get_mini(el.crat).s}</span>,&nbsp;
<span class="timecl"><div class="psvg"><img src="/images/people.svg"></div></span>
<span class="timecl" data-v_str="${el.us_id}">${el.typ == 'fake' ? gruss() : el.v}</span>&nbsp;

</header>
</div>`;
		})
	}else{return s+= `${get_zaglushka(n)}`;}
		return s;
}





function gruss(){
return Math.floor(Math.random() * (1000 - 80 + 1)) + 80;	
}
function get_min(){
	return Math.floor(Math.random()*(60-10+1))+10;
}
function get_mini(crat){
let a=new Date(crat).getTime();
let b=new Date().getTime();
let d=(b-a)/60000;
let c=Math.round(d);
if(c>=60){
console.log((c/60).toFixed(2),' hours');
return {t:(c/60).toFixed(2), s:'ч'}
}else{
console.log(c, ' min')
return {t: (c==0?1:c), s: 'мин'}	
}	
}

function get_new_users_list(n, buser){
let s='<section id="userList">';
n.forEach(function(el,i){
s+=`<div class="newuserdiv">
<div class="newuserleft">${el.ava ? `<img class="newuserfoto" src="${el.ava}"/>` : get_unnamed_pic('newuserfoto')}</div>
<div class="newuserrite">
<div><a href="/webrtc/${el.id}">${el.bname}</a></div>
${el.stat?`<div>${el.stat}</div>`:''}
</div></div>`;	
})
s+=`</section><div class="seeAllusers"><br><a id="newusera" href="/home/users">${buser ? buser.lng == 'ru' ? 'Смотреть все профили' : 'See all profiles' : 'Смотреть все профили / Look all profiles'}</a></div>`;
return s;	
}
function get_videdddos(n){
	let s='';
	n.forEach(function(el,i){
	s+=`<div class="videodiv" data-vvid="${el.id}">
	<video data-video_id="${el.id}" src="/vid/${el.src}" preload="metadata" controls onplay="vplay(this);"></video></div>`;	
	})
	return s;
}
function get_unnamed_pic(clas){
	return `
	<svg class="${clas}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="silver" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<g><g><path d="M387.3,105.9c-50.3,37.4-63.8,96.7-61.4,128.3c3.2,38.6,11,88.8,11,88.8s-15.5,8.4-15.5,42.3c5.4,85,33.8,48.3,39.7,85.6c14.1,89.8,46.2,73.8,46.2,122.9c0,81.7-33.7,119.8-138.8,165.1C163.1,784.2,54.3,841.4,54.3,940.5V990h891.4v-49.5c0-99-108.8-156.2-214.3-201.6c-105.1-45.3-138.7-83.4-138.7-165.1c0-49,32-33,46.2-122.9c5.9-37.3,34.3-0.6,39.8-85.6c0-33.9-15.6-42.3-15.6-42.3s7.8-50.2,10.9-88.8c3.2-40.5-19.7-126.8-113.9-153.3c-16.5-16.8-27.6-43.6,23.1-70.5C472.2,5.1,446.4,63.2,387.3,105.9L387.3,105.9z"/></g></g>
</svg>
	`;
	}
