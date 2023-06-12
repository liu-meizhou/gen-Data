
// 以下是业务代码自己写的

import { genIdCard } from "./customType/idCard";
import { genPhone } from "./customType/phone";
import { useGenerator } from "./index";

export const mock = useGenerator({
    phone: genPhone,
    idCard: genIdCard,
});

const a = mock.gen('array', {
    'type': 'number',
    typeOption: {
    }
})

mock.array({
    type: 'number',
    typeOption: {
        ''
    }
})

const aa = mock.array({
    type: 'array',
    typeOption: {
        'type': 'array',
        typeOption: {

        }
    }
})


type key = 'a' | 'b' | 'c'

type A = {min: number}
type B = {max: number}
type C = {
    type: string, 
    x: bbb
}

type keyMap = {
    'a': A,
    'b': B,
    'c': C
}
type xxx = {
    [key in keyof keyMap]: {
        type: key,
        typeO: keyMap[key]
    }
}

type dad = xxx[key]


type UnionToIntersection<U> = (U extends any ? (a: (k: U) => void) => void : never) extends (a: infer I) => void ? I : never;
type UnionLast<U> = UnionToIntersection<U> extends (a: infer I) => void ? I : never;
type UnionToTuple<U> = [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, UnionLast<U>>>, UnionLast<U>];


type AO = {
    type: 'a',
    typeO: A
}
type BO = {
    type: 'b',
    typeO: B
}
type CO = {
    type: 'c',
    typeO: C
}

type bbb = AO | BO | CO

const aadsad:bbb = {
    type: 'a',
    typeO: {
        min: 0
    }
}

aadsad instanceof AO

type aaa<T extends key> = {
    type: T,
    typeOption: bbb<T>
}

