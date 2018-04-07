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
var extend = function extend(head) {
  var target = void 0;
  var deep = void 0;
  var i = void 0;

  // Обрабатываем ситуацию глубокого копирования.
  if (typeof head === 'boolean') {
    deep = head;
    target = arguments.length <= 1 ? undefined : arguments[1];
    i = 1;
  } else {
    deep = false;
    target = head;
    i = 0;
  }

  for (; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
    var obj = arguments.length <= i + 1 ? undefined : arguments[i + 1];

    if (!obj) {
      continue;
    }

    for (var _key in obj) {
      if (hasOwnProperty.call(obj, _key)) {
        var val = obj[_key];
        var isArray = val && Array.isArray(val);

        // Копируем "плоские" объекты и массивы рекурсивно.
        if (deep && val && (isPlainObject(val) || isArray)) {
          var src = target[_key];
          var clone = void 0;

          if (isArray) {
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }

          target[_key] = extend(deep, clone, val);
        } else {
          target[_key] = val;
        }
      }
    }
  }

  return target;
};

module.exports = extend;