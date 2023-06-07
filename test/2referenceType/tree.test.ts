import { init } from "src";
import { BuiltInType } from "src/type";
import { genTree } from "src/type/tree";
import { beforeAll, expect, it } from "vitest";

beforeAll(() => {
    init();
})

it('genTree', () => {
    const res = genTree({
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

