const axios = require('axios').default;
const onesignal_app_key = "ZjVhNjdjYTMtYWJlNS00MjQ1LTljNzctYjEzYWI0NzQxMDc5";
const onesignal_app_id = "bdd08819-3e41-4e1b-a1bf-13da2ff35f7c";
const onesignal_notification_url = "https://onesignal.com/api/v1/notifications";
async function oni(us, txt){


let data = {
		app_id: onesignal_app_id,
		contents: {en: us+" "+txt},
	//	included_segments: ["Subscribed Users"],
		include_player_ids:["9a9c34d6-6c6e-4dfe-b510-20953def482f"],
		data:{"hallo": "world!"},
		web_buttons: [{"id": "like-button", "text": "Like", "icon": "https://chelikon.space/images/ich.jpg", "url": "https://chelikon.space"}, 
		{"id": "read-more-button", "text": "Read more", "icon": "https://chelikon.space/images/eye2.svg", "url": "https://chelikon.space"}]
		};
let headers = {"Authorization": "Basic " + onesignal_app_key};
try{
let r = await axios.post(onesignal_notification_url, data, {headers: headers});
console.log("r: ", r.data);
}catch(e){
console.log("err: ", e);
}	

}
//oni("suka", "fuck");

async function send_subscribe(txt, usid, arr){

let data = {
		app_id: onesignal_app_id,
		contents: {en: txt},
		include_player_ids: arr,
	url: "https://" + "site_domain" + "/webrtc/" + usid
		};
let headers = {"Authorization": "Basic " + onesignal_app_key};
try{
let r = await axios.post(onesignal_notification_url, data, {headers: headers});
console.log("r.data: ", r.data);
return r.data;
//"errors": {"invalid_player_ids": [ "b186912c-cf25-4688-8218-06cb13e09a4f"]}
}catch(e){
console.log("err from axios: ", e);
return 0;
}	
}

var a = send_subscribe("alik is da", 1, ["9a9c34d6-6c6e-4dfe-b510-20953def482f"])
console.log("A: ", a);
