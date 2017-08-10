const Hls = require('hls.js')
const laughingMan = require('../src/')
const $body = document.querySelector('body')

function createLaughingManImg() {
  const img = document.createElement('img')
  img.src = './laughing-man-animated.svg'
  img.style.display = 'none'
  $body.appendChild(img)
}

function createVideoElement() {
  const $video = document.createElement('video')
  $video.style.maxWidth = '100vw'
  $body.appendChild($video)

  if (!Hls.isSupported()) {
    throw new Error('HLS.js not supported.')
  }

  return new Promise((resolve, reject) => {
    const hls = new Hls()
    // const source = 'https://video.nyt.com/video-media/hls/2017/08/03/73616_1_00trump-immigration_wg/master.m3u8'
    // const source = 'https://vp.nyt.com/video/2017/08/08/73657_1_09trump-nkorea_wg_hls/master.m3u8'
    const source = 'https://video.nyt.com/video-media/hls/2017/08/04/73625_1_04sessions-leaks-presser_wg/master.m3u8'
    hls.loadSource(source)
    hls.attachMedia($video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      $video.play().then(() => resolve($video))
    })
  })
}

//
// Main
//

createLaughingManImg()
createVideoElement()
  .then($video => laughingMan($video, { overlay: img}))

