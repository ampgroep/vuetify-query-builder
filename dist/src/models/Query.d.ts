import { Children, LogicalOperator } from '../types';
import { default as QueryRule } from './QueryRule.ts';
export default interface Query {
    logicalOperator: LogicalOperator;
    children: Children<Query | QueryRule>;
}
