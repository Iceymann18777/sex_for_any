
const html_head = require('./html_head'),
    html_nav_menu = require('./html_nav_menu'),
	html_admin_nav_menu = require('./html_admin_nav_menu.js'),
   html_footer = require('./html_footer');
   const moment = require('moment');
   const { get_banner, get_banner_podval } = require('./reklama_s');
   const { AFTER_REGISTRATION } = require('../config/mail.js');
   const doska = require('./doska');
   const icons_menu = require('./icons_menu');
   //const vert_menu = require('./vert_menu.js');
   
   const { people } = require('./people');
const { js_help } = require('../libs/helper.js');
const owner_str_ru = "Чтобы начать стрим, нажмите на 'веб камера', затем на 'Cтарт'. Чтобы закончить стрим, нажмите на 'Cтоп'.";
const owner_str_en = "To start a stream press 'web camera', then press 'start'. To end up the stream press 'Stop'";

const webcamowner_str_ru = "Чтобы начать стрим, нажмите на на 'Cтарт'. Чтобы закончить стрим, нажмите на 'Cтоп'.";
const webcamowner_str_en = "to get started a stream press 'Start'. To end up the stream press 'Stop'.";

const notowner_str_ru = "Привет! Вы можете запросить у меня приват : ) Жми 'Приват'!";
const notowner_str_en = "Hello there! Why not to ask me for a privat? : ) Press 'Privat'!";

