$(document).ready(function() {
  // for face++ integration
  var API_KEY = '0ef14fa726ce34d820c5a44e57fef470';
  var API_SECRET = '4Y9YXOMSDvqu1Ompn9NSpNwWQFHs1hYD';
  var api = new FacePP(API_KEY, API_SECRET);

  // for icecomm integration
  var comm = new Icecomm('5vKzK4j2Gq5YOt8eJkeKHsqHzj5lWMnZfB6CQXTg6oafn/Y8Hu')

  var localCanvas = $('#canv1').get(0);
  var localContext = localCanvas.getContext('2d');
  var width; 
  var height;
  var ratio;

  var remoteVid;
  var remoteCanvas = $('#canv2').get(0);
  var remoteContext = remoteCanvas.getContext('2d');

  comm.connect('room', {audio: false});

  comm.on('local', function(options) {
    localVideo.src = options.stream;
  });

  comm.on('connected', function(options) {
    console.log('options', options);
    remoteVid = options.video;

    remoteVideo.src = options.stream;
    remoteVideo.id = options.callerID;
    remoteCanvas.width = width;
    remoteCanvas.height = height;
    $('button').css('display', 'block');
    console.log('remoteVid', remoteVid, options.video);
  });

  comm.on('disconnect', function(options) {
    console.log('disconnect occurred')
    $('#'+options.callerID).replaceWith('<video id="remoteVideo" autoplay></video>');
  });

  comm.on('data', function(options) {
    console.log(options);
    localContext.fillRect(0, 0, width, height);
    localContext.drawImage(remoteVid, 0, 0, width, height);
    $('#img1').attr('src', localCanvas.toDataURL('image/webp'));
  })

  
  localVideo.addEventListener('loadedmetadata', function() {
    ratio = localVideo.videoWidth / localVideo.videoHeight;
    width = localVideo.videoWidth
    height = parseInt(width/ratio, 10);
    localCanvas.width = width;
    localCanvas.height = height;
  }, false);

  $('#snapshot').click(function() {
    if (localVideo.src) {
      remoteContext.fillRect(0, 0, width, height);
      remoteContext.drawImage(localVideo, 0, 0, width, height);
      var dataUrl = remoteCanvas.toDataURL('image/webp');
      console.log(dataUrl);
      $('#img2').attr('src', dataUrl);
      comm.send('Snapshot taken!');
    }
  })

  $('#detector').click(function() {
    console.log('detector clicked');
    (function() {
      api.request('detection/detect', {
        url: 'http://media4.popsugar-assets.com/files/2014/05/13/777/n/1922398/d7a6dc419f02e260_thumb_temp_image143449891400002362.xxlarge/i/Dave-Franco-Describes-His-Neighbors-Sex-Scene-Explicit-Detail.jpg'
      }, function(err, result) {
        if (err) {
          console.log('error', err);
          // TODO handle error
          return;
        }
        console.log('results');
        // TODO use result
        console.log(JSON.stringify(result, null, 2));
      });
    })();
  })
});




// below uses data sending method of transferring screenshot.. takes too long
  // var chunkArr = [];
  // comm.on('data', function(options) {
  //   var data = options.data;
  //   chunkArr.push(data.message);
  //   if (options.data.last) {
  //     remoteContext.fillRect(0, 0, width, height);
  //     remoteContext.drawImage(remoteVid, 0, 0, width, height);
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