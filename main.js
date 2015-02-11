$(document).ready(function() {
  // var API_KEY = '0ef14fa726ce34d820c5a44e57fef470';
  // var API_SECRET = '4Y9YXOMSDvqu1Ompn9NSpNwWQFHs1hYD';
  // var api = new FacePP(API_KEY, API_SECRET);

  var comm = new Icecomm('5vKzK4j2Gq5YOt8eJkeKHsqHzj5lWMnZfB6CQXTg6oafn/Y8Hu')

  var canvas1 = $('#canv1').get(0);
  var context = canvas1.getContext('2d');
  var width; 
  var height;
  var ratio;

  var video2;
  var canvas2 = $('#canv2').get(0);
  var context2 = canvas2.getContext('2d');

  comm.connect('room', {audio: false});

  comm.on('local', function(options) {
    localVideo.src = options.stream;
  });

  comm.on('connected', function(options) {
    console.log('options', options);
    video2 = options.video;

    remoteVideo.src = options.stream;
    remoteVideo.id = options.callerID;
    // $('#remoteVideo').replaceWith(video2);
    // $('.streams').append(options.video);
    canvas2.width = width;
    canvas2.height = height;
    console.log('video2', video2, options.video);
    // $('video').get(1).attr('id', 'video2');
    // $('body').append('<img id="img2" src="">');
    // $('body').append('<canvas id="canv2" style="display:none;"></canvas>');
  });

  comm.on('disconnect', function(options) {
    console.log('disconnect occurred')
    $('#'+options.callerID).replaceWith('<video id="remoteVideo" autoplay></video>');
  });



  var chunkArr = [];
  
  comm.on('data', function(options) {
    var data = options.data;
    chunkArr.push(data.message);
    // console.log('options.message is', options.message);
    console.log(data.last);
    if (options.data.last) {
      context2.fillRect(0, 0, width, height);
      context2.drawImage(video2, 0, 0, width, height);
      console.log('chunkarr', chunkArr);
      $('#img2').attr('src', chunkArr.join(''));
    }

    // console.log('data sent', options.data);
    
  })

  var chunkLength = 1000;
  
  localVideo.addEventListener('loadedmetadata', function() {
    ratio = localVideo.videoWidth / localVideo.videoHeight;
    width = localVideo.videoWidth
    height = parseInt(width/ratio, 10);
    canvas1.width = width;
    canvas1.height = height;
  }, false);

  $('#snapshot').click(function() {
    if (localVideo.src) {
      context.fillRect(0, 0, width, height);
      context.drawImage(localVideo, 0, 0, width, height);
      var dataUrl = canvas1.toDataURL('image/webp');
      console.log(dataUrl);
      $('#img1').attr('src', dataUrl);
      function onRead (event, text) {
        var data = {}; // obj to transmit over icecomm channel
        // if (event) {
        //   text = event.target.result;
        // }
        if (text.length > chunkLength) {
          data.message = text.slice(0, chunkLength);
        }
        else {
          data.message = text;
          data.last = true;
        }
        comm.send(data);
        var remainingDataUrl = text.slice(data.message.length);
        console.log(data.last, remainingDataUrl.length);
        if (remainingDataUrl.length) {
          setTimeout(function() {
            onRead(null, remainingDataUrl); 
          }, 350);
        }
      }
      onRead(true, dataUrl);
    }
  })

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
 //            // draw video on to canvas1
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