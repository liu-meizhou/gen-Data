import { genObject } from 'src/index';
import { BuiltInType } from 'src/type';
import { it, expect } from 'vitest';

it('genJson', () => {
    const res = genObject([{
        key: '1',
        type: BuiltInType.object,
        typeOption: [{
            key: '1-1',
            type: BuiltInType.string
        }]
    }, {
        key: '2',
        type: BuiltInType.object,
        typeOption: [{
            key: '2-1',
            type: BuiltInType.array,
            typeOption: {
                type: BuiltInType.number
            }
        }, {
            key: '2-2',
            type: BuiltInType.object
        }]
    }]);
    expect(Object.prototype.toString.call(res['1'])).toBe('[object Object]');
    expect(typeof res['1']['1-1']).toBe('string');
    expect(Array.isArray(res['2']['2-1'])).toBe(true);
});
