import { mock } from "src/main";
import dayjs from 'dayjs';
import { expect, it } from "vitest";

it('时间戳', () => {
    const res = mock.dateTime({
        accuracy: 's',
        startTime: dayjs().unix(),
        endTime: dayjs().add(500, 'day').valueOf()
    });
    expect(typeof res).toBe('number');
    expect(res.toString().length).toBe(10);
    expect(res >= dayjs().unix()).toBe(true);
    expect(res <= dayjs().add(500, 'day').unix()).toBe(true);
});

it('字符串', () => {
    const res = mock.dateTime({
        format: 'YYYY-MM-DD'
    });
    expect(typeof res).toBe('string');
    expect(dayjs(res).format('YYYY-MM-DD')).toBe(res);
    expect(dayjs(res).format('HH:mm:ss')).toBe('00:00:00');
    expect(res === mock.dateTime({
        format: 'YYYY-MM-DD'
    })).toBe(false);
});
