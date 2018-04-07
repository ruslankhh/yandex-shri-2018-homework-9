"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function extend(head) {
    var tail = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        tail[_i - 1] = arguments[_i];
    }
    var target;
    var deep;
    var i;
    // Обрабатываем ситуацию глубокого копирования.
    if (typeof head === 'boolean') {
        deep = head;
        target = tail[0];
        i = 1;
    }
    else {
        deep = false;
        target = head;
        i = 0;
    }
    for (; i < tail.length; i++) {
        var obj = tail[i];
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
                    }
                    else {
                        clone = src && isPlainObject(src) ? src : {};
                    }
                    target[key] = extend(deep, clone, val);
                }
                else {
                    target[key] = val;
                }
            }
        }
    }
    return target;
}
exports.default = extend;
//# sourceMappingURL=extend.js.map