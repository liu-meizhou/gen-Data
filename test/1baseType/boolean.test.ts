import { mock } from "src/main";
import { expect, it } from "vitest";


it('genBoolean', () => {
    const res = mock.boolean();
    expect(typeof res).toBe('boolean');
    expect([true, false].includes(res)).toBe(true);
});
