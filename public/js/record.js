'use strict';

/* globals MediaRecorder */

var mediaRecorder2;
var recordedBlobs2;

const codecPreferences = document.querySelector('#codecPreferences');

const errorMsgElement = document.querySelector('span#errorMsg');
const recordedVideo = document.querySelector('video#recorded');
const recordButton = document.querySelector('button#record');
recordButton.addEventListener('click', () => {
  if (recordButton.textContent === 'Start Recording') {
    startRecording2();
  } else {
    stopRecording2();
    recordButton.textContent = 'Start Recording';
    playButton.disabled = false;
    downloadButton.disabled = false;
    codecPreferences.disabled = false;
  }
});

const playButton = document.querySelector('button#play');
playButton.addEventListener('click', () => {
  const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value.split(';', 1)[0];
  const superBuffer = new Blob(recordedBlobs2, {type: mimeType});
  recordedVideo.src = null;
  recordedVideo.srcObject = null;
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
  recordedVideo.controls = true;
  recordedVideo.play();
});

const downloadButton = document.querySelector('button#download');
downloadButton.addEventListener('click', function(ev) {
  //const blob = new Blob(recordedBlobs2, {type: 'video/webm'});
  //const url = window.URL.createObjectURL(blob);
  //const a = document.createElement('a');
  //a.style.display = 'none';
  //a.href = url;
  //a.download = 'test.webm';
  //document.body.appendChild(a);
  //a.click();
  var cnv3 = document.createElement('canvas');
var w = 300;var h = 150;
cnv3.width = w;
cnv3.height = h;
var ctx2 = cnv3.getContext('2d');
ctx2.drawImage(gum, 0, 0, w, h);
var img_data2 = cnv3.toDataURL('image/png', 0.5);
var poster_file = datauri_toblob(img_data2);
var file4 = new File([poster_file], modelId.value + '.png', {type:'image/png'});
  
//  function save_video_file(){
var file2 = new File(recordedBlobs2, modelId.value +  '.webm', {type: 'video/webm'});
console.warn('mimeType: ', mediaRecorder2.mimeType);
//webrtc.innerHTML+= ' mimeType: ' + mediaRecorder2.mimeType + '<br>';

var form_data2 = new FormData();
form_data2.append('file_name', file2.name);
form_data2.append('videofile', file2);
form_data2.append('posterfile', file4);
form_data2.append('room_id', modelId.value)
form_data2.append('room_name', modelName.value);
var su = gid("owner_video_container");
if(su){form_data2.append('neu', false);}else{form_data2.append('neu', true);}
vax("post", "/api/save_video2", form_data2, on_save_video2, on_save_video_error2, ev.target, true);
//}
  ev.target.className = "puls";
  setTimeout(function(){
    //document.body.removeChild(a);
   // window.URL.revokeObjectURL(url);
  }, 100);
  
  if(gum.srcObject){
gum.srcObject.getTracks().forEach(function(track){track.stop();
})
}
gum.srcObjetc = null;
  
  
});

 function on_save_video2(l, ev){
	 note({content: l.info, type: "info", time: 5});
	 ev.className = "";
	 }
 function on_save_video_error2(l, ev){
	 ev.className = "";
	 note({content: l, type: "error", time: 5})
	 }

function handleDataAvailable2(event) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs2.push(event.data);
  }
}

function getSupportedMimeTypes() {
  const possibleTypes = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=h264,opus',
    'video/mp4;codecs=h264,aac',
  ];
  return possibleTypes.filter(mimeType => {
    return MediaRecorder.isTypeSupported(mimeType);
  });
}

function startRecording2() {
  recordedBlobs2 = [];
  const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value;
  const options = {mimeType};

  try {
    mediaRecorder2 = new MediaRecorder(window.stream, options);
    
    //note({content: "Test is OK!", type: "info", time: 5});
  } catch (e) {
    console.error('Exception while creating MediaRecorder:', e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    note({content: "Your browser does not support MediaRecorder API", type: "error", time: 5});
    return;
  }

  console.log('Created MediaRecorder', mediaRecorder2, 'with options', options);
  recordButton.textContent = 'Stop Recording';
  playButton.disabled = true;
  downloadButton.disabled = true;
  codecPreferences.disabled = true;
  mediaRecorder2.onstop = (event) => {
    console.log('Recorder stopped: ', event);
    console.log('Recorded Blobs: ', recordedBlobs2);
  };
  mediaRecorder2.ondataavailable = handleDataAvailable2;
  mediaRecorder2.start();
  console.log('MediaRecorder started', mediaRecorder2);
  setTimeout(function(){stopRecording2();}, 60000)
}

function stopRecording2() {
	if(mediaRecorder2.state != "inactive"){
  mediaRecorder2.stop();
}
}

function handleSuccess(stream) {
  recordButton.disabled = false;
  console.log('getUserMedia() got stream:', stream);
  window.stream = stream;

  const gumVideo = document.querySelector('video#gum');
  gumVideo.srcObject = stream;

  getSupportedMimeTypes().forEach(mimeType => {
    const option = document.createElement('option');
    option.value = mimeType;
    option.innerText = option.value;
    codecPreferences.appendChild(option);
  });
  codecPreferences.disabled = false;
}

async function init2(constraints) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    console.error('navigator.getUserMedia error:', e);
    note({content: "Is webcamera available on your device?", type: "info", time: 5});
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

document.querySelector('button#start').addEventListener('click', async () => {
  document.querySelector('button#start').disabled = true;
  const hasEchoCancellation = document.querySelector('#echoCancellation').checked;
  const constraints = {
    audio: {
      echoCancellation: {exact: hasEchoCancellation}
    },
    video: {
      width: 1280, height: 720
    }
  };
  console.log('Using media constraints:', constraints);
  await init2(constraints);
});
gum.onloadedmetadata = function(e){
	console.log('on local video loaded video data');
	if(owner()){
	
	}
	}
