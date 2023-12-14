import Query from '../models/Query.ts';
import Child from '../models/Child.ts';
import QueryRule from '../models/QueryRule.ts';
import { Children } from '../types';
declare const _default: import("vue").DefineComponent<{
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
}, unknown, unknown, {
    sortedRules(): Children<QueryRule>;
    sortedGroups(): Children<Query>;
}, {
    addGroup(): void;
    addRule(): void;
    removeGroup(): void;
    removeNestedGroup(index: number): void;
    removeNestedRule(index: number): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>>, {
    removable: boolean;
}, {}>;
export default _default;
