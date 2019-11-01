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
const fs = require('fs');

window.promptSaveFile = function(content, options) {
  return dialog
    .showSaveDialog(options || {})
    .then(result => {
      if (result.canceled) {
        return false;
      }
      fs.writeFileSync(result, content);
      return true;
    });
}