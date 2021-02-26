import bootstrap from './bootstrap';

// Only inject scripts on html pages
if (document.documentElement.nodeName === 'HTML') {
  bootstrap().then((isActive) => {
    if (isActive) {
      // prettier-ignore
      const code = "PLACEHOLDER";
      // We have to inject the code, as the content script cannot set the xhr of page window.
      // prettier-ignore
      window.location = `javascript: ${code}`;
    }
  });
}
