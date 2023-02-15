const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');


/*
ffmpeg('videos/video.mp4', { timeout: 432000 }).addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10',
    '-hls_list_size 0',
    '-f hls'
]).output('videos/output.m3u8').on('end', () => {
    console.log('end');
}).run();
*/

// host, port and path to the RTMP stream
var host = 'localhost'
var port = '1935'
var path = '/live/obs'
 
function callback() 
 
fmpeg('rtmp://'+host+':'+port+path, { timeout: 432000 }).addOptions([
    '-c:v libx264',
    '-c:a aac',
    '-ac 1',
    '-strict -2',
    '-crf 18',
    '-profile:v baseline',
    '-maxrate 400k',
    '-bufsize 1835k',
    '-pix_fmt yuv420p',
    '-hls_time 10',
    '-hls_list_size 6',
    '-hls_wrap 10',
    '-start_number 1'
  ]).output('lives/Obs/live.m3u8').on('end', callback).run()