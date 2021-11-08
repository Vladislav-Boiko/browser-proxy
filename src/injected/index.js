import proxyWindowXhr from './xhr/WindowXhrProxy';
import proxyWindowFetch from './fetch/FetchProxy';
import overrides from './overrides/Overrides';
overrides.startListening();
if (typeof window !== 'undefined') {
  // checking if we are in service worker.
  proxyWindowXhr(window);
  proxyWindowFetch(window);
}
