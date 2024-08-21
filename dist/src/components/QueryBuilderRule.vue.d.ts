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
}, unknown, unknown, {
    operator: {
        get: () => Operator;
        set: (value: Operator) => void;
    };
    value: {
        get: () => any;
        set: (value: Array<string | number> | string | number) => void;
    };
}, {
    removeRule(): void;
    hideValue(): boolean;
    showTextField(): boolean;
    showCombobox(): boolean;
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
