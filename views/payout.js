const html_head=require('./html_head'),
    html_nav_menu=require('./html_nav_menu'),
	html_admin_nav_menu=require('./html_admin_nav_menu.js'),
   html_footer = require('./html_footer');
  // const moment=require('moment');
  const {get_payout} = require('./payout_proto');
  const {one_token_btc} = require('../config/app.json');
  const icons_menu = require('./icons_menu');
   const vert_menu = require('./vert_menu.js');

const payout = n=>{
const buser = n.user;
n.current = "dashboard";
return `<!DOCTYPE html><html lang="en"><!-- payout.js -->
<head>${html_head.html_head({title:"Выплаты",
csslink:"/css/main2.css"/*,js:[""]*/,cssl:["/css/payout.css"]})}
</head>
<body>${n.warnig?`<div id="warnig">${n.warnig}</div>`:''}
<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
${icons_menu.icons_menu(n)}
${buser && buser.brole=='superadmin'?html_admin_nav_menu.html_admin_nav_menu(n):''}
<main id="pagewrap">
${vert_menu.vert_menu(n)}
<div id="right">
<div><a href="/promopayout">Смотреть promo выплаты</a></div>
<h3>Выплаты</h3>
${n.payout  && n.payout.length > 0 ? get_payout(n.payout, one_token_btc):'Нет выплат'}
</div></main>
<script src="/js/payout.js"></script>
<footer id="footer">${html_footer.html_footer({banner:n.banner})}</footer>
</body></html>`;
}
module.exports = {payout}
