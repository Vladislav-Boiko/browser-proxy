// Only inject scripts on html pages
if (document.documentElement.nodeName === 'HTML') {
  const code = `PLACEHOLDER
  `;
  // We have to inject the code, as the content script cannot set the xhr of page window.
  window.location = `javascript: ${code}`
}
