import { mock } from "src/main";
import { expect, it } from "vitest";

it('genArray', () => {
    const res = mock.array();
    expect(Array.isArray(res)).toBe(true);
});

it('数组长度输入错误', () => {
    try {
        mock.array({ len: -4 });
        expect('走到这一步就是错了').toBe('不可能到这一步');
    } catch (err) {
        expect(err).toBe('数组的长度必须大于等于0');
    }
});

it('数组类型输入错误', () => {
    const errType = 'errTypeaaaa';
    try {
        // @ts-ignore
        mock.array({ type: errType });
        expect('走到这一步就是错了').toBe('不可能到这一步');
    } catch (err) {
        expect(err).toBe(`类型：${errType} 未注册`);
    }
});