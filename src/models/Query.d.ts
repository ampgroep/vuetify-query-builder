import { Children } from '@/types';
import { LogicalOperator } from '@/types';
import QueryRule from '@/models/QueryRule.ts';
export default interface Query {
    logicalOperator: LogicalOperator;
    children: Children<Query | QueryRule>;
}
