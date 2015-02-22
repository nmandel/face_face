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
    $('button').css('display', 'block');
    console.log('video2', video2, options.video);
    // $('video').get(1).attr('id', 'video2');
    // $('body').append('<img id="img2" src="">');
    // $('body').append('<canvas id="canv2" style="display:none;"></canvas>');
  });

  comm.on('disconnect', function(options) {
    console.log('disconnect occurred')
    $('#'+options.callerID).replaceWith('<video id="remoteVideo" autoplay></video>');
  });

  comm.on('data', function(options) {
    console.log(options);
    context2.fillRect(0, 0, width, height);
    context2.drawImage(video2, 0, 0, width, height);
    $('#img2').attr('src', canvas2.toDataURL('image/webp'));
  })

  
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
      comm.send('Snapshot taken!');
    }
  })
});




// below uses data sending method of transferring screenshot.. takes too long
  // var chunkArr = [];
  // comm.on('data', function(options) {
  //   var data = options.data;
  //   chunkArr.push(data.message);
  //   if (options.data.last) {
  //     context2.fillRect(0, 0, width, height);
  //     context2.drawImage(video2, 0, 0, width, height);
  //     console.log('chunkarr', chunkArr);
  //     $('#img2').attr('src', chunkArr.join(''));
  //   }
  // })
  // var chunkLength = 1000;

  // below uses data sending method of transferring screenshot.. takes too long
      // $('#img1').attr('src', dataUrl);
      // function onRead (event, text) {
      //   var data = {}; // obj to transmit over icecomm channel
      //   if (text.length > chunkLength) {
      //     data.message = text.slice(0, chunkLength);
      //   }
      //   else {
      //     data.message = text;
      //     data.last = true;
      //   }
      //   comm.send(data);
      //   var remainingDataUrl = text.slice(data.message.length);
      //   console.log(data.last, remainingDataUrl.length);
      //   if (remainingDataUrl.length) {
      //     setTimeout(function() {
      //       onRead(null, remainingDataUrl); 
      //     }, 350);
      //   }
      // }
      // onRead(true, dataUrl);