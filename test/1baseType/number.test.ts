import { genNumber, init } from "src";
import { beforeAll, expect, it } from "vitest";

beforeAll(() => {
    init();
})

it('genNumber', () => {
    const res = genNumber();
    expect(typeof res).toBe('number');
    expect(res === genNumber()).toBe(false);
});

it('保留小数位数传入错误', () => {
    try {
        genNumber({ fixed: -6 });
        expect('走到这一步就是错了').toBe('不可能到这一步');
    } catch (err) {
        expect(err).toBe('传入的小数点必须大于等于0');
    }
});

it('只存在最小值', () => {
    const min = 500;
    const res = genNumber({ min });
    expect(res >= min).toBe(true);
});

it('只存在最大值', () => {
    const max = 500;
    const res = genNumber({ max });
    expect(res <= max).toBe(true);
});
