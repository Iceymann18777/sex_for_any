var v = gid("uservideo");
function delete_video(el){
let a = el.getAttribute('data-bid');
if(!a)return;
if(confirm("Удалить?")){
let d = {};
d.id = a;
vax("post", "/api/del_user_video", d, on_del_video_f, on_del_video_f_error, el, false);	
el.className = "puls";
}
}
function on_del_video_f(l, ev){
ev.className = "";
note({content: l.info, type: "info", time: 5});	
if(!l.src)return;
remove_video_f(l.id);
}
function on_del_video_f_error(l, ev){
ev.className = "";
note({content: l, type: "error", time: 5});	
}

function remove_video_f(id){
let a = document.querySelector('[data-rid="' + id + '"]');
if(!a)return;
a.remove();
}
function view_play(el){
	let a = el.getAttribute('data-videoid');
	if(!a)return;
	let d = {};
	d.id = a;
	vax("post", "/api/video_views", d, on_view_play, on_view_play_error, null, false);
	}
	function on_view_play(l){}
	function on_view_play_error(l){}
function get_more_videos(el){
	if(!v.lastChild){
	console.log('!v.lastChild , returning');
	return;
	}
var b = v.lastChild.getAttribute('data-crat');
if(!b){
	console.log('!b, no data-at, returning');
	return;
	}
let d = {};
d.next = b;
vax("post", "/api/get_more_videos", d, on_get_videos, on_get_videos_error, el, false);
el.className = "puls";
}
function on_get_videos(l, ev){
//console.log("content: ",l.content);
ev.className = "";
if(!l.content){note({content: "No more videos!", type: "info", time: 5});return;}
v.innerHTML+= l.content;
}
function on_get_videos_error(l, ev){
ev.className = "";
note({content: l, type: "error", time: 5})	
}
