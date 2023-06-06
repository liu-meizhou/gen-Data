import dayjs from 'dayjs';
import { genDateTime, init } from "src";
import { DateType } from 'src/type';
import { beforeAll, expect, it } from "vitest";

beforeAll(() => {
    init();
})

it('数据结构为number', () => {
    const res = genDateTime({
        dataType: DateType.number,
        accuracy: 's',
        startTime: dayjs().unix(),
        endTime: dayjs().add(500, 'day').valueOf()
    });
    expect(res.toString().length).toBe(10);
    expect(res >= dayjs().unix()).toBe(true);
    expect(res <= dayjs().add(500, 'day').unix()).toBe(true);
});

it('数据结构为string', () => {
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
