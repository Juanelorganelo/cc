export default function cleanse(o) {
  return map(coalesce(o), (v) =>
    isNumeric(v) ? Number(v) : isObject(v) ? cleanse(v) : v
  );
}

function map(value, f) {
  return Array.isArray(value)
    ? value.map(f)
    : Object.entries(value).reduce(
        (acc, [k, v]) => ({ ...acc, [k]: f(v) }),
        {}
      );
}

function coalesce(value) {
  return Array.isArray(value)
    ? value.filter((a) => a != null)
    : Object.entries(value).reduce(
        (acc, [k, v]) => (v == null ? acc : { ...acc, [k]: v }),
        {}
      );
}

function isObject(o) {
  return o && typeof o === 'object';
}

function isNumeric(s) {
  return typeof s === "string" && !Number.isNaN(Number(s));
}

