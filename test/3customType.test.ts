import { mock } from "src/main";
import { it, expect } from 'vitest';

it('genIdCard', () => {
    const res = mock.idCard();
    expect(res.length).toBe(18);
    expect(res === mock.idCard()).toBe(false);
});


it('genPhone', () => {
    const res = mock.phone();
    expect(res.length).toBe(11);
    expect(res === mock.phone()).toBe(false);
});
