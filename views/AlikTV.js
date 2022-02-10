
const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');
const icons_menu = require('./icons_menu');
const html_admin_nav_menu = require('./html_admin_nav_menu');
const html_footer = require('./html_footer');

const doska = require('./doska');

const { get_banner, get_banner_podval } = require('./reklama_s');

const AlikTV = function(n){
const { lusers } = n;
const buser = n.user;
 n.current = "aliktv";
let a = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">

<g><path d="M500,10C229.4,10,10,229.4,10,500s219.4,490,490,490c270.6,0,490-219.4,490-490S770.6,10,500,10z M500,881.1c-210.5,0-381.1-170.6-381.1-381.1S289.5,118.9,500,118.9c210.5,0,381.1,170.6,381.1,381.1S710.5,881.1,500,881.1z"/><path d="M390.2,282.2l326.7,218.6L390.2,719.5V282.2z"/></g>
</svg>`;
return `<!DOCTYPE html><html lang="en"><!-- AlikTV.js -->
<head>${html_head.html_head({title: `AlikTV - live broadcasting`, meta: get_meta(n.meta),
csslink: "/css/main2.css", cssl: ["/css/AlikTV.css"], luser:buser})}
</head>
<body>${n.warnig ? `<div id="warnig">${n.warnig}</div>` : ''}
<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
${icons_menu.icons_menu(n)}
${buser && buser.brole == 'superadmin' ?  html_admin_nav_menu.html_admin_nav_menu(n) : ''}
${n.banner && n.banner.length ? `<div id="haupt-banner">${get_banner(n.banner)}</div>` : ''}

<main id="pagewrap">
<!-- {vert_menu.vert_menu(n)} -->
<div id="right">

<h1>AlikTV - live broadcasting (under construction)</h1>
<div><span>Здесь мой статус.</span></div>
<section id="ipSection">
	<section class="" id="mainIpPanel">
	<div class="status"></div>
	</section>
	<section id="gridWrapper">
	<section class="box" id="ipContainer">
	<div class="videocontainer">
	<div class="obenvideo">
	<div class="benehmung zimmer"><span>Кухня / Kitchen</span></div>
	</div>
	<div class="videowrapper"><div class="knopkastart">${a}</div>
	<video class="video" poster="/images/tvpic.jpg"></video>
	</div>
	<div class="undervideo">
		<div class="benehmung2 eye"></div><div class="benehmung2 count"><span>0</span></div>
	</div>
	</div>
	
	<div class="videocontainer">
	<div class="obenvideo">
	<div class="benehmung zimmer"><span>Спальня / Bedroom</span></div>
	</div>
	<div class="videowrapper">
	<div class="knopkastart">${a}</div>
	<video class="video" poster="/images/tvpic.jpg"></video>
	</div>
	<div class="undervideo">
	<div class="benehmung money"><span>50 руб / мес</span></div><div class="benehmung2 eye"></div><div class="benehmung2 count"><span>0</span></div>
	</div>
	</div>
	
	</section>
	<section class="box" id="chatContainer">
	<div class="obenchat"><div><span>В чате <b>0</b> чел.</span></div></div>
	<div class="chat"></div>
	<div class="underchat">
	<div class="textarea"><textarea placeholder="Your message"></textarea>
	<div class="strelka">
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
<g><path d="M10,991.1l980-493.2L10,8.9l101.1,415.7l532.7,73.4l-532.7,70.5L10,991.1z"/></g>
</svg>
	</div>
	</div>
	</div>
	</section>
	</section>
	<footer class="" id="mainIpFooter"><div><button>Оформить подписку</button></div></footer>
</section>
<hr>
<h2>Хотите вести живую трансляцию круглые сутки и зарабатывать на этом деньги?</h2>
<p>Есть два способа, как сделать это:</p>
<p>Первый - разместить живую трансляцию на нашей платформе и настроить метод монетизации.</p>
<p>Второй - заказать у нас свой собственный стриминговый сайт.</p><hr>
<h2>Want you have your own live broadcasting and get paid for it?</h2>
<p>There are two ways to achieve this:</p>
<p>The first - it's our platform. If you have a stream people want to watch, and a handful of fans who are willing to pay
to watch it, this is a scalable way to get paid for your live streams.</p>
<p>Second way - to create and launch a live streaming website. Hire me!</p>
<p>Все вопросы о сотрудничестве отправляйте на имейл / More info: <a href="mailto:globalikslivov@gmail.com">globalikslivov@gmail.com</a></p>
<hr>
${doska.doska(n)}
${n.banner && n.banner.length ? `<section id="reklamaPodval">${get_banner_podval(n.banner)}</section>`:''}
</div></main>
<input type="hidden" id="buserli" value="${buser ? buser.id : 0}">
<!-- <script src="/js/gesamt.js"></script> -->
<footer id="footer">${html_footer.html_footer({banner: n.banner})}</footer></body></html>`;
}

module.exports = { AlikTV };
function get_meta(n){
let s = '';
s+=`
<meta property="og:locale" content="ru_RU"/>
<meta property="og:type" content="website" />
<meta property="og:title" content="${n.aliktv.title}" />
<meta property="og:url" content="${n.url}" />
<meta property="og:image" content="${n.image}" />
<meta property="og:description" content="${n.aliktv.description}" />

<meta property="og:site_name" content="${n.site_name}" />
<meta itemprop="name" content="${n.aliktv.title}" />
<meta itemprop="description" content="${n.aliktv.description}" />`
return s;
}
