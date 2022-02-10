
const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');
const icons_menu = require('./icons_menu');
const html_admin_nav_menu = require('./html_admin_nav_menu');
const html_footer = require('./html_footer');

const test_mse = function(n){
	let buser = n.user;
	return `<!DOCTYPE html><html lang="en"><!-- test_mse.js -->
<head>${html_head.html_head({title: 'Тест трансляции', meta: get_meta(n.meta),
csslink: "/css/main2.css", cssl: ["/css/test_mse.css"], luser:buser})}
</head>
<body>${n.warnig ? `<div id="warnig">${n.warnig}</div>` : ''}
<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
${icons_menu.icons_menu(n)}
${buser && buser.brole == 'superadmin' ?  html_admin_nav_menu.html_admin_nav_menu(n) : ''}
<main id="pagewrap">
<div id="right">
<h3>Тестирование трансляции</h3>
<p>Лучше всего использовать новейшие браузеры Google Chrome и Firefox.</p>
<p>Нажмите на кнопку 'start camera'. Затем на 'start  recording', затем на 'stop recording'.
Затем нажмите на 'play'.
В первом видео вы увидите стрим с вашей веб-камеры, а во втором видео вы должны увидеть запись.</p>
<section id="videowrapper">
<div class="videocontainer">
<div class="vheader">Video 1</div>
<div class="vbox">
<video id="gum" playsinline autoplay muted controls></video>
</div>
</div>
<div class="videocontainer">
<div class="vheader">Video 2</div>
<div class="vbox">
<video id="recorded" playsinline loop controls></video>
</div>
</div>
</section>

    <div class="div">
        <button id="start">Start camera</button>
        <button id="record" disabled>Start Recording</button>
        <button id="play" disabled>Play</button>
        <button id="download" disabled>Download</button>
    </div>

    <div class="div">
        Recording format: <select id="codecPreferences" disabled></select>
    </div>
    <div class="div">
        <h4>Media Stream Constraints options</h4>
        <p>Echo cancellation: <input type="checkbox" id="echoCancellation"></p>
    </div>

    <div class="div">
        <span id="errorMsg"></span>
    </div>


	<script src="/js/test_mse.js"></script>
	</div></main><footer id="footer">${html_footer.html_footer({})}</footer>
	</body></html>`;
	}
	module.exports = { test_mse }
function get_meta(n){
let s='';
s+=`
<meta property="og:locale" content="ru_RU"/>
<meta property="og:type" content="website" />
<meta property="og:title" content="Тест видеотрансляции" />
<meta property="og:url" content="${n.url}" />
<meta property="og:image" content="${n.image}" />
<meta property="og:description" content="Тест видеотрансляции. Mediarecorder API." />

<meta property="og:site_name" content="${n.site_name}" />
<meta itemprop="name" content="Тест видеотрансляции" />
<meta itemprop="description" content="Тест видеотрансляции. Mediarecorder API." />`
return s;
}
