import { genPhone } from 'src/customType/phone';
import { genIdCard } from 'src/customType/idCard';
import { it, expect, beforeAll } from 'vitest';
import { init } from 'src';

beforeAll(() => {
    init();
})

it('genIdCard', () => {
    const res = genIdCard();
    expect(res.length).toBe(18);
    expect(res === genIdCard()).toBe(false);
});


it('genPhone', () => {
    const res = genPhone();
    expect(res.length).toBe(11);
    expect(res === genPhone()).toBe(false);
});
