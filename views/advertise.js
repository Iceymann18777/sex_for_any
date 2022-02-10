const html_head = require('./html_head'),
    html_nav_menu = require('./html_nav_menu'),
	html_admin_nav_menu = require('./html_admin_nav_menu.js'),
   html_footer = require('./html_footer');
   const icons_menu = require('./icons_menu');
   const { get_meta } = require('./get_meta');
   const redact_proto = require('./redact_proto');
const { js_help } = require('../libs/helper.js');
const advertise = n=>{
const buser = n.user;
return `<!DOCTYPE html><html lang="en"><!-- advertise.js -->
<head>${html_head.html_head({title: 'Реклама на сайте',
 meta: 
  get_meta({
url: n.meta.url, 
image: n.meta.image,
 site_name: n.meta.site_name, 
 title: n.meta.reklama.title, 
description: n.meta.reklama.description
}),
csslink: "/css/main2.css"/*,js: [""]*/,cssl: ["/css/advertise.css"]})}
</head>
<body>${n.warnig ? `<div id="warnig">${n.warnig}</div>` : ''}
<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
${icons_menu.icons_menu(n)}
${buser && buser.brole == 'superadmin' ? html_admin_nav_menu.html_admin_nav_menu(n) : ''}

<div id="haupt-banner"><b>Главный баннер.</b>
<a href="#"><img src="/reklama/a4.jpg"/></a>
</div>
<main id="pagewrap"><div id="right"><h1>Заказать рекламу.</h1>
<article id="rArticle">
${n.art ? n.art.art : 'Пусто.'}
</article>
${buser && buser.brole == 'superadmin' ? redact_proto.redact_proto("/api/save_post_advertise", "ads") : ''}
<div><b>Баннер в подвале.</b></div>
<section id="reklamaPodval">
<div class="f"><a class="a" href="#"><img class="img" src="/reklama/b3.jpg"/></a></div></section>
</div></main>
<footer id="footer">${html_footer.html_footer({banner:n.banner})}</footer>
</body>
${buser && buser.brole == "superadmin" ? js_help(["/js/advertise.js"]) : ''}
</html>`;
}
module.exports = { advertise }
