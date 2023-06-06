import { genNumber } from "./number";

export interface BooleanOption { };

export const genBoolean = () => {
    return !!genNumber({
        min: 0,
        max: 1,
        fixed: 0
    });
}
