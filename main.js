$(document).ready(function() {
  // var API_KEY = '0ef14fa726ce34d820c5a44e57fef470';
  // var API_SECRET = '4Y9YXOMSDvqu1Ompn9NSpNwWQFHs1hYD';
  // var api = new FacePP(API_KEY, API_SECRET);

  var comm = new Icecomm('5vKzK4j2Gq5YOt8eJkeKHsqHzj5lWMnZfB6CQXTg6oafn/Y8Hu')

  comm.connect('room');

  comm.on('local', function(options) {
    localVideo.src = options.stream;
  });

  comm.on('connected', function(options) {
    document.body.appendChild(options.video);
  });

 comm.on('disconnect', function(options) {
   document.getElementById(options.callerID).remove();
 });

  // var errorCallback = function(e) {
  //   console.log('Reeeejected!', e);
  // };

  // // vendor prefix
  // window.URL = window.URL || window.webkitURL;
  // navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
  //                           navigator.mozGetUserMedia || navigator.msGetUserMedia;

  // var video = $('video');
  // if (navigator.getUserMedia) {
  //   // var webcam = document.getElementById('pic-btn');
  //   console.log('getusermedia good to go');
  //   navigator.getUserMedia({video: true, audio: false}, 
  //     function(stream) {
  //       console.log('video', video[0]);
  //       video[0].src = window.URL.createObjectURL(stream);
  //     }, errorCallback)
  // } else {
  //   console.log('cannot get getusermedia');
  //   video.src = 'somevideo.webm';
  //   hideInputButton('.webcam');
  // }

 // function pic () {
 //    console.log('CLICKED!');
 //    $('.camera-modal').show();
 //    navigator.getUserMedia({
 //        video: true,
 //        audio: false
 //      },
 //      function(localMediaStream) {
 //        var video = $('.camera-modal video').get(0);
 //        var cameraModal = container.find('.camera-modal');

 //        var modalClose = function() {
 //          $(video).hide();
 //          localMediaStream.stop();
 //          cameraModal.hide();
 //          container.find('.capture').hide();
 //          cameraModal.unbind('click');
 //        };
 //        cameraModal.click(modalClose);

 //        video.src = window.URL.createObjectURL(localMediaStream);
 //        video.onerror = function() {
 //          localMediaStream.stop();
 //          modalClose();
 //        };

 //        $([container.find('.capture').get(0), video]).
 //          show().
 //          unbind('click').
 //          click(function() {
 //            startLoading();
 //            var scale = Math.min(width / video.videoWidth, height / video.videoHeight, 1);
 //            // draw video on to canvas
 //            var tmpCanvas = document.createElement('canvas');
 //            tmpCanvas.height = video.videoHeight * scale;
 //            tmpCanvas.width = video.videoWidth * scale;
 //            tmpCanvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth * scale, video.videoHeight * scale);

 //            detect(tmpCanvas.toDataURL('image/jpeg'), true);
 //            modalClose();
 //            return false;
 //          });

 //      },
 //      function() {
 //        $('.camera-modal').hide();
 //        showStatus(messages.NO_CAMERA);
 //        hideInputButton('.webcam');
 //      }
 //    );
 //    return false;
 //  };

  // $('#pic-btn').click(pic);




  // api.request('detection/detect', {
  //   url: 'http://cn.faceplusplus.com/static/resources/python_demo/1.jpg'
  // }, function(err, result) {
  //   if (err) {
  //     // TODO handle error
  //     console.log('error');
  //     return;
  //   }
  //   // TODO use result
  //   console.log('result', result);
  //   document.getElementById('response').innerHTML = JSON.stringify(result, null, 2);
  // });
});