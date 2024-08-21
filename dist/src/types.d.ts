import { default as Child } from './models/Child.ts';
type Children<QueryType> = Array<Child<QueryType>>;
type LogicalOperator = 'AND' | 'OR';
type Operator = {
    value: String;
    text: string;
    type: String;
};
type QueryElementType = 'query-builder-group' | 'query-builder-rule';
export { type Children, type LogicalOperator, type Operator, type QueryElementType };
