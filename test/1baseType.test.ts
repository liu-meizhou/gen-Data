import dayjs from 'dayjs';
import { genBoolean, genDateTime, genNumber, genString } from 'src/index';
import { DateType } from 'src/type';
import { it, expect } from 'vitest';

it('genString', () => {
    const res = genString();
    expect(typeof res).toBe('string');
    expect(res === genString()).toBe(false);
});

it('genNumber', () => {
    const res = genNumber();
    expect(typeof res).toBe('number');
    expect(res === genNumber()).toBe(false);
});

it('genBoolean', () => {
    const res = genBoolean();
    expect(typeof res).toBe('boolean');
    expect([true, false].includes(res)).toBe(true);
});

it('genDate', () => {
    const res = genDateTime({
        dataType: DateType.string,
        format: 'YYYY-MM-DD'
    });
    expect(dayjs(res).format('YYYY-MM-DD')).toBe(res);
    expect(dayjs(res).format('HH:mm:ss')).toBe('00:00:00');
    expect(res === genDateTime({
        dataType: DateType.string,
        format: 'YYYY-MM-DD'
    })).toBe(false);
});

it('genTime', () => {
    const res = genDateTime({
        dataType: DateType.string,
        format: 'HH:mm:ss'
    });
    expect(dayjs(`2023-05-29 ${res}`).format('HH:mm:ss')).toBe(res);
    expect(res === genDateTime({
        dataType: DateType.string,
        format: 'HH:mm:ss'
    })).toBe(false);
});