const streaminterupt_str_ru = "Конец стрима";
const streaminterupt_str_en = "That's all";
//const owner_online_str_en="Press start"
//const you_ban="You are banned.";
//const us_ban="This user is banned.";
const str_langsam_stop="We are sorry, but no more activity is acceptable. Site is closing for a profilactic works in a pair of hours.";
const str_emergency_stop="Emergency stop all activities on this site. We are sorry";
const chat_room = n=>{
const buser = n.user;
let { model } = n;
n.current = "videoroom";
return `<!DOCTYPE html><html lang="en"><!-- chat_room.js -->
<head>${html_head.html_head({title:model?model.bname:'-', meta: get_meta(n.meta, model),
csslink:"/css/main2.css"/*,js:[""]*/,cssl:["/css/video_chat2.css"]})}
${model.ava && process.env.DEVELOPMENT !== 'yes' ? '<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>' : ''}
</head>
<body>${n.warnig ? `<div id="warnig">${n.warnig}</div>` : ''}
<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
${icons_menu.icons_menu(n)}
${buser && buser.brole == 'superadmin' ? html_admin_nav_menu.html_admin_nav_menu(n) : ''}
${n.banner && n.banner.length ? `<div id="haupt-banner">${get_banner(n.banner)}</div>` : ''}
<main id="pagewrap">
<div id="right">
${n.message && n.message.info == 'promo' ? buser ? buser.lng == 'ru' ? AFTER_REGISTRATION({}).ru : AFTER_REGISTRATION({}).en : '' : ''}
<!-- {JSON.stringify(model)} -->
<h2>${n.user ? n.user.lng == 'ru' ? 'Комната': 'Room': 'Комната'} ${model ? model.bname : 'Анон'}</h2>
${!n.owner ? `
<div id="imgavatar2">
${model.ava ? `<img id="modelava" data-avid="${model.id}" onerror="foto_error(this);" src="${model.ava}">` : `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">

<g><g><path d="M387.3,105.9c-50.3,37.4-63.8,96.7-61.4,128.3c3.2,38.6,11,88.8,11,88.8s-15.5,8.4-15.5,42.3c5.4,85,33.8,48.3,39.7,85.6c14.1,89.8,46.2,73.8,46.2,122.9c0,81.7-33.7,119.8-138.8,165.1C163.1,784.2,54.3,841.4,54.3,940.5V990h891.4v-49.5c0-99-108.8-156.2-214.3-201.6c-105.1-45.3-138.7-83.4-138.7-165.1c0-49,32-33,46.2-122.9c5.9-37.3,34.3-0.6,39.8-85.6c0-33.9-15.6-42.3-15.6-42.3s7.8-50.2,10.9-88.8c3.2-40.5-19.7-126.8-113.9-153.3c-16.5-16.8-27.6-43.6,23.1-70.5C472.2,5.1,446.4,63.2,387.3,105.9L387.3,105.9z"/></g></g>
</svg>`}</div>`:''}
${!n.owner ? `<p>${model.bage},&nbsp;${model.sexor}</p>` : ''}
${!n.owner ? `<p>${model.stat ? model.stat : ''}</p>` : ''}
${!n.owner && n.user ? `<p><b>Email:</b>&nbsp;<a href="mailto:${model.email}">${model.email}</a></p>` : ''}
${model.ava ? `<hr><button id="webPush" data-modelid="${model.id}" onclick="subscribe_webpush(this);"><b>subscribe to know when ${model.bname} is online</b></button>
<span id="spanSubscriptors">0</span><hr><output id="out7"></output><hr>` : ''}
${n.owner?
`<div class="btc-footer">
<!-- <button onclick="test_cb();">test callback</button> -->
<!-- <div>У вас <span id="bitcoinCount">{(model.items * model.proz)/100}</span> рублей. <a href="/userpay/${model.bname}">Посмотреть выплаты.</a></div> -->
<!-- <h5>${n.user.lng == 'ru' ? 'Заполните профайл (необязательно)': 'Fill out your profile (not obligatory)'}</h5> -->
<div id="anketaHeader"><div id="anketaH">${n.user.lng == 'ru' ? 'Заполните профайл (необязательно)': 'Fill out your profile (not obligatory)'}</div>
<div class="anketa-show-container"><span id="anketaToggle" onclick="anketaToggle(this);">${n.user.lng == 'ru' ? 'Скрыть' : 'Hide'}</span></div><div class="arrow-rotate" id="arrowDown"></div>
</div>
<section id="anketa" class="">
<div>
<div class="requis">
<p>${n.user.lng == 'ru' ? 'Ждем вашей аватарки с улыбающимся лицом. Так выше шансы завести денежных поклонников' : 'Here is your avatar with your smiling face. For top chances to get rich fans.'}</p>
<div id="avacontainer">
${model.ava ? `<img id="imgavatar" data-avid="${model.id}" onerror="" src="${model.ava}">` : `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
<g><g><path d="M387.3,105.9c-50.3,37.4-63.8,96.7-61.4,128.3c3.2,38.6,11,88.8,11,88.8s-15.5,8.4-15.5,42.3c5.4,85,33.8,48.3,39.7,85.6c14.1,89.8,46.2,73.8,46.2,122.9c0,81.7-33.7,119.8-138.8,165.1C163.1,784.2,54.3,841.4,54.3,940.5V990h891.4v-49.5c0-99-108.8-156.2-214.3-201.6c-105.1-45.3-138.7-83.4-138.7-165.1c0-49,32-33,46.2-122.9c5.9-37.3,34.3-0.6,39.8-85.6c0-33.9-15.6-42.3-15.6-42.3s7.8-50.2,10.9-88.8c3.2-40.5-19.7-126.8-113.9-153.3c-16.5-16.8-27.6-43.6,23.1-70.5C472.2,5.1,446.4,63.2,387.3,105.9L387.3,105.9z"/></g></g>
</svg>`}
</div>
</div>
<div class="requis">
<form name="avaprofi" action="/api/save_ava" method="post">
<label for="avfile"><strong>${n.user.lng == 'ru' ? 'Ваш аватар' : 'Your avatar'}:</strong></label><br>
<input id="avfile" type="file" name="zfile" accept="image/*" onchange="thumb(this.files);" required>
<input type="hidden" name="fname" value="${model ? model.bname : ''}">
</div>
<div class="requis"><input type="submit" value="${n.user.lng == 'ru' ? 'загрузить': 'Upload'}"></div>
</form>

<div>
<div class="requis">
<form name="alterform" method="post" action="/api/save_alter">
<label for="alterid"><strong>${n.user.lng == 'ru' ? 'Сколько вам лет?' : 'How old are you?'}</strong></label><br>
<input id="alterid" name="alter" type="number" min="10" max="100" value="${model.bage == '18' ? '18' : model.bage}" required>&nbsp;&nbsp;
<input type="hidden" name="fname" value="${model?model.bname:''}">
<input type="submit" name="submit" value="${n.user.lng == 'ru' ? 'Сохранить' : 'Save'}">
</form>
</div>
<!-- {JSON.stringify(model)}<br> -->
<div class="requis"><form name="sexform" method="post" action="/api/save_sex">
	<label for="zType"><strong>${n.user.lng == 'ru' ? 'Выберите сексуальную ориентацию' : 'Select your sexuel orientation'}</strong></label><br>
	<select name="sexorient" id="zType" required>
	<option value="hetero" ${model.sexor == 'hetero' ? 'selected' : ''}>${n.user.lng == 'ru' ? 'гетеро' : 'hetero'}</option>
	<option value="gay" ${model.sexor == 'gay' ? 'selected' : ''}>${n.user.lng == 'ru' ? 'гей' : 'gay'}</option>
	<option value="bi" ${model.sexor == 'bi' ? 'selected' : ''}>${n.user.lng == 'ru' ? 'би' : 'bi'}</option>
	<option value="lesbi" ${model.sexor == 'lesbi' ? 'selected' : ''}>${n.user.lng == 'ru' ? 'лесби' : 'lesbi'}</option>
	<option value="trans" ${model.sexor == 'trans' ? 'selected' : ''}>${n.user.lng == 'ru' ? 'транс' : 'trans'}</option>
	</select>
	<input type="hidden" name="fname" value="${model?model.bname:''}">&nbsp;&nbsp;
	<input type="submit" name="submit" value="${n.user.lng == 'ru' ? 'Сохранить' : 'Save'}">
	</form>
	</div>

<div class="requis"><strong><label for="roomdescr">${n.user.lng == 'ru' ? 'Статус' : 'Status'}:</strong></label><br>
<input type="text" id="roomdescr" maxlength="200" placeholder="${n.user.lng == 'ru' ? '200 знаков' : '200 letters'}" value="${model&&model.stat?model.stat:''}">
</div>
<div><button data-bname="${model ? model.bname : ''}" onclick="save_status(this);">${n.user.lng == 'ru' ? 'Cохранить' : 'Save'}</button></div>
</div>
<div class="inwrap3"><label><strong>${n.user.lng == 'ru' ? 'Выберите язык' : 'Choose a language'}</strong></label></div>
<div class="inpwrap"><label class="cntlb">&nbsp;&nbsp;<b style="color:black;">русский</b><input onchange="change_language(this);" type="radio" name="lang" value="ru" ${n.user.lng == 'ru' ? 'checked' : ''}><span class="mark"></span></label>
&nbsp;&nbsp;<label class="cntlb">&nbsp;&nbsp;<b style="color:black;">english</b><input onchange="change_language(this);" type="radio" value="en" name="lang" ${n.user.lng == 'en' ? 'checked' : ''}>
<span class="mark"></span></label></div>
</div>

<div id="btc-container" class="requis">
<label id="bInput">${n.user.lng == 'ru' ? 'Введите свой' : 'Enter your'} ${n.is_test_btc ? 'test' : ''} <b>${n.user.lng == 'ru' ? 'биткоин адрес' : 'bitcoin address'}</b> ${n.user.lng == 'ru' ? 'для донатов' : 'for donations'} (<a href="${n.user.lng == 'ru' ? '/basa' : 'https://support.bitcoin.com/en/articles/3542817-where-can-i-find-my-bitcoin-address'}">
${n.user.lng == 'ru' ? 'где взять' : 'where to get'}?</a>):</label><br>
<input id="btcInput" class="btc-input" type="text" 
value="${n.is_test_btc ? model.cadrtest !== null ? model.cadrtest : '' : model.cadr !== null ? model.cadr:''}" 
maxlength="35" spellcheck="false" autocomplete="off" placeholder="your ${n.is_test_btc?'test':''} btc address"/>
<button ${(model.cadrtest !==null && model.cadr !== null) ? 'disabled':''} id="btnSaveAdr" 
class="btn-saveL" onclick="saveBTC(this);">${n.user.lng == 'ru' ? 'Cохранить' : 'Save'}</button>&nbsp;<button class="btn-saveL" onclick="reset_btc();">${n.user.lng=='ru'?'редактировать':'Edit'}</button>
</div></section></div>`:''}

${n.owner?'' : model.padrtest || model.padr ? `<div id="btcInfo" style="">
<span>${n.user?n.user.lng == 'ru' ? 'Донаты для ' : 'Donations for' : 'Донаты для'} ${model?model.bname:'Анон'} ${n.user?n.user.lng=='ru'?'на биткоин адрес':'to the bitcoin address':'на биткоин адрес'} :</span>
<span><b>${n.is_test_btc && model ? model.padrtest: model ? model.padr : ''}</b></span></div>`:''}
<!-- <video src="/vid/sveta.webm" style="border:2px solid red;"#000000#000000#000000 autoplay></video>
ffmpeg -i lex.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus lex.webm -->
<section id="media-wrapper">
<div id="mediaPanel">
<!-- &nbsp;&nbsp;<b>viewers:&nbsp;</b><span id="rviewers">0</span>-->
<div id="tokencount"><span id="tokencc">${model ? model.items: 0}</span>&nbsp;<span id="tokenspan">${n.user?n.user.lng=='ru'?'токенов':'tokens':'токенов'}</span></div>
<div id="onlineDetector2" class=""></div>
<div id="btccount"><span id="btcc">${model.btc_all ? model.btc_all: 0}</span>&nbsp;<span id="btcspan">${n.user?n.user.lng=='ru'?'сатоши':'satoshi':'сатоши'}</span></div>
</div>
<section id="video-container">
<div id="video-wrapper" class="${n.owner?'owner':'notowner'}"
data-owner="${n.user?n.user.lng=='ru'?owner_str_ru:owner_str_en:owner_str_ru}"
 data-notowner="${n.user ? n.user.lng == 'ru' ? notowner_str_ru : notowner_str_en:notowner_str_ru}"
  data-streaminterupt="${n.user ? n.user.lng == 'ru' ? streaminterupt_str_ru : streaminterupt_str_en : streaminterupt_str_ru}" data-connecting="Connecting..."
 data-webcamowner="${n.user?n.user.lng=='ru'?webcamowner_str_ru:webcamowner_str_en:webcamowner_str_ru}" data-privat="Приват / Privat">
<video id="remoteVideo" muted autoplay></video>
<video id="localVideo" class="" muted autoplay></video>
</div>
<div id="under-video">
<div id="privatcontainer" class="">
<div id="privatpanel"><span onclick="on_span();">${n.user ? n.user.lng == 'ru' ? 'приватчат' : 'privatchat' : 'приватчат'}</span></div>
<div id="privatchat"></div>
<input id="privatinput" type="text" placeholder="${n.user ? n.user.lng == 'ru' ? 'Приват сообщение' : 'Privat message' : 'Приват сообщение'}">
</div>
${n.owner ? '' : model.padrtest || model.padr ? `<a href="bitcoin:${n.is_test_btc? model.padrtest:model.padr}">
<img id="btnDonate" src="/images/bitcoin-button.png-bitcoin-button.png"></a>`:''}
</div>
<div id="under-video2">${get_undervideo_buttons(n)}</div>
<div id="dopPanel">
${n.owner ? `<label class="label-galka" id="sochrVideo"><span>${n.user.lng == 'ru' ? 'Записать видео' : 'Record video'}</span>
<input id="ifRecord" type="checkbox" onchange="changeRecord(this);" disabled/><span class="galka"></span></label>
<button id="btnStart" class="" onclick="snapshot();" title="Snapshot / Снимок">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">

<g><path d="M951.7,244.3c-25.5-25.5-56.3-38.3-92.4-38.3H745l-26-69.4c-6.5-16.7-18.3-31-35.5-43.1c-17.2-12.1-34.8-18.1-52.8-18.1H369.3c-18,0-35.6,6-52.8,18.1c-17.2,12.1-29,26.5-35.5,43.1L255,206H140.7c-36.1,0-66.9,12.8-92.4,38.3C22.8,269.8,10,300.6,10,336.7V794c0,36.1,12.8,66.9,38.3,92.4c25.5,25.5,56.3,38.3,92.4,38.3h718.7c36.1,0,66.9-12.8,92.4-38.3c25.5-25.5,38.3-56.3,38.3-92.4V336.7C990,300.6,977.2,269.8,951.7,244.3z M661.6,726.9C616.8,771.6,563,794,500,794c-63,0-116.8-22.4-161.5-67.1c-44.8-44.7-67.1-98.6-67.1-161.5c0-63,22.4-116.8,67.1-161.5C383.2,359,437,336.7,500,336.7c63,0,116.8,22.4,161.5,67.1c44.8,44.7,67.1,98.6,67.1,161.5C728.7,628.3,706.3,682.1,661.6,726.9z"/><path d="M500,418.3c-40.5,0-75.1,14.4-103.9,43.1c-28.8,28.8-43.1,63.4-43.1,103.9s14.4,75.1,43.1,103.9c28.8,28.8,63.4,43.1,103.9,43.1c40.5,0,75.1-14.4,103.9-43.1c28.8-28.8,43.1-63.4,43.1-103.9s-14.4-75.1-43.1-103.9C575.1,432.7,540.5,418.3,500,418.3z"/></g>
</svg>
</button>`:''}
<!-- mute / unmute the sound -->
</div>
</section>

<section id="chat-container"><div id="chatPanel"><div><b>${n.user ? n.user.lng == 'ru' ? 'В&nbsp;чатe&nbsp;' : 'In&nbsp;chat&nbsp;' : 'В&nbsp;чатe&nbsp;'}</b><span id="chatcnt">0</span>&nbsp;${n.user?n.user.lng=='ru'?'чел':'people':'чел'}.</div></div>
<div id="chat"></div>
<div id="under-chat">
<textarea id="chatTxt"  class="chat-txt" type="text" placeholder="${n.user ? n.user.lng == 'ru' ? 'ваше сообщение' : 'your message' : 'ваше сообщение'}" maxlength="200"></textarea>
</div>
<div id="under-chat2">
<button id="btnFoto" onclick="insert_img();" title="${n.user ? n.user.lng == 'ru' ? 'вставить фотографию' : 'insert photo' : 'вставить фотографию'}">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">

<g><path d="M351.7,471.2c0-33.7,27.3-61.1,61.1-61.1c33.7,0,61.1,27.3,61.1,61.1c0,33.7-27.3,61.1-61.1,61.1C379.1,532.2,351.7,504.9,351.7,471.2z M90,191h753.4v-80L10,111v633.8h80V191z M661.4,473.1L560.2,616.9l-55-56.7L350,736.6h485.1L661.4,473.1z M990,267v622H166.1l0-622H990z M910,347h-664v462h664V347z"/></g>
</svg>
</button>
<button id="sendChat" class="btn-start" onclick="send_up(this);">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
nn
<g><path d="M10,991.1l980-493.2L10,8.9l101.1,415.7l532.7,73.4l-532.7,70.5L10,991.1z"/></g>
</svg>
</button>
</div>

</section>

</section>
 <div style="clear:both;"></div> 

${n.owner ? '' : `${model.padrtest || model.padr?`<br><header>${n.user ? n.user.lng == 'ru' ? 'Биткоин адрес для донатов' : 'Bitcoin address for donations' : 'Bitcoin address for donations'} ${model.bname}</header><div id="qrcodeContainer"><div id="qrcode"></div></div>`:''}`}
${n.owner_video ? `<h4>Presentation Video ${model ? model.bname : ''}</h4><div id="owner_video_section" data-rid="${n.owner_video.r_id}">
<div id="owner_video_container">
<video data-videoid="${n.owner_video.r_id}" ${n.owner_video.poster ? `poster="/prof_video/${n.owner_video.poster}"` : ''} src="/prof_video/${n.owner_video.src}" controls preload="none" onplay="view_play(this);">No html5 video supported.</video></div>
<div><span>views: ${n.owner_video.v}</span>${n.owner ? `<div><button data-bid="${n.owner_video.r_id}" onclick="del_video(this);">delete</button></div>` : ''}</div></div>` : ''}
<hr>
${n.owner ? `
<p>
You can record your presentation one-minute video.
</p>
<p>Вы можете записать одноминутное видео о себе и загрузить его на сервер.</p>
<section id="videowrapper2">
<div class="videocontainer2">
<div class="vheader">Video 1</div>
<div class="vbox">
<video id="gum" playsinline autoplay muted controls></video>
</div>
</div>
<div class="videocontainer2">
<div class="vheader">Video 2</div>
<div class="vbox">
<video id="recorded" playsinline loop controls></video>
</div>
</div>
</section>

    <div class="div2">
        <button class="button" id="start">Start camera</button>
        <button class="button" id="record" disabled>Start Recording</button>
        <button class="button" id="play" disabled>Play</button>
        <button class="button" id="download" disabled>Upload</button>
    </div>

    <div class="div2">
        Recording format: <select id="codecPreferences" disabled></select>
    </div>
    <div class="div2">
        <h4>Media Stream Constraints options</h4>
        <p>Echo cancellation: <input type="checkbox" id="echoCancellation"></p>
    </div>

    <div class="div2">
        <span id="errorMsg"></span>
    </div><script src="/js/record.js"></script>
` : ''}

<hr>
${doska.doska(n)}
<hr>${people({})}
${n.banner && n.banner.length ? `<section id="reklamaPodval">${get_banner_podval(n.banner)}</section>` : ''}
<script>

</script>
<output id="webrtc"></output>
<input type="hidden" id="randomStr" value="${n.randomStr}">
<input type="hidden" id="owner" value="${n.owner}">
<input type="hidden" id="buser" value="${buser ? true : false}">
<input type="hidden" id="yourNick" value="${buser ? buser.bname :'Anon'}">
<input type="hidden" id="yourLang" value="${buser ? buser.lng : 'ru'}">

<input type="hidden" id="isfake" value="${model && model.brole == 'fake' ? true: false}">
<input type="hidden" id="fakesrc" value="${n.videos ? n.videos.src: ''}">

<input type="hidden" id="modelName" value="${model ? model.bname: ''}">
<input type="hidden" id="modelId" value="${model ? model.id: ''}">
<input type="hidden" id="modelProzent" value="${model ? model.proz: ''}">
<input type="hidden" id="xirTarget" value='${n.xirsys ? JSON.stringify(n.xirsys): ''}'>
<input type="hidden" id="invoici" value="${model.inv !== null ? model.inv:''}">
<input type="hidden" id="devTarget" value="${process.env.DEVELOPMENT == 'yes' ? 'y': 'n'}">



<a href="#" class="overlay" id="insImg" onclick="in_rem_hash();"></a>
<div id="setImg" class="popi">
<div class="wrap-close"><a href="#." class="close" onclick="in_rem_hash();"></a></div>
<div id="pizda1">
<label for="forImg">${n.user ? n.user.lng == 'ru' ? 'Введите адрес картинки.' : 'Enter url of a pic.' : 'Введите адрес картинки.'}'</label><br><br>
<input id="forImg" type="text" placeholder="${n.user ? n.user.lng == 'ru' ? 'адрес фото' : 'pic\'s url' : 'адрес фото'}"/>
<br><br><br><button onclick="send_ws_img();">${n.user ? n.user.lng == 'ru' ? 'Отправить' : 'Send' : 'Отправить'}</button>
</div>
</div>

<a href="#" class="overlay" id="privatid" onclick="in_rem_hash();gno();"></a>
<div id="privat2" class="popi">
<div class="wrap-close"><a href="#." class="close" onclick="in_rem_hash();gno()"></a></div>
<div id="pizda2">
<div id="privatdialog" data-target=""></div>
<div>
<label class="label-galka">&nbsp;<span>${n.user ? n.user.lng == 'ru' ? 'Позволить клиенту бесплатное шоу':'Let it be show for free?':'Позволить клиенту бесплатное шоу'}</span<input id="ifGratis" type="checkbox"/><span class="galka"></span></label>
</div>
<div class="vrite"><button onclick="gno(this)">нет / no </button>&nbsp;&nbsp;<button onclick="gyes(this);">да / yes</button>
</div></div>
</div>


</div></main>
<footer id="footer">${html_footer.html_footer({banner:n.banner})}</footer>
<script nomodule src="/js/adapter-latest.js"></script>
${js_help(["/js/chat_room.js","/js/qrcode.min.js"])}
<!-- github.com/zhiyuan-l/qrcodejs -->
<script>${!n.owner ? model.padrtest || model.padr ? `new QRCode(gid("qrcode"),{
text:"${n.is_test_btc ? model.padrtest !== null ? model.padrtest : '' : model.padr !== null ? model.padr : ''}",
width: 128, height: 128, border: 4});`:'':''}</script>
</body>
</html>`;
}
module.exports = { chat_room };
/*
 for trigger
 delete from chat where tz=(select min(tz) from chat where us_id=1); -- if count == lim
 select tz from chat where us_id=1 limit 3; 
 delete from chat where //us_id=1\\ and tz in (select tz from chat where us_id=1 limit 3); --if count > lim
 */ 
 
