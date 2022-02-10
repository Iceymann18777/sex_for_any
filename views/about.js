const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');
const icons_menu = require('./icons_menu');
const html_admin_nav_menu = require('./html_admin_nav_menu');
const html_footer = require('./html_footer');
const redact_proto = require('./redact_proto');
const { get_meta } = require('./get_meta');

const about = function(n){
	let buser = n.user;
	return `<!DOCTYPE html><html lang="en"><!-- about.js -->
<head>${html_head.html_head({title: 'О сайте', 
meta:
  get_meta({
url: n.meta.url, 
image: n.meta.image,
 site_name: n.meta.site_name, 
 title: n.meta.about.title, 
description: n.meta.about.description
}),
csslink: "/css/main2.css", cssl: ["/css/advertise.css"], luser:buser})}
</head>
<body>${n.warnig ? `<div id="warnig">${n.warnig}</div>` : ''}
<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
${icons_menu.icons_menu(n)}
${buser && buser.brole == 'superadmin' ?  html_admin_nav_menu.html_admin_nav_menu(n) : ''}
<main id="pagewrap">
<div id="right">
<article id="rArticle">
${n.art ? n.art.art : 'Пусто.'}
</article>
${buser && buser.brole == 'superadmin' ? redact_proto.redact_proto("/api/save_post_about", "about") : ''}
</div></main><script src="/js/advertise.js"></script>
	</div></main><footer id="footer">${html_footer.html_footer({})}</footer>
	</body></html>`;
	}
	module.exports = { about }
