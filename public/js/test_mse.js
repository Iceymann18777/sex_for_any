'use strict';

/* globals MediaRecorder */

let mediaRecorder;
let recordedBlobs;

const codecPreferences = document.querySelector('#codecPreferences');

const errorMsgElement = document.querySelector('span#errorMsg');
const recordedVideo = document.querySelector('video#recorded');
const recordButton = document.querySelector('button#record');
recordButton.addEventListener('click', () => {
  if (recordButton.textContent === 'Start Recording') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Start Recording';
    playButton.disabled = false;
    downloadButton.disabled = false;
    codecPreferences.disabled = false;
  }
});

const playButton = document.querySelector('button#play');
playButton.addEventListener('click', () => {
  const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value.split(';', 1)[0];
  const superBuffer = new Blob(recordedBlobs, {type: mimeType});
  recordedVideo.src = null;
  recordedVideo.srcObject = null;
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
  recordedVideo.controls = true;
  recordedVideo.play();
});

const downloadButton = document.querySelector('button#download');
downloadButton.addEventListener('click', () => {
  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
});

function handleDataAvailable(event) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
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

function startRecording() {
  recordedBlobs = [];
  const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value;
  const options = {mimeType};

  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
    note({content: "Test is OK!", type: "info", time: 5});
  } catch (e) {
    console.error('Exception while creating MediaRecorder:', e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    note({content: "Your browser does not support MediaRecorder API", type: "error", time: 5});
    return;
  }

  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.textContent = 'Stop Recording';
  playButton.disabled = true;
  downloadButton.disabled = true;
  codecPreferences.disabled = true;
  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
    console.log('Recorded Blobs: ', recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
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

async function init(constraints) {
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
  await init(constraints);
});




/*  https://github.com/joshuatz/mediasource-append-examples/  */

/*
if(window.MediaSource){
	var mediaSource = new MediaSource();
	remoteVideo.src = URL.createObjectURL(mediaSource);
	mediaSource.addEventListener('sourceopen', sourceOpen);
	}else{
		alert('the Media Source Extensions api is not supported')
		}
		
		function sourceOpen(e){
			URL.revokeObjectURL(remoteVideo.src);
			var mime = 'video/webm; codecs="opus, vp09.00.10.08"';
			var mediaSource = e.target;
			var sourceBuffer = mediaSource.addSourceBuffer(mime);
			
			fetch(videos[0]).then(function(res){
				return res.arrayBuffer()
				}).then(function(arrayBuffer){
					sourceBuffer.addEventListener('updateend', function(e){
						if(!sourceBuffer.updating && mediaSource.readyState === 'open'){
							
							//mediaSource.endOfStream();
							
							}
							fetch(videos[1]).then(function(res1){
								return res1.arrayBuffer();
								}).then(function(f){
									sourceBuffer.appendBuffer(f);
									
									fetch(videos[2]).then(function(res2){
										return res2.arrayBuffer();
										}).then(function(sd){
											sourceBuffer.appendBuffer(sd);
											})
									})
						});
						console.log('updating' + sourceBuffer.updating)
						sourceBuffer.appendBuffer(arrayBuffer);
						//remoteVideo.play();
						
						
					})
					} 
					*/ 
			/*		
function fetchsegment(url){
	return fetch(url).then(function(res){
		return res.arrayBuffer();
		})
	}
//	var mime = 'video/webm; codecs="opus, vp09.00.10.08"';
	const getDuration = (blob)=>{
		return new Promise((res)=>{
			const tempv = document.createElement('video');
			tempv.onloadedmetadata = ()=>{
				res(tempv.duration);
				URL.revokeObjectURL(tempv.src);
			};
			tempv.src = URL.createObjectURL(blob);
		});
	};
	
	
	
	(async ()=>{
		var videos = ['/vid/mickey.webm', '/vid/misha.webm', '/vid/slava.webm'];
		const cta = await Promise.all(
		videos.map(async (vurl)=>{
			const blob = await (await fetch(vurl)).blob();
			const duration = await getDuration(blob);
			const buff = await blob.arrayBuffer();
			return {
				url: vurl,
				duration,
				buff
			};
		})
		);
		const mediaSource = new MediaSource();
		document.getElementById("remoteVideo").src = URL.createObjectURL(mediaSource);
		const sourceBuffer = await addSourceBufferWhenOpen(mediaSource, 'video/webm; codecs="opus, vp09.00.10.08"', 'segments');
		let clipIndex = 0;
		sourceBuffer.onupdateend = ()=>{
			if(clipIndex < cta.length - 1){
				//sourceBuffer.timestampOffset += cta[clipIndex].duration;
				clipIndex++;
				sourceBuffer.appendBuffer(cta[clipIndex].buff);
			}else{
mediaSource.endOfStream();
remoteVideo.play();
}
};
sourceBuffer.appendBuffer(cta[clipIndex].buff);
console.log({sourceBuffer, mediaSource, remoteVideo});
})();
*/
/*
(async()=>{
	var videos = ['/vid/mickey.webm', '/vid/misha.webm', '/vid/slava.webm'];
	const videoElement=document.querySelector('video');
	const cta=await Promise.all(
	videos.map(async(vurl)=>{
		return (await fetch(vurl)).arrayBuffer();
	})
	);
	const mediaSource=new MediaSource();
	videoElement.src=URL.createObjectURL(mediaSource);
	const sourceBuffer=await addSourceBufferWhenOpen(mediaSource, 'video/webm; codecs="opus, vp09.00.10.08"','sequence');
	let clipIndex=0;
	sourceBuffer.onupdateend=function(){
		if(clipIndex<videos.length-1){
			clipIndex++;
	sourceBuffer.appendBuffer(cta[clipIndex]);
}else{
	mediaSource.endOfStream();
	videoElement.play();
}};
sourceBuffer.appendBuffer(cta[clipIndex]);
})();
*/
/*
var addSourceBufferWhenOpen = (mediaSourc, mimestr, mode = 'segments')=>{
		return new Promise((res, rej)=>{
			const getSourceBuffer = function(ev){
				//mediaSourc=ev.target;
				try{
					const sourceBufferi = mediaSourc.addSourceBuffer(mimestr);
					sourceBufferi.mode = mode;
					res(sourceBufferi);
				}catch(e){
					rej(e);
				}
			};
			if(mediaSourc.readyState === 'open'){
				getSourceBuffer();
			}else{
				mediaSourc.addEventListener('sourceopen', getSourceBuffer, false);
			}
		});
	};

*/