function get_meta(n, model){
let s='';
s+=`
<meta property="og:locale" content="ru_RU" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${n.url}" />
<meta property="og:image" content="${n.image}" />
<meta property="og:title" content="Чат комната ${model?model.bname:''}." />
<meta property="og:description" content="${n.main_page.description}" />

<meta property="og:site_name" content="${n.site_name}"/>
<meta itemprop="name" content="Чат комната ${model?model.bname:''}." />
<meta itemprop="description" content="${n.main_page.description}" />`
return s;
}
function get_videos(n,l){
let s='';
n.forEach(function(el,i){
s+=`<div class="videodiv" data-id="${el.id}" data-at="${el.cr_at}">
<div><span><a href="/webrtc/${el.usid}">${el.nick}</a></span>&nbsp;<span>${moment(el.cr_at).format('DD-MM-YYYY')}</span>&nbsp;
<span>Просмотров: </span><span>${el.v}</span></div>
<video data-vid="${el.id}" src="/vid/${el.src}" controls onplay="vplay(this);"></video>
<div>${l.owner?`<button data-bid="${el.id}" data-src="${el.src}" onclick="del_video(this);">Удалить</button>`:''}</div>
</div>`;	
})	
return s;
}

function get_undervideo_buttons(n){
	let { model } = n;
	return html`
<button id="dopPanelbtn" title="Настройки / Settings" onclick="dopPanel_out(this);">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<g><g><path d="M500,304.4c-107.8,0-195.6,87.7-195.6,195.6c0,107.8,87.7,195.6,195.6,195.6c107.8,0,195.6-87.7,195.6-195.6C695.6,392.2,607.8,304.4,500,304.4z M500,608.1c-59.6,0-108.1-48.5-108.1-108.1c0-59.6,48.5-108.1,108.1-108.1c59.6,0,108.1,48.5,108.1,108.1C608.1,559.6,559.6,608.1,500,608.1z"/><path d="M922.6,446.4l-3.1-1.4c-11.4-5.1-14.4-15.1-15.1-19.2c-0.8-4.1-1.5-14.5,7.3-23.3l2.4-2.4c33.3-33.1,42.9-80.5,25.1-123.6c-17.7-43-58.6-70.8-104.2-70.8c-8.1,0-16.4,0.9-24.6,2.6L807,209c-9.7,2-19.2-1.3-25.5-8.7c-2.9-3.4-7.5-10.7-5.8-21.1l0.5-3.4c5.4-33.6-3.4-66.1-25-91.4c-21.7-25.5-54.6-40.7-88-40.7c-32,0-61.7,13.4-83.7,37.8l-2.3,2.5c-6.5,7.2-14.1,8.7-19.3,8.7c-3.8,0-16.8-1-23.5-14.4l-1.5-3c-19.8-39.1-57.5-62.4-100.9-62.4c-59.6,0-107.4,42.8-113.6,101.7l-0.4,3.5c-1.6,15.3-14.7,23.5-26.1,23.5c-4.1,0-8.1-1-11.9-3l-3.1-1.6c-16.7-8.6-34.3-12.9-52.3-12.9c-40.2,0-77.9,22.1-98.5,57.7c-20.3,35.2-20.2,77.4,0.4,113.1l1.7,3c6.2,10.8,2.7,20.7,0.9,24.4s-7.3,12.7-19.6,14.6l-3.4,0.5C56,345.2,17.8,384.3,11,434.7c-6.7,50.4,20,98.2,66.4,118.9l3.1,1.4c11.4,5.1,14.4,15.1,15.1,19.2c0.8,4.1,1.5,14.5-7.3,23.3l-2.4,2.4C52.6,633,43,680.4,60.8,723.6c17.7,43,58.6,70.8,104.2,70.8c8.1,0,16.4-0.9,24.6-2.6l3.4-0.7c9.6-2.1,19.2,1.3,25.5,8.7c2.9,3.4,7.5,10.7,5.8,21.1l-0.5,3.4c-5.4,33.6,3.4,66.1,25,91.4c21.7,25.5,54.6,40.7,88,40.7c32,0,61.7-13.4,83.7-37.8l2.3-2.5c6.5-7.2,14.1-8.7,19.3-8.7c3.8,0,16.8,1,23.5,14.4l1.5,3c19.8,39.1,57.5,62.4,100.9,62.4c59.6,0,107.4-42.8,113.6-101.8l0.4-3.4c1.6-15.3,14.7-23.5,26.1-23.5c4.1,0,8.1,1,11.9,3l3.1,1.6c16.7,8.6,34.3,12.9,52.3,12.9c40.2,0,77.9-22.1,98.5-57.7c20.3-35.2,20.2-77.4-0.4-113.1l-1.7-3c-6.2-10.8-2.7-20.7-0.9-24.4s7.3-12.7,19.6-14.6l3.4-0.5c50.2-7.8,88.5-46.9,95.2-97.3C995.7,514.9,969,467.1,922.6,446.4z M902.3,553.7c-0.8,5.8-4.5,19.7-22,22.4l-3.4,0.5c-37.1,5.7-68.9,29.4-85.1,63.2c-16.2,33.8-14.7,73.4,4,105.9l1.7,3c5,8.8,5.2,17.4,0.4,25.7c-4.9,8.5-13.8,14-22.7,14c-4,0-8.2-1.1-12.4-3.2l-3.1-1.6c-16.3-8.4-33.8-12.6-51.9-12.6c-58.4,0-107,43.8-113.1,101.8l-0.4,3.4c-2,18.6-17.7,23.5-26.6,23.5c-7.1,0-16.8-2.5-22.8-14.5l-1.5-3c-19.5-38.5-58.4-62.4-101.6-62.4c-32.1,0-62.8,13.7-84.3,37.6l-2.3,2.5c-5.3,5.9-11.6,8.9-18.7,8.9c-8,0-16.2-3.8-21.4-9.9c-4.8-5.6-6.5-12.6-5.2-20.7l0.5-3.4c5.3-32.9-4-66.4-25.6-91.7c-21.7-25.5-53.2-40.1-86.4-40.1c-7.9,0-16,0.8-23.8,2.5l-3.4,0.7c-2.2,0.5-4.4,0.7-6.5,0.7c-12.2,0-20-8.6-23.4-16.7c-2.4-5.9-4.9-17.5,5.9-28.3l2.4-2.4c26.6-26.4,38.5-64.2,31.7-101.1c-6.8-36.9-31.3-68-65.5-83.3l-3.1-1.4c-16.2-7.2-16.1-21.6-15.3-27.4s4.5-19.7,22-22.4l3.4-0.5c37.1-5.7,68.9-29.4,85.1-63.2c16.2-33.8,14.7-73.4-4-105.9l-1.7-3c-5-8.8-5.2-17.4-0.4-25.6c4.9-8.5,13.8-14,22.7-14c4,0,8.2,1.1,12.4,3.2l3.1,1.6c16.3,8.4,33.8,12.6,51.9,12.6c58.4,0,107-43.8,113.1-101.7l0.4-3.5c2-18.6,17.7-23.5,26.6-23.5c7.1,0,16.8,2.5,22.8,14.5l1.5,3c19.5,38.5,58.4,62.4,101.6,62.4c32.1,0,62.8-13.7,84.3-37.6l2.3-2.5c5.3-5.9,11.6-8.9,18.7-8.9c8,0,16.2,3.8,21.4,9.9c4.8,5.6,6.5,12.6,5.2,20.7l-0.5,3.4c-5.3,32.9,4,66.4,25.6,91.7c21.7,25.5,53.2,40.1,86.4,40.1c7.9,0,16-0.8,23.8-2.5l3.4-0.7c2.2-0.5,4.4-0.7,6.4-0.7c12.2,0,20.1,8.6,23.4,16.7c2.4,5.9,4.9,17.5-5.9,28.3l-2.4,2.4c-26.6,26.4-38.5,64.2-31.7,101.1c6.8,36.9,31.3,68,65.5,83.3l3.1,1.4C903.1,533.5,903.1,547.9,902.3,553.7z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g>
</svg>
</button>
${n.owner ? `<button id="webcamStart" onclick="start_webCamera(this);" title="webcamera">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<path d="M6.613 18.581m9.387-9.581c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm-2 0c0-1.103-.896-2-2-2s-2 .897-2 2 .896 2 2 2 2-.897 2-2zm-9 0c0 3.86 3.141 7 7 7s7-3.14 7-7-3.141-7-7-7-7 3.14-7 7zm16 0c0 4.97-4.029 9-9 9s-9-4.03-9-9 4.029-9 9-9 9 4.03 9 9zm-.404 12.501c1.007 1.142-.014 2.679-1.448 2.481-1.795-.245-3.236-1.702-7.147-1.702-3.91 0-5.352 1.458-7.146 1.702-1.436.198-2.456-1.34-1.449-2.481l2.898-3.289c.559.388 1.156.725 1.79.994l-2.025 2.298c1.295-.524 3.065-1.225 5.933-1.225s4.638.7 5.933 1.224l-2.025-2.298c.634-.27 1.231-.606 1.79-.994l2.896 3.29z" fill="currentColor" fill-rule="nonzero"/>
</svg>
</button>
<button id="vStreamStart" disabled onclick="start_stream(this);">${n.user.lng == 'ru' ? 'Старт' : 'Start'}</button>`:
`<button id="soundBtn" onclick="popa(this);">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 1.269l-18.455 22.731-1.545-1.269 3.841-4.731h-1.827v-10h4.986v6.091l2.014-2.463v-3.628l5.365-2.981 4.076-5.019 1.545 1.269zm-10.986 15.926v.805l8.986 5v-16.873l-8.986 11.068z"/>
</svg>
</button>
<button id="teeTip"  onclick="give_token();" title="${n.user ? n.user.lng == 'ru' ? 'Чаевые' : 'Tip':'Чаевые / Tip'}">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<g><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"><path d="M4689.7,5016.6c-759.2-65.2-1353.5-232-1968.9-554.1c-893.4-465.9-1652.6-1236.6-2105-2137.6C264.9,1625.1,100,923.4,100,120.1c0-801.4,164.9-1506.9,513.8-2202.8c400.7-795.6,1071.7-1522.2,1842.4-1991.9c1608.5-981.6,3671.4-937.5,5249.1,111.2C9743.3-2608,10471.8,18.5,9423.1,2229c-245.4,511.9-540.6,927.9-964.3,1353.5c-784.1,784.1-1704.4,1240.4-2810.5,1397.6C5448.9,5008.9,4854.5,5031.9,4689.7,5016.6z M6620.2,3916.1c442.9-76.7,805.2-232,1031.4-442.9c320.1-301,301-640.3-53.7-931.7c-385.4-318.2-1154.1-494.6-1869.2-431.4c-910.6,82.4-1533.7,439-1572,897.2c-7.7,109.3-1.9,136.1,51.8,247.3c174.5,354.7,743.9,625,1468.5,697.8C5916.6,3977.5,6359.5,3960.2,6620.2,3916.1z M4354.2,2372.8c247.3-199.4,669.1-350.8,1175.2-421.8c318.3-46,924.1-32.6,1194.4,26.8c389.2,84.4,755.4,239.6,995,421.8c69,51.8,132.3,88.2,139.9,78.6c38.3-34.5,17.2-245.4-32.6-354.7c-126.5-278-571.3-542.5-1094.7-649.9c-375.8-76.7-920.2-86.3-1303.7-23c-709.4,118.9-1234.6,465.9-1271.1,837.8c-3.8,49.8-1.9,122.7,3.8,161c13.4,65.2,17.3,69,46,42.2C4223.8,2476.3,4290.9,2422.6,4354.2,2372.8z M7874.1,1653.9c1.9-408.3-456.3-736.2-1257.7-895.3c-239.6-47.9-937.5-47.9-1192.5,0c-270.3,51.8-496.5,120.8-686.3,212.8c-400.7,193.6-603.9,440.9-580.9,713.2c5.7,57.5,13.4,109.3,21.1,115c5.8,7.7,53.7-24.9,105.4-70.9c199.4-178.3,671-379.6,1058.3-452.4c260.7-49.8,1081.3-47.9,1332.4,0c492.7,97.8,912.6,283.7,1112,490.8C7854.9,1841.7,7874.1,1818.7,7874.1,1653.9z M4611.1,831.4c224.3-111.2,370-163,634.6-224.3c544.5-124.6,1267.2-95.9,1811.7,70.9c243.5,74.8,532.9,224.3,672.9,348.9c134.2,120.8,153.4,101.6,141.9-139.9c-7.7-180.2-224.3-429.4-488.9-569.4C7019,129.7,6652.9,43.4,6139,28.1c-396.9-9.6-649.9,13.4-962.4,92C4486.4,292.7,4087.7,658.9,4160.5,1048l13.4,69l126.5-97.8C4369.5,967.5,4509.5,881.3,4611.1,831.4z M2295.1,160.4l46-36.4l1.9-1062.1c1.9-600.1-3.8-1079.4-15.3-1106.2c-32.6-88.2-63.3-95.8-381.5-97.8c-274.2,0-304.8,3.8-350.8,40.3l-49.8,38.3v1087V108.6l42.2,44.1c40.3,42.2,51.8,44.1,352.8,44.1C2216.5,196.8,2254.9,193,2295.1,160.4z M4417.4,33.9c214.7-42.2,435.2-120.8,768.8-278c279.9-132.3,279.9-132.3,519.6-153.4c814.8-72.9,1248.1-168.7,1412.9-314.4c86.3-74.8,145.7-201.3,128.5-274.2c-23-95.9-126.6-272.2-187.9-320.2c-105.4-80.5-195.5-95.9-398.8-70.9c-149.5,17.2-920.2,63.3-1146.4,67.1c-166.8,1.9-312.5-9.6-295.2-23c9.6-9.6,115-57.5,232-105.4c362.4-151.5,582.8-184,1012.3-147.6c584.7,49.9,761.1,109.3,1054.4,360.4c134.2,115,304.8,205.1,450.5,235.8c337.4,72.9,598.1-157.2,421.8-370l-57.5-70.9l51.7-24.9c117-55.6,59.4-255-118.8-406.4c-147.6-128.4-881.9-623.1-1004.6-678.7c-65.2-30.7-178.3-57.5-306.7-74.8c-111.2-13.4-448.6-65.2-749.6-115c-469.7-76.7-586.7-90.1-834-90.1l-287.6-1.9l-233.9,101.6c-130.4,53.7-444.8,199.4-699.8,322.1c-1000.8,477.4-1117.7,527.2-1334.3,563.6c-308.7,51.8-281.8-28.8-281.8,862.7V-225l47.9,46c74.8,74.8,632.7,199.4,1102.4,249.2C3832.7,85.6,4260.2,64.6,4417.4,33.9z"/></g></g>
</svg>
</button>
<button class="btn-st" id="btnStartPrivat" onclick="begin_privat(this);" title="Privat room">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M3474.2,4981.1c-388.8-82.5-1011.3-349.5-1374.6-589.1C1306.4,3867.7,731,3137.2,393.3,2222.2c-86.4-231.7-168.9-549.8-168.9-650c0-208.1,214-335.8,386.8-229.8c88.4,53,117.8,106,153.2,274.9c157.1,746.2,648,1551.3,1256.7,2057.9c447.7,375.1,1015.2,661.8,1537.5,781.5c111.9,23.6,225.8,58.9,251.4,76.6c161,104.1,155.1,326-9.8,435.9C3723.6,5020.4,3666.7,5022.3,3474.2,4981.1z"/><path d="M7676.4,4468.6c-55-21.6-133.5-58.9-176.7-88.4c-104.1-64.8-1543.4-1515.9-1594.5-1604.3c-78.5-135.5-110-269-100.1-439.9c13.8-241.5,70.7-343.6,347.6-626.4l225.8-231.7L4941.1,42.5L3505.7-1394.9l-221.9,219.9c-312.2,312.2-518.4,404.5-787.4,355.4c-267.1-47.1-272.9-53-1107.5-885.6c-803.1-803.1-834.6-840.4-891.5-1064.3c-33.4-137.5-13.7-335.8,51.1-483c51.1-113.9,110-182.6,557.7-634.3c528.2-534.1,650-636.2,887.6-750.1c257.2-121.8,418.3-153.2,763.9-153.2c274.9,0,320.1,3.9,479.1,53c200.3,60.9,412.4,161,542,257.2c49.1,37.3,1349,1327.4,2888.5,2870.8c2945.5,2947.4,2855.1,2853.2,2984.7,3157.5c100.2,229.7,123.7,369.2,123.7,687.3c0,316.1-19.6,434-119.8,677.5c-113.9,274.9-168.9,343.6-728.5,907.2c-636.2,642.1-673.5,667.6-975.9,677.5C7815.8,4503.9,7751.1,4496.1,7676.4,4468.6z M8236.1,3765.6l206.2-204.2L7592,2711.1l-848.3-848.3L6537.5,2071l-206.2,208.1v106v104.1l732.4,732.4c500.7,502.7,748.2,738.3,789.4,750.1C7971,4005.2,8020.1,3979.6,8236.1,3765.6z M8970.5,3029.2c210.1-227.8,325.9-510.5,325.9-793.3c0-174.8-39.3-331.9-129.6-520.4c-70.7-143.3-131.6-208.1-2912.1-2986.7C3493.9-4032,3411.4-4112.5,3268.1-4181.3c-292.6-143.3-573.4-166.9-867.9-74.6c-151.2,49.1-379,194.4-506.6,324l-88.4,90.3L5310.3-336.4c1928.3,1928.3,3511,3505.1,3518.8,3505.1C8835,3168.7,8899.8,3105.8,8970.5,3029.2z M2914.6-1553.9l206.2-206.2l-850.3-850.3l-848.3-848.3l-206.2,208.1l-206.2,208.1v106v104.1l722.6,724.6c396.7,398.6,748.1,736.4,779.6,752.1C2629.9-1300.6,2688.8-1328.1,2914.6-1553.9z"/><path d="M3857.2,3404.3C3217,3245.2,2622,2832.9,2252.9,2290.9c-218-318.1-426.1-803.1-451.6-1054.5c-19.6-180.7,82.5-306.3,249.4-306.3c123.7,0,218,62.8,249.4,166.9c13.7,43.2,47.1,157.1,76.6,255.3c102.1,347.6,312.2,693.2,585.2,962.2c278.8,272.9,640.2,477.2,1007.4,571.4c218,55,267.1,80.5,312.2,168.9c68.7,131.6,2,300.4-143.4,361.3C4059.4,3449.4,4039.8,3449.4,3857.2,3404.3z"/></g></g>
</svg>
</button>`}
${model.brole == "fake" ? "" : 
`<button id="stopPrivat" onclick="stop_privat(this);" title="Stop privat" disabled>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<g><path d="M500,10C229.9,10,10,229.8,10,500c0,270.2,219.8,490,490,490c270.2,0,490-219.8,490-490C990,229.8,770.2,10,500,10z M500,928.8C263.6,928.8,71.2,736.5,71.2,500C71.2,263.5,263.6,71.2,500,71.2c236.5,0,428.8,192.4,428.8,428.8C928.8,736.5,736.5,928.8,500,928.8z"/><path d="M372.1,318.4h59.6v370.9h-59.6V318.4z"/><path d="M556.6,318.4h59.5v370.9h-59.5V318.4z"/>
</g></svg>
</button>`}
`;
	}
	function html(s,...v){
let r='';
for(let i=0;i<v.length;i++){
r+=s[i];
r+=v[i];
}
r+=s[s.length-1];
return r.replace(/\n/g,'');
}
