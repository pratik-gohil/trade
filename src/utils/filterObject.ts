export const filterObject = (obj, cb) =>
  Object.keys(obj)
    .filter(cb)
    .reduce((o, key) => Object.assign(o, obj[key]), {});
