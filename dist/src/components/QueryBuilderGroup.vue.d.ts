import { default as Query } from '../models/Query.ts';
import { default as Child } from '../models/Child.ts';
import { default as QueryRule } from '../models/QueryRule.ts';
import { Children, Operator } from '../types';
import { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<{
    group: {
        type: {
            new (query: Query, type?: import('../types').QueryElementType, index?: number): Child<Query>;
        };
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
    removable: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
    };
    operators: {
        type: PropType<Array<Operator>>;
        required: true;
    };
}, unknown, unknown, {
    sortedRules(): Children<QueryRule>;
    sortedGroups(): Children<Query>;
}, {
    addGroup(): void;
    addRule(): void;
    removeGroup(): void;
    removeNestedGroup(index: number): void;
    removeNestedRule(index: number): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    group: {
        type: {
            new (query: Query, type?: import('../types').QueryElementType, index?: number): Child<Query>;
        };
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
    removable: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
    };
    operators: {
        type: PropType<Array<Operator>>;
        required: true;
    };
}>>, {
    removable: boolean;
}, {}>;
export default _default;
