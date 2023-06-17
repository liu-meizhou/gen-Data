import { mock } from "src/main";
import { BuiltInType } from "src/type";
import { expect, it } from "vitest";

it('genObject', () => {
    const res = mock.object({
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
    expect(typeof res.key1).toBe('number');
    expect(typeof res.key2).toBe('string');
    expect(Array.isArray(res.key3) && res.key3.length >= 10 && res.key3.length <= 15).toBe(true);
});
