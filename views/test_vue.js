const html_head = require('./html_head');
const html_footer = require('./html_footer');
const test_vue = function(n){
const buser = n.user;
return `<!DOCTYPE html><html lang="en"><!-- test_vues.js -->
<head>${html_head.html_head({
title: "vue app",
csslink: "/css/main2.css", 
cssl: [ "/css/vue_page.css" ]
})
}

<!-- <script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router@2.0.0/dist/vue-router.js"></script>
-->
<script src="vue.js"></script>
<script src="vue-router.js"></script>
<!-- <script src="https://unpkg.com/vuex@2.0.0"></script> -->
<script src="vuex.js"></script>


</head>
<body>
<main id="pagewrap">
<div id="right">
<!-- <a href="/logout">Выйти</a> -->
<h6>Vue demo</h6>
<h6>Hello <span id="bSpan">${buser ? buser.bname : 'guest'}</span>!</h6>
пользователь: slava &nbsp;пароль: 1234
<input type="hidden" id="myId" value="${buser ? buser.id : 0}">
<div id="app"><app></app></div>
<!-- Я не смог воспользоваться сборщиком, так как проект на старом nodejs 8  крутится, а vue-cli не работает ниже десятой версии -->
<script src="/src/components/note_list.js"></script>
<script src="/src/components/Note.js"></script>
<script src="/src/components/modal_window.js"></script>
<script src="/src/components/login.js"></script>
<script src="/src/components/Header.js"></script>
<script src="/src/components/APP.js"></script>

<script src="/src/routes/route.js"></script>
<script src="/src/store/modules/noteS.js"></script>
<script src="/src/store/modules/auth.js"></script>
<script src="/src/store/index.js"></script>

<script src="/src/App.js"></script>
</div>
</main>
${buser ? '' : ''}
<footer id="footer">${html_footer.html_footer({ banner: n.banner })}</footer>

</body></html>`;
}
module.exports = { test_vue }
