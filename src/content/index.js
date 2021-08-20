import bootstrap from './bootstrap';

// Only inject scripts on html pages
if (document.documentElement.nodeName === 'HTML') {
  bootstrap().then((isActive) => {
    if (isActive) {
      console.log(
        '%cBrowser-proxy will try to inject itself into page. If you see Content Security Policy errors, might be Browser-proxy will not be able to catch all requests.',
        'color: #1f41df;',
      );
      // Trying the fastest method first, then the second fastest, and the third. If all fail then the CSP doesn't
      // allow for injection, and this is fine -- we do not want to inject where CSP prohibits the injection.
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
