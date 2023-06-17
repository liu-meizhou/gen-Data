import dayjs from "dayjs";
import { genNumber } from "./number";

export type DateTimeOption = {
    accuracy?: 's' | 'ms';
    format?: string;
    startTime?: number | string | Date;
    endTime?: number | string | Date;
};

// 解析完统一转换成妙单位
const parseTime = (time: number | string | Date): number => {
    if (typeof time === 'number' && time.toString().length === 10) {
        return dayjs.unix(time).valueOf();
    }
    return dayjs(time).valueOf();
}

const getMergeOption = (option?: DateTimeOption) => {
    const res: DateTimeOption = {
        accuracy: option?.accuracy,
        format: option?.format,
        startTime: option?.startTime,
        endTime: option?.endTime
    };

    if (!res.accuracy) {
        res.format = res.format ?? 'YYYY-MM-DD HH:mm:ss'
    }

    if (res.startTime && res.endTime) {
        res.startTime = parseTime(res.startTime);
        res.endTime = parseTime(res.endTime);
    } else if (res.startTime) {
        res.startTime = parseTime(res.startTime);
        res.endTime = dayjs(res.startTime).add(100, 'day').valueOf();
    } else if (res.endTime) {
        res.endTime = parseTime(res.endTime);
        res.startTime = dayjs(res.endTime).subtract(100, 'day').valueOf();
    } else {
        res.startTime = dayjs().subtract(100, 'day').valueOf();
        res.endTime = dayjs().add(100, 'day').valueOf();
    }

    return res as {
        accuracy: 's' | 'ms';
        format: string;
        startTime: number;
        endTime: number;
    };
}

export const genDateTime = (option?: DateTimeOption) => {
    const mergeOption = getMergeOption(option);
    const res = dayjs(genNumber({
        min: mergeOption.startTime,
        max: mergeOption.endTime,
        fixed: 0
    }));

    if (mergeOption.accuracy) {
        return mergeOption.accuracy === 's' ? res.unix() : res.valueOf();
    }
    return res.format(mergeOption.format);
}
