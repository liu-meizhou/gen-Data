import { registerGenerator } from "src/generator";
import { BuiltInType, GenData } from "src/type";
import { genNumber } from "./number";

export interface BooleanOption { };

type GenBoolean = GenData<BooleanOption, boolean>;

export const genBoolean: GenBoolean = (option) => {
    return !!genNumber({
        min: 0,
        max: 1,
        fixed: 0
    });
}

registerGenerator({
    [BuiltInType.boolean]: genBoolean
})
