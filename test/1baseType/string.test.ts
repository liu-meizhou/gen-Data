import { genString, init } from "src";
import { beforeAll, expect, it } from "vitest";

beforeAll(() => {
    init();
})

it('genString', () => {
    const res = genString();
    expect(typeof res).toBe('string');
    expect(res === genString()).toBe(false);
});

it('字符串长度', () => {
    const len = 20;
    const res = genString({len});
    expect(res.length === len).toBe(true);
});