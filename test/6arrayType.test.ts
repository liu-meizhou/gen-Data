import { genArray } from 'src/index';
import { it, expect } from 'vitest';

it('genArray', () => {
    const len = 20;
    const res = genArray({
        len
    });
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBe(len);
});
