// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element !== null) {
//       element.textContent = text;
//     }
//   };
  
//   for (const type of ['chrome', 'node', 'electron']) {
//     replaceText(`${type}-version`, process.versions[type])
//   }
// })

// window.convertVideo = require('./ffmpeg/video-to-audio');
const { dialog } = require('electron');
window.promptSaveFile = function(options) {
  return dialog.showSaveDialog(options || {});
}