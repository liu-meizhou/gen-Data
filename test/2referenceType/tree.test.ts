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
        },
        childrenLen: '2-4',
        childrenLayer: 3
    });
    expect(typeof res.key1).toBe('number');
    expect(typeof res.key2).toBe('string');
    expect(Array.isArray(res.key3) && res.key3.length >= 10 && res.key3.length <= 15).toBe(true);
    expect(Array.isArray(res.children) && res.children.length >= 2 && res.children.length <= 4).toBe(true);
});

