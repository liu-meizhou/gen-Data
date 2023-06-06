import { genData, init } from 'src';
import { it, expect, beforeAll } from 'vitest';

beforeAll(() => {
    init();
})

it('自动生成类型', () => {
    const res = genData();
    expect(res === genData()).toBe(false);
});

it('错误类型', () => {
    const errType = 'errTypeaaaa';
    try {
        // @ts-ignore
        genData({ type: errType });
        expect('走到这一步就是错了').toBe('不可能到这一步');
    } catch (err) {
        expect(err).toBe(`类型 ${errType} 未注册`);
    }
});

