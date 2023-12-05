import { QueryElementType } from '@/types.ts';
export default class Child<QueryType> {
    query: QueryType;
    type: QueryElementType;
    originalIndex?: number;
    constructor(query: QueryType, type?: QueryElementType, index?: number);
}
