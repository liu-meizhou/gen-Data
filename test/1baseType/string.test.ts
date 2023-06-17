import { mock } from "src/main";
import { expect, it } from "vitest";

it('genString', () => {
    const res = mock.string();
    expect(typeof res).toBe('string');
    expect(res === mock.string()).toBe(false);
});

it('字符串长度', () => {
    const len = 20;
    const res = mock.string({len});
    expect(res.length === len).toBe(true);
});