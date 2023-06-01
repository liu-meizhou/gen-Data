import { GenData } from "./type";

const genFuncMap = new Map<string, GenData<any, any>>();

export const getGenerators = () => {
    return Array.from(genFuncMap.keys());
};

export const getGenerator = (key: string) => genFuncMap.get(key);

export const registerGenerator = (customFuncObj: Record<string, GenData<any, any>>) => {
    Object.entries(customFuncObj).forEach(([key, value]) => {
        genFuncMap.set(key, value);
    })
}
