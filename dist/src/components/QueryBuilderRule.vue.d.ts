import QueryRule from '../models/QueryRule.ts';
import { PropType } from 'vue';
import Child from '../models/Child.ts';
import { Operator } from '../types.ts';
declare const _default: import("vue").DefineComponent<{
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
}, unknown, {
    operators: Operator[];
}, {
    operator: {
        get: () => {
            value: "eq";
            text: "=";
            type: "string";
        } | {
            value: "ne";
            text: "!=";
            type: "string";
        } | {
            value: "gt";
            text: ">";
            type: "string";
        } | {
            value: "lt";
            text: "<";
            type: "string";
        } | {
            value: "gte";
            text: ">=";
            type: "string";
        } | {
            value: "lte";
            text: "<=";
            type: "string";
        } | {
            value: "regexp";
            text: "regexp";
            type: "string";
        } | {
            value: "not regexp";
            text: "not regexp";
            type: "string";
        } | {
            value: "like";
            text: "like";
            type: "string";
        } | {
            value: "not like";
            text: "not like";
            type: "string";
        } | {
            value: "exists";
            text: "exists";
            type: "none";
        } | {
            value: "not exists";
            text: "not exists";
            type: "none";
        } | {
            value: "is null";
            text: "is null";
            type: "none";
        } | {
            value: "not null";
            text: "not null";
            type: "none";
        } | {
            value: "in";
            text: "in";
            type: "array";
        } | {
            value: "not in";
            text: "not in";
            type: "array";
        };
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
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>>, {}, {}>;
export default _default;
