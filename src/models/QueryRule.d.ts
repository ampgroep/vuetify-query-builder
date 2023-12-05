import { Operator } from '@/types.ts';
export default class QueryRule {
    rule?: string;
    operator: Operator['value'];
    operand: string;
    value: Array<string | number> | string | number | null;
}
