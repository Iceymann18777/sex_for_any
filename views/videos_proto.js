const videos_proto = n =>{
	return `${get_videos(n)}`;
	}
	module.exports = { videos_proto }
	
function get_videos(n){
let s= '';
n.videos.forEach(function(el, i){
s+=`
<div class="owner_video_section" data-rid="${el.r_id}" data-crat="${el.crat}">
<div class="owner_video_container">
<video data-videoid="${el.r_id}" ${el.poster ? `poster="/prof_video/${el.poster}"` : ''} src="/prof_video/${el.src}" controls preload="none" onplay="view_play(this);">No html5 video supported.</video></div>
<div class="underdiv"><div class="psvg"><img src="/images/eye2.svg"></div>&nbsp;&nbsp;<span>${el.v}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a href="/webrtc/${el.r_id}">${el.nick}</a></span>
${n.user && n.user.bmodel == 'superadmin' ? `
<div class="div"><button data-bid="${el.r_id}" onclick="delete_video(this);">delete</button></div>` : ''}</div></div>`;
})

	return s;	
}
