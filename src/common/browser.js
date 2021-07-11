// is never undefined
const browser =
  window?.browser ||
  window?.chrome ||
  /* eslint-disable-next-line no-restricted-globals */
  self?.browser ||
  /* eslint-disable-next-line no-restricted-globals */
  self?.chrome ||
  this?.browser ||
  this?.chrome ||
  {};

export default browser;
