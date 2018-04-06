const extend = require('./../../src/es6/extend');
const { expect } = require('chai');
const { describe, it } = require('mocha');

describe('extend.js', () => {
  it('plain objects with different properies', () => {
    const result = extend({ a: 1 }, { b: 1 }, { c: 1 });
    const expected = { a: 1, b: 1, c: 1 };

    expect(result).to.deep.equal(expected);
  });

  it('plain objects with same properties', () => {
    const result = extend({ a: 1 }, { a: 2 }, { c: 1 });
    const expected = { a: 2, c: 1 };

    expect(result).to.deep.equal(expected);
  });

  it('not deep', () => {
    const result = extend({ a: 1 }, { b: 1 }, { c: { d: 2 } });
    const expected = { a: 1, b: 1, c: { d: 2 } };

    expect(result).to.deep.equal(expected);
  });

  it('not deep with mutation', () => {
    let objA = { a: 1 };
    let objB = { b: 1 };
    let objD = { d: 2 };
    let objC = { c: objD };
    const result = extend(objA, objB, objC);
    const expected1 = { a: 1, b: 1, c: { d: 2 } };
    const expected2 = { a: 1, b: 1, c: { d: 1 } };

    expect(result).to.deep.equal(expected1);
    objD.d = 1;
    expect(result).to.deep.equal(expected2);
  });

  it('deep', () => {
    const result = extend(true, { a: 1 }, { b: 1 }, { c: { d: 2 } });
    const expected = { a: 1, b: 1, c: { d: 2 } };

    expect(result).to.deep.equal(expected);
  });

  it('deep with mutation', () => {
    let objA = { a: 1 };
    let objB = { b: 1 };
    let objD = { d: 2 };
    let objC = { c: objD };
    const result = extend(true, objA, objB, objC);
    const expected = { a: 1, b: 1, c: { d: 2 } };

    objD.d = 1;
    expect(result).to.deep.equal(expected);
  });
});
