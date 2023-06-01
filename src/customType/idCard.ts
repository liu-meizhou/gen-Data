import { DateType, GenData } from "../type";
import { genDateTime, genNumber, genString, registerGenerator } from "../index";
import CradData from './data.json';

const key = 'idCard';

export interface IdCardOption {
    code?: string;            // 6位长度的地区编码
    dateStart?: number | string | Date;
    dateEnd?: number | string | Date;
    sex?: '男' | '女';
};

type GenIdCard = GenData<IdCardOption, string>;

const genCode = (data = CradData): string => {
    const index = genNumber({ min: 0, max: data.length - 1, fixed: 0 });
    if (data[index].children.length) {
        return genCode(data[index].children);
    }
    return data[index].code;
}

const getMergeOption = (option?: IdCardOption) => {
    const code = option?.code ?? genCode();
    const date = genDateTime({
        dataType: DateType.string,
        format: 'YYYYMMDD',
        startTime: option?.dateStart,
        endTime: option?.dateEnd
    });
    let charSet = '0123456789';
    if (option?.sex === '男') {
        charSet = '13579';
    } else if (option?.sex === '女') {
        charSet = '02468';
    }
    const sex = genString({
        charSet,
        len: 1
    });
    return {
        code,
        date,
        sex
    };
}

export const genIdCard: GenIdCard = (option) => {
    const mergeOption = getMergeOption(option);
    // 同地区同时间出生的编码
    let index: number | string = genNumber({
        min: 0,
        max: 99,
        fixed: 0
    });
    index = index < 10 ? `0${index}` : index;
    const endCode = genString({
        charSet: '0123456789X',
        len: 1
    })
    return `${mergeOption.code}${mergeOption.date}${index}${mergeOption.sex}${endCode}`;
}

registerGenerator({
    [key]: genIdCard
});
