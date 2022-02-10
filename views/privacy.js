const html_head = require('./html_head.js'); // head.js 
const html_nav_menu = require('./html_nav_menu.js');// header_menu.js
const html_admin_nav_menu = require('./html_admin_nav_menu.js');// admin_main_menu.js
const html_footer = require('./html_footer.js');// footer.js
const icons_menu = require('./icons_menu');
const { get_meta } = require('./get_meta');
const redact_proto = require('./redact_proto');
const { js_help } = require('../libs/helper.js');
let privacy = n=>{
const buser = n.user;
return `<!DOCTYPE html><html lang="en"><head>${html_head.html_head({title: "privacy", 
meta: get_meta({
url: n.meta.url, 
image: n.meta.image,
 site_name: n.meta.site_name, 
 title: n.meta.privacy.title, 
description: n.meta.privacy.description
}),
 csslink: "/css/main2.css",
cssl: ["/css/advertise.css"]})}
</head><body><!-- privacy.js -->
${n.warnig ? `<div id="warnig">${n.warnig}</div>` : ''}
<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
${icons_menu.icons_menu(n)}
${buser && buser.brole == 'superadmin' ? html_admin_nav_menu.html_admin_nav_menu(n) : ``}
<main id="pagewrap"><div id="right">
<article id="privacyArticle">${n.result?n.result.art : 'Пусто.'}</article>
${buser&&buser.brole == 'superadmin' ? redact_proto.redact_proto("/api/save_post_privacy", "privacy") : ''}
</div></main>
${buser&&buser.brole=="superadmin"?js_help(["/js/advertise.js"]):''}
<footer id="footer">${html_footer.html_footer({banner:n.banner})}</footer></body></html>`;
}
module.exports = { privacy }
