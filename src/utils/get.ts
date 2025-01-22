
/** Used as references for constious `Number` constants. */
const INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string.
 */
function toKey(value: any) {
  if (typeof value == 'string') {
    return value;
  }

  const result = (value + '');

  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/** Used to match property names within property paths. */
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
const reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} str The string to convert.
 * @returns {Array} Returns the property path array.
 */
const stringToPath = function(str: string) {
  const result = [];
  if (str.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }

  // @ts-expect-error
  str.replace(rePropName, (match, numb, quote, subString) => {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (numb || match));
  });
  return result;
};

/** Used to match property names within property paths. */
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 */
function isKey(value: any, object: any) {
  if (Array.isArray(value)) {
    return false;
  }

  const type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Casts `value` to a path array if it's not one.
 */
function castPath(value: any, object: any) {
  if (Array.isArray(value)) {
    return value;
  }

  // @ts-expect-error: ...
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

const baseGet = (object: any, path: string | string[]) => {
  path = castPath(path, object);

  const index = 0,
      length = path.length;

  while (object != null && index < length) {
    // @ts-expect-error: ...
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}


export default function get(object: any, path: string | string[], defaultValue?: any) {
  const result = object == null ? undefined : baseGet(object, path);

  return result === undefined ? defaultValue : result;
}