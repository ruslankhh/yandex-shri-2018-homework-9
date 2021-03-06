# Домашнее задание "Типизация"

Домашнее задание #9 в ШРИ Яндекса 2018.

## Задание

Необходимо типизировать функцию [extend](https://gist.github.com/alt-j/9dae0e73b118370cf54f2d08a22e02de) с помощью двух инструментов:

- [x] TypeScript
- [x] Flow

Задача написать максимально надежный (type safety) код.

Результатом задания должны быть две ссылки, содержащие переписанный код, на:

- [typescriptlang.org/play](https://www.typescriptlang.org/play)
- [flow.org/try](https://flow.org/try)

## Запуск

```bash
npm i
```

Для линтинга:

```bash
npm run lint
```

Для тестов:

```bash
npm test
```

## Выполнение задания

- Настроил инфраструктуру для работы с TypeScript и Flow.
- Написал тесты, для того, чтобы проверить функциональность данной функции на TypeScript-е и Flow.

### TypeScript

- Выделил интерфейс `IObject` для определения типов объектов с перечисляемыми свойствами.
- Разбил аргументы функции `extend` на две части: `head` и `tail`, для того что бы тип `boolean` был разрешен только для первого аргумента.
- Так и не понял как исключить `null` из типа `IObject`, ибо в случае передачи его в качестве первого аргумента, будет ошибка.
- [Ссылка](https://www.typescriptlang.org/play/#src=const%20hasOwnProperty%20%3D%20Object.prototype.hasOwnProperty%3B%0D%0Aconst%20toString%20%3D%20Object.prototype.toString%3B%0D%0A%0D%0A%2F**%0D%0A%20*%20%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8F%D0%B5%D1%82%2C%20%D1%87%D1%82%D0%BE%20%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%B9%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20%D1%8F%D0%B2%D0%BB%D1%8F%D0%B5%D1%82%D1%81%D1%8F%20%22%D0%BF%D0%BB%D0%BE%D1%81%D0%BA%D0%B8%D0%BC%22%20(%D1%82.%D0%B5.%20%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC%20%D1%81%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E%20%22%7B%7D%22%0D%0A%20*%20%D0%B8%D0%BB%D0%B8%20%22new%20Object%22).%0D%0A%20*%0D%0A%20*%20%40param%20%7BObject%7D%20obj%0D%0A%20*%20%40returns%20%7BBoolean%7D%0D%0A%20*%2F%0D%0Afunction%20isPlainObject%20(obj%3A%20object)%3A%20boolean%20%7B%0D%0A%20%20if%20(toString.call(obj)%20!%3D%3D%20'%5Bobject%20Object%5D')%20%7B%0D%0A%20%20%20%20return%20false%3B%0D%0A%20%20%7D%0D%0A%0D%0A%20%20const%20prototype%20%3D%20Object.getPrototypeOf(obj)%3B%0D%0A%0D%0A%20%20return%20prototype%20%3D%3D%3D%20null%20%7C%7C%20prototype%20%3D%3D%3D%20Object.prototype%3B%0D%0A%7D%0D%0A%0D%0Aexport%20interface%20IObject%20extends%20Object%20%7B%0D%0A%20%20%5Bkey%3A%20string%5D%3A%20any%3B%0D%0A%7D%0D%0A%0D%0A%2F**%0D%0A%20*%20%D0%9A%D0%BE%D0%BF%D0%B8%D1%80%D1%83%D0%B5%D1%82%20%D0%BF%D0%B5%D1%80%D0%B5%D1%87%D0%B8%D1%81%D0%BB%D0%B8%D0%BC%D1%8B%D0%B5%20%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0%20%D0%BE%D0%B4%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%B8%D0%BB%D0%B8%20%D0%BD%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%B8%D1%85%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2%20%D0%B2%20%D1%86%D0%B5%D0%BB%D0%B5%D0%B2%D0%BE%D0%B9%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82.%0D%0A%20*%0D%0A%20*%20%40param%20%7BBoolean%7D%20%5Bdeep%3Dfalse%5D%20%D0%9F%D1%80%D0%B8%20%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B8%20%60true%60%20%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%80%D1%83%D1%8E%D1%82%D1%81%D1%8F%20%D1%80%D0%B5%D0%BA%D1%83%D1%80%D1%81%D0%B8%D0%B2%D0%BD%D0%BE.%0D%0A%20*%20%40param%20%7BObject%7D%20target%20%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20%D0%B4%D0%BB%D1%8F%20%D1%80%D0%B0%D1%81%D1%88%D0%B8%D1%80%D0%B5%D0%BD%D0%B8%D1%8F.%20%D0%9E%D0%BD%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5%20%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0.%0D%0A%20*%20%40param%20%7B...Object%7D%20objects%20%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B%20%D1%81%D0%BE%20%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%BB%D1%8F%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.%20%D0%90%D1%80%D0%B3%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B%20%D1%81%D0%BE%20%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%0D%0A%20*%20%20%20%20%20%20%60null%60%20%D0%B8%D0%BB%D0%B8%20%60undefined%60%20%D0%B8%D0%B3%D0%BD%D0%BE%D1%80%D0%B8%D1%80%D1%83%D1%8E%D1%82%D1%81%D1%8F.%0D%0A%20*%20%40returns%20%7BObject%7D%0D%0A%20*%2F%0D%0Afunction%20extend%20(head%3A%20boolean%20%7C%20IObject%2C%20...tail%3A%20IObject%5B%5D)%3A%20IObject%20%7B%0D%0A%20%20let%20target%3A%20IObject%3B%0D%0A%20%20let%20deep%3A%20boolean%3B%0D%0A%20%20let%20i%3A%20number%3B%0D%0A%0D%0A%20%20%2F%2F%20%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%B0%D1%82%D1%8B%D0%B2%D0%B0%D0%B5%D0%BC%20%D1%81%D0%B8%D1%82%D1%83%D0%B0%D1%86%D0%B8%D1%8E%20%D0%B3%D0%BB%D1%83%D0%B1%D0%BE%D0%BA%D0%BE%D0%B3%D0%BE%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.%0D%0A%20%20if%20(typeof%20head%20%3D%3D%3D%20'boolean')%20%7B%0D%0A%20%20%20%20deep%20%3D%20head%3B%0D%0A%20%20%20%20target%20%3D%20tail%5B0%5D%3B%0D%0A%20%20%20%20i%20%3D%201%3B%0D%0A%20%20%7D%20else%20%7B%0D%0A%20%20%20%20deep%20%3D%20false%3B%0D%0A%20%20%20%20target%20%3D%20head%3B%0D%0A%20%20%20%20i%20%3D%200%3B%0D%0A%20%20%7D%0D%0A%0D%0A%20%20for%20(%3B%20i%20%3C%20tail.length%3B%20i%2B%2B)%20%7B%0D%0A%20%20%20%20const%20obj%3A%20IObject%20%3D%20tail%5Bi%5D%3B%0D%0A%0D%0A%20%20%20%20if%20(!obj)%20%7B%0D%0A%20%20%20%20%20%20continue%3B%0D%0A%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20for%20(const%20key%20in%20obj)%20%7B%0D%0A%20%20%20%20%20%20if%20(hasOwnProperty.call(obj%2C%20key))%20%7B%0D%0A%20%20%20%20%20%20%20%20const%20val%3A%20any%20%3D%20obj%5Bkey%5D%3B%0D%0A%20%20%20%20%20%20%20%20const%20isArray%3A%20boolean%20%3D%20val%20%26%26%20Array.isArray(val)%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20%2F%2F%20%D0%9A%D0%BE%D0%BF%D0%B8%D1%80%D1%83%D0%B5%D0%BC%20%22%D0%BF%D0%BB%D0%BE%D1%81%D0%BA%D0%B8%D0%B5%22%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B%20%D0%B8%20%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D1%8B%20%D1%80%D0%B5%D0%BA%D1%83%D1%80%D1%81%D0%B8%D0%B2%D0%BD%D0%BE.%0D%0A%20%20%20%20%20%20%20%20if%20(deep%20%26%26%20val%20%26%26%20(isPlainObject(val)%20%7C%7C%20isArray))%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20const%20src%3A%20any%20%3D%20target%5Bkey%5D%3B%0D%0A%20%20%20%20%20%20%20%20%20%20let%20clone%3A%20IObject%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20if%20(isArray)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20clone%20%3D%20src%20%26%26%20Array.isArray(src)%20%3F%20src%20%3A%20%5B%5D%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%7D%20else%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20clone%20%3D%20src%20%26%26%20isPlainObject(src)%20%3F%20src%20%3A%20%7B%7D%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20target%5Bkey%5D%20%3D%20extend(deep%2C%20clone%2C%20val)%3B%0D%0A%20%20%20%20%20%20%20%20%7D%20else%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20target%5Bkey%5D%20%3D%20val%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%7D%0D%0A%20%20%7D%0D%0A%0D%0A%20%20return%20target%3B%0D%0A%7D%0D%0A)

### Flow

- Выделил интерфейс `IObject` для определения типов объектов с перечисляемыми свойствами. Но массивы в отличии от TypeScript во flow в него не подпадают. Так что в одном месте мне пришлось использовать `any[] | IObject`.
- Разбил аргументы функции `extend` на две части: `head` и `tail`, для того что бы тип `boolean` был разрешен только для первого аргумента.
- В общем сделал почти туже реализацию для Flow, что и для TypeScript.
- [Ссылка]( https://flow.org/try/#0PTAEAEDMBsHsHcBQBjWA7AzgF1ACwIYYDy8aACgE6wAOAphVgJ6gC8oRARgFa3JYB01KllhM6-AsVKUa9JgG4U6bKBEBlLBQCWaAOat23XgKGjRjces07dixMABUDxKAehA+CCABEEB8IICYQQKwgnoDyIP6AQiAANKCA4iCh3qCA-CCB-oAsIIAMIIC8IOmA0iCAnCCg3oCMIIBSIP6AXCChoEG+gNwgIaGAgiBBoABE8dXe9aWAHCCAPCDNoAAUofz+-KD13oDsIGmZWT3jCd493oCSIIAyIIByIC0A3gC+zS5uXdVdLWi08IY8fM0AlPyHhxDU+BT4ALag25zXWLugsG4T3AFFoWAArhRMF8AEKwWDQWj4NC7Q7ARCQcFoPhadCgLQYMjQfA6H7GQaArgALiuxluNI48MRyK+LnxkEGVm0en4yHw0GgA0pt1AAEIWGwAOQAbUp5LJfAAupKRds2aBQKCIVDQJB+RhaIoNai2ahMDhTCIxLQaQqcGw7fxdGCZFaLLQiJAhdxbnYNVrIWhQJbzHRWBLQGhwQLQAAfWPB4Sh2jhh1GPiCJPWxQm2gAD2osAY+LQWHoeuQKYAknbQPmy2gACYYWl8Vka6UAa1ojBp2G5ukVNORjBziHsTiegCwQbzxLqeQDCIGEEkkol16icell-ONfN4cvVQr5UvlkulvIBmEDix1O6X8nW81TW3UAoiD5YplWK+UDfwBiIP5qn8Pc8kKEpygeVxgReN5Pm2OEESRFFQGlRtaFoagWD1aADUVDxPFOSZ0lSKJ-HSLpTgAA00cFaAo3d90PY9QFKWd5wXDYGiaTwygXTx6i6XxzwgtxwGgj4vjtf4sFeZ0cEAPBAP3KUBklqUBPFSepAAkQedSK6IIxjk9JFmqBc1wqc9fG3eiDyPVJhOeV5xO2fgXMkgF0ywFsFLA0IsnGOJ6mAxjUh6U4VKaFi5x8Y8yP00BAAQQTwLwXHpSN8-zQEI4jdKCUKng1AqKKjAU6JvUAKKxVDIB0WhG1Ki9z3wxcOMaeyQTBQMW2+DzUVcdEzRUetaCbAxMWxLBcSDIaRoGXAkUbBkmUQuNQBrDzIhc-hpK0aAaTW35pUVelVtrNUNURHBpIoWS9rtI1QAu0BUPQxaEORe7Hq0Gko3eDh6D9UAQFABT1IKVJfOPfx5n40IF1SX8ui2C8TIKbwWKvZjWOijI9Ig9lOXdWAOTm-BG1TUBJUZN60BVdsCue6gDBJxt7o1K7ZIMbboGlAAGRVWfxAwAEZ7v+WhsJTM76bQxm2Cwg0BfZsEmfmgWtAMHnRfHDVICLQZ5EFgAeVQSWgfhET0LBcANrQAGpbdVdVQAGnBKVujzOdN6UtH57WCq0DkBlFYU6YK530AmqNDSdk0w91ihBhd0Bu2YHR3K4R2w41APBkkEhyCoOgGEYXl+UFSlIhT25M6zjUk4AN35Yc0GYNhKS7HtfdruvlBwAkAEEKDeXtQCp5kgzYRvoFAAAyGfQEH4f+AHof8EYAYp99P3a6BmcoqXeZWnaToun8fpQM-PzTh6DT+MstSeL4gShKdsOc4GBnZ-nqev8GAkiRJGgO0G9+QinjPiDAi817V1Dt3JOGAKDIGbq3E210wQd0YF3bu51lbIDgOcZBh0Vp3W3t3d+K9h412wXXfBKY2AIOQL-KBJcKFrwGAwkUAB+UADDQA0kOgLWuYsJawOwXg9AdCeGIN-v-YkpIPLsMQVwqRjCaR7EEVnWO1ClZYAwbhNg01GwfxlpEcR5xIibw0caOsIipbYJ0XogwU8rGgF6pomObItEBh1DonMiggA)
