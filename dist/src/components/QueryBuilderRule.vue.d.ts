import { default as QueryRule } from '../models/QueryRule.ts';
import { PropType } from 'vue';
import { default as Child } from '../models/Child.ts';
import { Operator } from '../types.ts';
declare const _default: import('vue').DefineComponent<{
    rule: {
        type: PropType<Child<QueryRule>>;
        required: true;
    };
    id: {
        type: NumberConstructor;
        required: true;
    };
    fields: {
        type: ArrayConstructor;
        required: true;
    };
    operators: {
        type: PropType<Array<Operator>>;
        required: true;
    };
}, unknown, {
    operator: Operator;
}, {
    value: {
        get: () => any;
        set: (value: Array<string | number> | string | number) => void;
    };
    hideValue(): boolean;
    showTextField(): boolean;
    showCombobox(): boolean;
    showRegexpField(): boolean;
    showPlaceHolder(): boolean;
}, {
    removeRule(): void;
    validRegexp(value: string): boolean;
    validRegexpInput(value: string): true | "Invalid regexp format";
    getOperator(): Operator;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    rule: {
        type: PropType<Child<QueryRule>>;
        required: true;
    };
    id: {
        type: NumberConstructor;
        required: true;
    };
    fields: {
        type: ArrayConstructor;
        required: true;
    };
    operators: {
        type: PropType<Array<Operator>>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
