import { QueryElementType } from '@/types.ts'

export default class Child<QueryType> {
  query: QueryType
  type: QueryElementType
  originalIndex?: number

  constructor(
    query: QueryType,
    type: QueryElementType = 'query-builder-group',
    index: number = 1
  ) {
    this.query = query
    this.type = type
    this.originalIndex = index
  }
}
