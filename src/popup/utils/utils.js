// Warning, this function is neither pure or immutable, it modifies the passed target object
export const renameKeys = (target, map) => {
  for (let mappedKey of map) {
    if (target[mappedKey.from]) {
      const value = target[mappedKey.from];
      delete target[mappedKey.from];
      target[mappedKey.to] = value;
    }
  }
  return target;
};
