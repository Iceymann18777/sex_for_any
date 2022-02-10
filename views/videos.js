const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');
const icons_menu = require('./icons_menu');
//const vert_menu = require('./vert_menu.js');
const { videos_proto } = require('./videos_proto');
const html_admin_nav_menu = require('./html_admin_nav_menu');
const html_footer = require('./html_footer');
const moment = require('moment');
const doska = require('./doska');
const { get_banner, get_banner_podval } = require('./reklama_s');
const { site_name } = require('../config/app.json');
const videos = function(n){
const buser = n.user;
n.current = "videos";
return `<!DOCTYPE html><html lang="en"><!-- videos.js -->
<head>${html_head.html_head({title:"Видео", meta: get_meta(n.meta), csslink:"/css/main2.css",cssl:["/css/videos.css"], luser:buser})}
</head>
<body>${n.warnig ? `<div id="warnig">${n.warnig}</div>` : ''}
<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
${icons_menu.icons_menu(n)}
${buser && buser.brole == 'superadmin' ? html_admin_nav_menu.html_admin_nav_menu(n) : ''}
${n.banner && n.banner.length ? `<div id="haupt-banner">${get_banner(n.banner)}</div>` : ''}
<main id="pagewrap">

<div id="right">
<h1>${n.user ? n.user.lng == 'ru' ? 'Презентационные Видео' : 'Presentation Videos' : 'Презентационные Видео / Presentation Videos'}</h1>
<section id="uservideo">${n.videos && n.videos.length > 0 ? videos_proto(n) : 'Нет видео / No video yet.'}</section>
<hr><div id="getMorediv"><button id="getVideosBtn" onclick="get_more_videos(this);">more videos</button></div><hr>
${doska.doska({})}
<hr>
${n.banner && n.banner.length ? `<section id="reklamaPodval">${get_banner_podval(n.banner)}</section>`:''}
<input id="superuser" type="hidden" value="${buser && buser.brole == 'superadmin' ? true : false}">
</div></main>
<script src="/js/videofiles.js"></script>
<footer id="footer">${html_footer.html_footer({banner:n.banner})}</footer></body></html>`;}
module.exports = { videos };


function get_meta(n){
let s='';
s+=`
<meta property="og:locale" content="ru_RU"/>
<meta property="og:type" content="website" />
<meta property="og:title" content="${n.video.title}" />
<meta property="og:url" content="${n.url}" />
<meta property="og:image" content="${n.image}" />
<meta property="og:description" content="${n.video.description}" />

<meta property="og:site_name" content="${n.site_name}" />
<meta itemprop="name" content="${n.video.title}" />
<meta itemprop="description" content="${n.video.description}" />`
return s;
}
