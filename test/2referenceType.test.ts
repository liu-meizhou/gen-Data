import { genArray, genObject } from 'src/index';
import { expect, it } from 'vitest';

it('genObject', () => {
    const res = genObject();
    expect(Object.prototype.toString.call(res)).toBe('[object Object]');
});

it('genArray', () => {
    const res = genArray();
    expect(Array.isArray(res)).toBe(true);
});
