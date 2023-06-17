import { mock } from "src/main";
import { BuiltInType } from "src/type";
import { it, expect } from 'vitest';

it('自动生成类型', () => {
    const res = mock.gen();
    expect(res === mock.gen()).toBe(false);
});

it('自动生成类型-生成number', () => {
    const res = mock.gen({
        type: BuiltInType.number,
        typeOption: {
            min: 10,
            max: 100
        }
    });
    expect(typeof res).toBe('number');
});

it('错误类型', () => {
    const errType = 'errTypeaaaa';
    try {
        // @ts-ignore
        mock.gen({ type: errType });
        expect('走到这一步就是错了').toBe('不可能到这一步');
    } catch (err) {
        expect(err).toBe(`类型 ${errType} 未注册`);
    }
});

