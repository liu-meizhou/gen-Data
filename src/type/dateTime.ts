import dayjs from "dayjs";
import { DateType } from "src/type";
import { genNumber } from "./number";
import { genString } from "./string";

export type DateTimeOption = ({
    dataType?: DateType.number;
    accuracy?: 's' | 'ms';
} | {
    dataType?: DateType.string;
    format?: string;
}) & {
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
    const dataType = option?.dataType || genString({
        charSet: [DateType.number, DateType.string],
        len: 1
    });

    const res: DateTimeOption = {
        startTime: option?.startTime,
        endTime: option?.endTime
    };

    if (dataType === DateType.number) {
        Object.assign(res, {
            dataType: DateType.number,
            // @ts-ignore
            accuracy: option?.accuracy || genString({
                charSet: ['s', 'ms'],
                len: 1
            })
        })
    } else if (dataType === DateType.string) {
        Object.assign(res, {
            dataType: DateType.string,
            // @ts-ignore
            format: option?.format ?? 'YYYY-MM-DD HH:mm:ss'
        })
    } else {
        throw `数据类型 ${dataType} 必须为 'number' 或者 'string' `;
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

    return res as ({
        dataType: DateType.number;
        accuracy: 's' | 'ms';
    } | {
        dataType: DateType.string;
        format: string;
    }) & {
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

    if (mergeOption.dataType === DateType.number) {
        return mergeOption.accuracy === 's' ? res.unix() : res.valueOf();
    }
    return res.format(mergeOption.format);
}
