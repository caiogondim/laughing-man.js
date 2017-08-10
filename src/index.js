function setOverlayStyle(overlay) {
  overlay.style.transition = 'all 0.5s'
  overlay.style.display = 'none'
  overlay.style.position = 'absolute'
  overlay.style.zIndex = '1'
}

function createCanvas(video) {
  canvas = document.createElement('canvas')
  const videoCompStyle = window.getComputedStyle(video)
  canvas.width = videoCompStyle.width.replace('px', '')
  canvas.height = videoCompStyle.height.replace('px', '')
  canvas.style.display = 'none'
  document.querySelector('body').appendChild(canvas)

  return canvas
}

function hideOverlay(overlay) {
  return setTimeout(() => {
    overlay.style.display = 'none'
  }, 500)
}

function createDrawFunction() {
  const faceDetector = new FaceDetector({ maxDetectedFaces: 1 })
  let isDetectingFaces = false
  let faces = []
  let hideTimeout

  return async function draw(canvas, video, overlay) {
    window.requestAnimationFrame(() => draw(canvas, video, overlay))
    const context = canvas.getContext('2d')
    const videoCompStyle = getComputedStyle(video)
    const videoWidth = videoCompStyle.width.replace('px', '')
    const videoHeight = videoCompStyle.height.replace('px', '')
    context.drawImage(video, 0, 0, videoWidth, videoHeight)

    clearTimeout(hideTimeout)
    if (faces.length) {
      const face = faces[0].boundingBox
      overlay.style.display = 'block'
      overlay.style.left = `${face.left - (face.width * 0.5)}px`
      overlay.style.top = `${face.top - (face.height * 0.75)}px`
      overlay.style.width = `${face.width * 2}px`
      overlay.style.height = `${face.height * 2}px`
    } else {
      hideTimeout = hideOverlay(overlay)
    }

    if (isDetectingFaces) return

    isDetectingFaces = true
    faces = await faceDetector.detect(canvas)
    isDetectingFaces = false
  }
}

//
// API
//

module.exports = (video, opts) => {
  const canvas = createCanvas(video)
  setOverlayStyle(opts.overlay)

  const draw = createDrawFunction()
  draw(canvas, video, opts.overlay)
}
