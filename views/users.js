const html_head = require('./html_head.js'); // head.js 
const html_nav_menu = require('./html_nav_menu.js');// header_menu.js
const html_admin_nav_menu = require('./html_admin_nav_menu.js');// admin_main_menu.js
const html_footer = require('./html_footer.js');// footer.js
const { get_banner, get_banner_podval } = require('./reklama_s');
const icons_menu = require('./icons_menu');
const { get_meta } = require('./get_meta');
const { js_help } = require('../libs/helper.js'); 
let users = n=>{
const buser = n.user;
n.current = "users";
return `<!DOCTYPE html><!-- users.js --><html lang="en"><head>${html_head.html_head({title:"Пользователи / Users",
 meta:
  get_meta({
url: n.meta.url, 
image: n.meta.image,
 site_name: n.meta.site_name, 
 title: n.meta.users.title, 
description: n.meta.users.description
}),
 csslink:"/css/main2.css",
cssl:["/css/users.css"]})}

</head><body>
${n.warnig ? `<div id="warnig">${n.warnig}</div>` : ''}
<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
${icons_menu.icons_menu(n)}
${buser && buser.brole == 'superadmin' ? html_admin_nav_menu.html_admin_nav_menu({}) : ''}
${n.banner && n.banner.length ? `<div id="haupt-banner">${get_banner(n.banner)}</div>` : ''}
<main id="pagewrap">

<div id="right">
<h3>${buser && buser.lng == 'ru' ? 'Пользователи' : 'Users'}</h3>
<hr>
<form name="Z" method="POST" action="/api/get_suchen">
<div class="halter"><label>
<strong class="strong">${buser && buser.lng == 'ru' ? 'Возраст' : 'Age'}:</strong>
<input type="number" name="ab" min="10" max="100" value="18"> - <input type="number" name="bis" min="10" max="100" value="60">
</label></div>&nbsp;&nbsp;&nbsp;

<!-- <div class="halter"><label><strong class="strong">Город:</strong>&nbsp;
<input name="city" type="text" placeholder="Москва"></label></div>&nbsp;&nbsp;&nbsp; -->

<div class="halter"><label><strong class="strong">${buser && buser.lng == 'ru' ? 'Ориентация' : 'Orientation'}:</strong>
<select name="bi" id="zType" required>
<option value="hetero">${buser && buser.lng == 'ru' ? 'гетеро' : 'hetero'}</option>
	<option value="gay">${buser && buser.lng == 'ru' ? 'гей' : 'gay'}</option>
	<option value="bi">${buser && buser.lng == 'ru' ? 'би' : 'bi'}</option>
	<option value="lesbi">${buser && buser.lng == 'ru' ? 'лесби' : 'lesbi'}</option>
	<option value="trans">${buser && buser.lng == 'ru' ? 'транс' : 'trans'}</option>
	</select></label></div>&nbsp;&nbsp;&nbsp;
	<div class="halter"><label><strong class="strong">${buser && buser.lng == 'ru' ? 'Ключевое слово' : 'Keyword'}:</strong>&nbsp;<input name="keywort" type="text"></label></div>
	&nbsp;&nbsp;<div class="halter">&nbsp;&nbsp;<label class="cntlb"><strong class="strong">${buser && buser.lng == 'ru' ? 'С аватаркой' : 'With pic'}</strong>&nbsp;<input type="radio" name="pic"><span class="mark"></span></label></div>
	<div class="halter">&nbsp;<input type="submit" value="${buser && buser.lng == 'ru' ? 'Поиск' : 'Search'}"></div>
	</form><br>
<button onclick="fetch_all_suchen(this);">${buser && buser.lng == 'ru' ? 'Показать всех' : 'Show all'}</button>	
<hr>
${n.result ? get_users(n.result, buser) : `${buser && buser.lng == 'ru' ? 'Нет никого' : 'No results'}`}
${n.banner && n.banner.length ? `<section id="reklamaPodval">${get_banner_podval(n.banner)}</section>` : ''}
<input type="hidden" id="Buser" value="${buser && buser.brole == 'superadmin' ? true : false}">
<input type="hidden" id="Lang" value="${buser && buser.lng == 'ru' ? true : false}">
</div>
</main>
${js_help(["/js/users.js"])}
<footer id="footer">${html_footer.html_footer({banner:n.banner})}</footer></body></html>`;
}
module.exports = { users };
function get_users(n, buser){
let s='<section id="usersection">';
n.forEach(function(el, i){
s+=`<div class="newuserdiv" data-id="${el.id}" data-at="${el.crat}">
<div class="newuserleft"><img class="newuserfoto" src="${el.ava ? el.ava : '/images/default.svg'}"/></div>
<div><a href="/webrtc/${el.id}">${el.bname}</a>,&nbsp;${el.bage},&nbsp;${el.sexor}</div>
${buser && buser.brole == 'superadmin' ? `<div>${el.email}</div>` : ''}
${el.stat ? `<div>${el.stat}</div>` : ''}
<div>${buser && buser.lng == 'ru' ? 'Был онлайн' : 'Last login'}: 
${new Date(el.ll).toLocaleString('en-US', { day: "numeric", month: 'long', year:"numeric" })}</div>
<div>${buser && buser.lng == 'ru' ? 'Профиль создан' : 'Pofile created'}: ${new Date(el.crat).toLocaleString('en-US', { day: "numeric", month: 'long', year:"numeric" })}</div>

${buser && buser.brole == 'superadmin' ? `<div>tokens: ${el.items}</div>
<!-- <div><button data-id="${el.id}" data-nick="${el.bname}" data-email="${el.email}"
 onclick="send_welcome_mail(this);">welcome on board</button></div> -->` : ''}
</div>`;
	})
	s+=`</section><br><br><button onclick="get_more_users(this);">${buser && buser.lng == 'ru' ? 'Показать еще' : 'Get more'}</button>`;
	return s;
	}
