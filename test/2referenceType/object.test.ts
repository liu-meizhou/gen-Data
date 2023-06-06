import { genObject, init } from "src";
import { BuiltInType } from "src/type";
import { beforeAll, expect, it } from "vitest";

beforeAll(() => {
    init();
})

it('genObject', () => {
    const res = genObject({
        template: {
            key1: 'number',
            key2: 'string',
            key3: {
                type: BuiltInType.array,
                typeOption: {
                    len: '10-15'
                }
            }
        }
    });
    expect(Object.prototype.toString.call(res)).toBe('[object Object]');
});
