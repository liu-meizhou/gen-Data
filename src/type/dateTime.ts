import dayjs from "dayjs";
import { registerGenerator } from "src/generator";
import { BuiltInType, DateType, GenData } from "src/type";
import { genNumber } from "./number";
import { genString } from "./string";

export type DateTimeOption = ({
    dataType?: DateType.number;
    len?: 10 | 13;
} | {
    dataType?: DateType.string;
    format?: string;
}) & {
    startTime?: number | string | Date;
    endTime?: number | string | Date;
};

type GenDateTime = GenData<DateTimeOption, string | number>;

const getMergeOption = (option?: DateTimeOption) => {
    const dataType = option?.dataType ?? genString({
        charSet: [DateType.number, DateType.string],
        len: 1
    });

    let res: DateTimeOption;

    if (dataType === DateType.number) {
        res = {
            dataType: DateType.number,
            // @ts-ignore
            len: option?.len ?? parseInt(genString({
                charSet: ['10', '13'],
                len: 1
            }))
        }
    } else {
        res = {
            dataType: DateType.string,
            // @ts-ignore
            format: option?.format ?? 'YYYY-MM-DD hh:mm:ss'
        }
    }

    if (typeof option?.startTime === 'number' && option.startTime.toString().length === 10) {
        res.startTime = dayjs.unix(option.startTime).valueOf();
    } else {
        res.startTime = option?.startTime ? dayjs(option.startTime).valueOf() : dayjs().subtract(100, 'day').valueOf();
    }

    if (typeof option?.endTime === 'number' && option.endTime.toString().length === 10) {
        res.endTime = dayjs.unix(option.endTime).valueOf();
    } else {
        res.endTime = option?.endTime ? dayjs(option.endTime).valueOf() : dayjs().add(100, 'day').valueOf();
    }

    return res as ({
        dataType: DateType.number;
        len: 10 | 13;
    } | {
        dataType: DateType.string;
        format: string;
    }) & {
        startTime: number;
        endTime: number;
    };
}

export const genDateTime: GenDateTime = (option) => {
    const mergeOption = getMergeOption(option);
    const res = dayjs(genNumber({
        min: mergeOption.startTime,
        max: mergeOption.endTime,
        fixed: 0
    }));

    if (mergeOption.dataType === DateType.number) {
        return mergeOption.len === 10 ? res.unix() : res.valueOf();
    }
    return res.format(mergeOption.format);
}

registerGenerator({
    [BuiltInType.dateTime]: genDateTime
})
