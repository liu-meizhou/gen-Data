import { genBoolean, init } from "src";
import { beforeAll, expect, it } from "vitest";

beforeAll(() => {
    init();
})

it('genBoolean', () => {
    const res = genBoolean();
    expect(typeof res).toBe('boolean');
    expect([true, false].includes(res)).toBe(true);
});
