import { default as Child } from './models/Child.ts';
type Children<QueryType> = Array<Child<QueryType>>;
type LogicalOperator = 'AND' | 'OR';
type Operator = {
    value: String;
    text: String;
    type: OperatorType;
};
type QueryElementType = 'query-builder-group' | 'query-builder-rule';
type OperatorType = 'string' | 'array' | 'none' | 'placeholder' | 'integer' | 'boolean' | 'float' | 'regexp';
export { type Children, type LogicalOperator, type Operator, type QueryElementType };
