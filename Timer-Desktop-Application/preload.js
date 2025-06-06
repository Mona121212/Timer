const { contextBridge } = require('electron');

let seconds = 0;
let timer = null;

contextBridge.exposeInMainWorld('timerAPI', {
  start: () => {
    if (!timer) {
      timer = setInterval(() => {
        seconds++;
        window.dispatchEvent(new CustomEvent('timer-update', { detail: seconds }));
      }, 1000);
    }
  },
  pause: () => {
    clearInterval(timer);
    timer = null;
  },
  reset: () => {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    window.dispatchEvent(new CustomEvent('timer-update', { detail: seconds }));
  }
});
