import { Operator } from '../types.ts';
export default interface QueryRule {
    rule?: string;
    operator: Operator['value'];
    operand: string;
    value: Array<string | number> | string | number | null;
}
