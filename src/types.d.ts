import Child from './models/Child.ts';
type Children<QueryType> = Array<Child<QueryType>>;
type LogicalOperator = 'AND' | 'OR';
type Operator = {
    value: 'eq';
    text: '=';
    type: 'string';
} | {
    value: 'ne';
    text: '!=';
    type: 'string';
} | {
    value: 'gt';
    text: '>';
    type: 'string';
} | {
    value: 'lt';
    text: '<';
    type: 'string';
} | {
    value: 'gte';
    text: '>=';
    type: 'string';
} | {
    value: 'lte';
    text: '<=';
    type: 'string';
} | {
    value: 'regexp';
    text: 'regexp';
    type: 'string';
} | {
    value: 'not regexp';
    text: 'not regexp';
    type: 'string';
} | {
    value: 'like';
    text: 'like';
    type: 'string';
} | {
    value: 'not like';
    text: 'not like';
    type: 'string';
} | {
    value: 'exists';
    text: 'exists';
    type: 'none';
} | {
    value: 'not exists';
    text: 'not exists';
    type: 'none';
} | {
    value: 'is null';
    text: 'is null';
    type: 'none';
} | {
    value: 'not null';
    text: 'not null';
    type: 'none';
} | {
    value: 'in';
    text: 'in';
    type: 'array';
} | {
    value: 'not in';
    text: 'not in';
    type: 'array';
};
type QueryElementType = 'query-builder-group' | 'query-builder-rule';
export { type Children, type LogicalOperator, type Operator, type QueryElementType };
