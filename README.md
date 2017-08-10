<img src="https://raw.githubusercontent.com/caiogondim/laughing-man.js/master/img/icon.png" />

<h1 align="center">laughing-man.js</h1>

<br>

An experiment with the new native FaceDetector API.

Examples:
- [video](https://caiogondim.github.io/laughing-man.js/example/video)
- [camera](https://caiogondim.github.io/laughing-man.js/example/camera)

## Install

```bash
npm install --save laughing-man
```

## Usage

Pass the video and image you want to put on top of the detected face.

```js
const laughingMan = require('laughing-man')

const video = document.querySelector('video')
const imgOverlay = document.querySelector('img.overlay')

laughingMan(video, { overlay: imgOverlay })
```

## Preview

<img src="https://github.com/caiogondim/laughing-man.js/raw/master/img/video-example.gif" alt="Preview" />

## Credits

- [Laughing Man animated SVG](https://gist.github.com/johan/1066590)

---

[caiogondim.com](https://caiogondim.com) &nbsp;&middot;&nbsp;
GitHub [@caiogondim](https://github.com/caiogondim) &nbsp;&middot;&nbsp;
Twitter [@caio_gondim](https://twitter.com/caio_gondim)
