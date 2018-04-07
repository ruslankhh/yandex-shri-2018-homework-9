const hasOwnProperty = Object.prototype.hasOwnProperty;
const toString = Object.prototype.toString;

/**
 * Проверяет, что переданный объект является "плоским" (т.е. созданным с помощью "{}"
 * или "new Object").
 *
 * @param {Object} obj
 * @returns {Boolean}
 */
function isPlainObject (obj: object): boolean {
  if (toString.call(obj) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(obj);

  return prototype === null || prototype === Object.prototype;
}

export interface IObject extends Object {
  [key: string]: any;
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
function extend (head: boolean | IObject, ...tail: IObject[]): IObject {
  let target: IObject;
  let deep: boolean;
  let i: number;

  // Обрабатываем ситуацию глубокого копирования.
  if (typeof head === 'boolean') {
    deep = head;
    target = tail[0];
    i = 1;
  } else {
    deep = false;
    target = head;
    i = 0;
  }

  for (; i < tail.length; i++) {
    const obj: IObject = tail[i];

    if (!obj) {
      continue;
    }

    for (const key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        const val: any = obj[key];
        const isArray: boolean = val && Array.isArray(val);

        // Копируем "плоские" объекты и массивы рекурсивно.
        if (deep && val && (isPlainObject(val) || isArray)) {
          const src: any = target[key];
          let clone: IObject;

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
}

export default extend;
