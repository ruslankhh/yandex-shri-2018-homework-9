'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

/**
 * Проверяет, что переданный объект является "плоским" (т.е. созданным с помощью "{}"
 * или "new Object").
 *
 * @param {Object} obj
 * @returns {Boolean}
 */
function isPlainObject(obj) {
  if (toString.call(obj) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(obj);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Копирует перечислимые свойства одного или нескольких объектов в целевой объект.
 *
 * @param {Boolean} [deep=false] При значении `true` свойства копируются рекурсивно.
 * @param {Object} target Объект для расширения. Он получит новые свойства.
 * @param {...Object} objects Объекты со свойствами для копирования. Аргументы со значениями
 *      `null` или `undefined` игнорируются.
 * @returns {Object}
 */
var extend = function extend() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var target = args[0];
  var deep = void 0;
  var i = void 0;

  // Обрабатываем ситуацию глубокого копирования.
  if (typeof target === 'boolean') {
    deep = target;
    target = args[1];
    i = 2;
  } else {
    deep = false;
    i = 1;
  }

  for (; i < arguments.length; i++) {
    var obj = args[i];
    if (!obj) {
      continue;
    }

    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        var val = obj[key];
        var isArray = val && Array.isArray(val);

        // Копируем "плоские" объекты и массивы рекурсивно.
        if (deep && val && (isPlainObject(val) || isArray)) {
          var src = target[key];
          var clone = void 0;
          if (isArray) {
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }
          target[key] = extend(deep, clone, val);
        } else {
          target[key] = val;
        }
      }
    }
  }

  return target;
};

module.exports = extend;