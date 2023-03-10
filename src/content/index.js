import bootstrap from './bootstrap';

// Only inject scripts on html pages
if (document.documentElement.nodeName === 'HTML') {
  bootstrap().then((isActive) => {
    if (isActive) {
      console.log(
        "%cBrowser-proxy will try to inject itself into page (and all iframes in it, don't worry if you see this message multiple times therefore). Extension attempts to inject itself into the page in the fastest ways possible to start catching the requests early. If the browser blocks such injection it falls-back on slower injection methods. If you see Content Security Policy errors, it means that the browser blocked some of the fastest injection attempts: might be Browser-proxy will not be able to catch the earliest requests sent by the page.",
        'color: #1f41df;',
      );
      // Trying the fastest method first, then the second fastest, and the third. If all fail then the CSP doesn't
      // allow for injection, and this is fine -- we do not want to inject where CSP prohibits the injection.
      // prettier-ignore
      const code = "PLACEHOLDER";
      if (document.documentElement) {
        try {
          const attributeName = 'onreset';
          const backedUp = document.documentElement.getAttribute(attributeName);
          document.documentElement.setAttribute(attributeName, code);
          document.documentElement.dispatchEvent(new CustomEvent('reset'));
          if (backedUp) {
            document.documentElement.setAttribute(attributeName, backedUp);
          } else {
            document.documentElement.removeAttribute(attributeName);
          }
        } catch (e) {
          // no problem for us, will try another method
        }
      }
      // Loading through web-accessible resources:
      // https://developer.chrome.com/docs/extensions/reference/runtime/#example-get-url
      const scriptWithURL = document.createElement('script');
      scriptWithURL.setAttribute('async', 'true');
      scriptWithURL.setAttribute('defer', 'false');
      scriptWithURL.src = chrome.runtime.getURL('src/injected.js');
      scriptWithURL.onload = function () {
        this.remove();
        console.log('%cBrowser-proxy finished injecting.', 'color: #1f41df;');
      };
      const parent = document.head || document.documentElement;
      parent.insertBefore(scriptWithURL, parent.firstChild);
    }
  });
}
