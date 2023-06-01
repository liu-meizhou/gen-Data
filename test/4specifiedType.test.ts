import dayjs from 'dayjs';
import { genDateTime, genNumber, genString } from 'src/index';
import { DateType } from 'src/type';
import { it, expect } from 'vitest';

it('genNumber', () => {
    const res = genNumber({
        min: 3,
        max: 6,
        fixed: 2
    });
    expect(res >= 3 && res <= 6).toBe(true)
});

it('genString', () => {
    const res = genString({
        len: 10
    });
    expect(res.length).toBe(10)
});

it('genDate', () => {
    const res = genDateTime({
        dataType: DateType.string,
        format: 'YYYY-MM-DD HH'
    });
    expect(dayjs(res).format('YYYY-MM-DD HH')).toBe(res);
});
