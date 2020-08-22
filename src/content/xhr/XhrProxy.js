class XhrProxy {
  constructor(xhr) {
    this.xhr = xhr;
  }

  open(realOpen) {
    return new Proxy(realOpen, {
      apply(target, thisArg, argumentsList) {
        console.log("Called open with", argumentsList);
        Reflect.apply(target, thisArg, argumentsList);
      }
    });
  }
}

const proxyXhr = xhr => {
  const xhrProxy = new XhrProxy(xhr);
  xhr.xhrProxy = xhrProxy;
  return new Proxy(xhr, {
    get(target, property, receiver) {
      let value = Reflect.get(target, property);
      if (property in xhrProxy) {
        value = xhrProxy[property](value);
        console.log('value is', typeof value);
      }
      return (typeof value === 'function') ? value.bind(target) : value; 
    },
    set(target, prop, value) {
      return Reflect.set(target, prop, value);
    }
  })
};

export default window => {
  window.XMLHttpRequest = new Proxy(window.XMLHttpRequest, {
    construct(target, args) {
      const xhr = new target(...args);
      return proxyXhr(xhr);
    }
  });
};