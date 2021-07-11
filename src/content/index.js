import browser from 'src/common/browser';
import bootstrap from './bootstrap';

// Only inject scripts on html pages
if (document.documentElement.nodeName === 'HTML') {
  bootstrap().then((isActive) => {
    if (isActive) {
      if (browser.scripting) {
        chrome.scripting.executeScript({
          file: 'src/injected.js',
        });
      } else {
        // prettier-ignore
        const code = "PLACEHOLDER";
        if (document.documentElement) {
          const attributeName = 'onreset';
          const backedUp = document.documentElement.getAttribute(attributeName);
          document.documentElement.setAttribute(attributeName, code);
          document.documentElement.dispatchEvent(new CustomEvent('reset'));
          if (backedUp) {
            document.documentElement.setAttribute(attributeName, backedUp);
          } else {
            document.documentElement.removeAttribute(attributeName);
          }
        }
      }
    }
  });
}
