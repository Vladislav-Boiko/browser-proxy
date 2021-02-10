import proxyWindowXhr from './xhr/WindowXhrProxy';
import proxyWindowFetch from './fetch/FetchProxy';
import overrides from './overrides/Overrides';
overrides.startListening();
proxyWindowXhr(window);
proxyWindowFetch(window);
