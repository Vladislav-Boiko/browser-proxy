import proxyWindowXhr from "./xhr/XhrProxy";
import proxyWindowFetch from "./fetch/FetchProxy";
proxyWindowXhr(window);
proxyWindowFetch(window);
