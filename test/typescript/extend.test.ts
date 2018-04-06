import extend from './../../src/typescript/extend';
import { expect } from 'chai';
import 'mocha';

describe('extend.ts', () => {
  it('plain', () => {
    const result = extend({ a: 1 }, { b: 1 }, { c: 1 });
    const expected = { a: 1, b: 1, c: 1 };

    expect(result).to.deep.equal(expected);
  });

  it('plain with same properties', () => {
    const result = extend({ a: 1 }, { a: 2 }, { c: 1 });
    const expected = { a: 2, c: 1 };

    expect(result).to.deep.equal(expected);
  });

  it('plain with mutation', () => {
    let objA = { a: 1 };
    let objB = { b: 1 };
    let objC = { c: 1 };
    const result = extend(objA, objB, objC);
    const expected1 = { a: 1, b: 1, c: 1 };
    const expected2 = { a: 1, b: 1, c: 1 };

    expect(result).to.deep.equal(expected1);
    objC.c = 2;
    expect(result).to.deep.equal(expected2);
  });

  it('plain with array', () => {
    const result = extend([1], [1, 2, 3]);
    const expected = [1, 2, 3];

    expect(result).to.deep.equal(expected);
  });

  it('plain with null', () => {
    const result = extend({ a: 1 }, { b: 1 }, null);
    const expected = { a: 1, b: 1 };

    expect(result).to.deep.equal(expected);
  });

  it('plain with undefined', () => {
    const result = extend({ a: 1 }, { b: 1 }, undefined);
    const expected = { a: 1, b: 1 };

    expect(result).to.deep.equal(expected);
  });

  it('not deep', () => {
    const result = extend({ a: 1 }, { b: 1 }, { c: { d: 2 } });
    const expected = { a: 1, b: 1, c: { d: 2 } };

    expect(result).to.deep.equal(expected);
  });

  it('not deep with same properties', () => {
    const result = extend({ a: 1 }, { b: 1 }, { b: { d: 2 } });
    const expected = { a: 1, b: { d: 2 } };

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

  it('not deep with array', () => {
    const result = extend({ a: [1] }, { a: [1, 2, 3] });
    const expected = { a: [1, 2, 3] };

    expect(result).to.deep.equal(expected);
  });

  it('not deep with null', () => {
    const result = extend({ a: 1 }, { b: 1 }, { c: null });
    const expected = { a: 1, b: 1, c: null };

    expect(result).to.deep.equal(expected);
  });

  it('not deep with undefined', () => {
    const result = extend({ a: 1 }, { b: 1 }, { c: undefined });
    const expected = { a: 1, b: 1, c: undefined };

    expect(result).to.deep.equal(expected);
  });

  it('deep', () => {
    const result = extend(true, { a: 1 }, { b: 1 }, { c: { d: 2 } });
    const expected = { a: 1, b: 1, c: { d: 2 } };

    expect(result).to.deep.equal(expected);
  });

  it('deep with same properties', () => {
    const result = extend(true, { a: 1 }, { b: 1 }, { b: { d: 2 } });
    const expected = { a: 1, b: { d: 2 } };

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

  it('deep with array', () => {
    const result = extend(true, { a: [1] }, { a: [2, 3] });
    const expected = { a: [2, 3] };

    expect(result).to.deep.equal(expected);
  });

  it('deep with null', () => {
    const result = extend(true, { a: 1 }, { b: 1 }, { c: { d: null } });
    const expected = { a: 1, b: 1, c: { d: null } };

    expect(result).to.deep.equal(expected);
  });

  it('deep with undefined', () => {
    const result = extend(true, { a: 1 }, { b: 1 }, { c: { d: undefined } });
    const expected = { a: 1, b: 1, c: { d: undefined } };

    expect(result).to.deep.equal(expected);
  });

  it('very deep', () => {
    const objA = {
      a: { b: { c: { d: { e: { f: { g: { h: { i: { j: 10 } } } } } } } } }
    };
    const objK = {
      k: { l: { m: { n: { o: { p: { r: { s: { t: { u: 10 } } } } } } } } }
    };
    const result = extend(true, objA, objK);
    const expected = {
      a: { b: { c: { d: { e: { f: { g: { h: { i: { j: 10 } } } } } } } } },
      k: { l: { m: { n: { o: { p: { r: { s: { t: { u: 10 } } } } } } } } }
    };

    expect(result).to.deep.equal(expected);
  });

  it('very deep with same properties', () => {
    const objA = {
      a: { b: { c: { d: { e: { f: { g: { h: { i: { j: 10 } } } } } } } } }
    };
    const objA2 = {
      a: { b: { c: { d: { e: { f: { g: { h: { i: { j: 0 } } } } } } } } }
    };
    const result = extend(true, objA, objA2);
    const expected = {
      a: { b: { c: { d: { e: { f: { g: { h: { i: { j: 0 } } } } } } } } }
    };

    expect(result).to.deep.equal(expected);
  });

  it('very deep with mutation', () => {
    const objA = {
      a: { b: { c: { d: { e: { f: { g: { h: { i: { j: 10 } } } } } } } } }
    };
    const objK = {
      k: { l: { m: { n: { o: { p: { r: { s: { t: { u: 10 } } } } } } } } }
    };
    const result = extend(true, objA, objK);
    const expected = {
      a: { b: { c: { d: { e: { f: { g: { h: { i: { j: 10 } } } } } } } } },
      k: { l: { m: { n: { o: { p: { r: { s: { t: { u: 10 } } } } } } } } }
    };

    objK.k.l.m.n.o.p.r.s.t.u = 0;

    expect(result).to.deep.equal(expected);
  });

  it('very deep with array', () => {
    const objA = {
      a: [{
        b: [
          {
            c: [{ d: [{ e: [{ f: [{ g: [{ h: [{ i: [{ j: 10 }] }] }] }] }] }] }]
          }
        ],
        k: [3]
      }],
      l: [2]
    };
    const objK = {
      a: [{
        b: [
          {
            m: [{ n: [{ o: [{ p: [{ r: [{ s: [{ t: [{ u: 10 }] }] }] }] }] }] }]
          }
        ],
        w: { x: [4] },
        z: [3]
      }]
    };
    const result = extend(true, objA, objK);
    const expected = {
      a: [{
        b: [
          {
            c: [{ d: [{ e: [{ f: [{ g: [{ h: [{ i: [{ j: 10 }] }] }] }] }] }] }],
            m: [{ n: [{ o: [{ p: [{ r: [{ s: [{ t: [{ u: 10 }] }] }] }] }] }] }]
          }
        ],
        k: [3],
        w: { x: [4] },
        z: [3]
      }],
      l: [2]
    };

    expect(result).to.deep.equal(expected);
  });

  it('very deep with null', () => {
    const objA = {
      a: { b: { c: { d: { e: { f: { g: { h: { i: null } } } } } } } }
    };
    const objK = {
      k: { l: { m: { n: { o: { p: { r: { s: { t: { u: null } } } } } } } } }
    };
    const result = extend(true, objA, objK);
    const expected = {
      a: { b: { c: { d: { e: { f: { g: { h: { i: null } } } } } } } },
      k: { l: { m: { n: { o: { p: { r: { s: { t: { u: null } } } } } } } } }
    };

    expect(result).to.deep.equal(expected);
  });

  it('very deep with undefined', () => {
    const objA = {
      a: { b: { c: { d: { e: { f: { g: { h: { i: undefined } } } } } } } }
    };
    const objK = {
      k: { l: { m: { n: { o: { p: { r: { s: { t: { u: undefined } } } } } } } } }
    };
    const result = extend(true, objA, objK);
    const expected = {
      a: { b: { c: { d: { e: { f: { g: { h: { i: undefined } } } } } } } },
      k: { l: { m: { n: { o: { p: { r: { s: { t: { u: undefined } } } } } } } } }
    };

    expect(result).to.deep.equal(expected);
  });
});
