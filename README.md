# Vuetify Query Builder

## Usage:

The query builder can be used by simply importing the component
and using inside a vue component: 
```vue
<template>
  ...
  <query-builder v-model="filter" :filter-fields="filter_fields" :color="color" :operators='operators'>
  </query-builder>
  ...
</template>

Options API:
<script>
  import QueryBuilder from '@ampgroep/vuetify-query-builder'
  import '@ampgroep/vuetify-query-builder/dist/style.css'
  export default {
     components: { QueryBuilder },
     data() {
       return {
           filter: {},
           filter_fields: ['id', 'name', 'date', 'gender'],
           // By default, this package will try to use your projects primary color  
           color: 'royalblue',
           operators: [
              { value: 'eq', text: '=', type: 'string' },
              { value: 'ne', text: '!=', type: 'string' }
            ]
         }
     }
  }
</script>

Composition API: 
<script setup>
  import QueryBuilder from '@ampgroep/vuetify-query-builder'
  import '@ampgroep/vuetify-query-builder/dist/style.css'
  import { ref } from 'vue'
  let query = ref({})
  const filter_fields = ['id', 'name', 'date', 'gender']
  const color = 'royalblue'
</script>
```
## Expected parameters:

```ts
class QueryBuilder {
  modelValue: {} | Query
  filterFields: Array<string>
  color: String
  operators: Array<Operator>
}
```
### Operator:
```ts
type Operator = { value: String; text: string; type: String }
// default operators: 
const defaultOperators: Array<Operator> = [
  { value: 'eq', text: '=', type: 'string' },
  { value: 'ne', text: '!=', type: 'string' },
  { value: 'gt', text: '>', type: 'string' },
  { value: 'lt', text: '<', type: 'string' },
  { value: 'gte', text: '>=', type: 'string' },
  { value: 'lte', text: '<=', type: 'string' },
  { value: 'regexp', text: 'regexp', type: 'string' },
  { value: 'not regexp', text: 'not regexp', type: 'string' },
  { value: 'like', text: 'like', type: 'string' },
  { value: 'not like', text: 'not like', type: 'string' },
  { value: 'exists', text: 'exists', type: 'none' },
  { value: 'not exists', text: 'not exists', type: 'none' },
  { value: 'is null', text: 'is null', type: 'none' },
  { value: 'not null', text: 'not null', type: 'none' },
  { value: 'in', text: 'in', type: 'array' },
  { value: 'not in', text: 'not in', type: 'array' },
  // support of placeholder values, in case of the actual value being processed server side
  // Example: a preconfigure date
  { value: 'in', text: 'in placeholder', type: 'placeholder' },
  { value: 'not in', text: 'not in placeholder', type: 'placeholder' }
]
```

### 'modelValue' parameter:
```ts

interface Query {
    logicalOperator: LogicalOperator // "AND" or "OR"
    children: Children<Query | QueryRule> // An array of child elements (either groups or rules)
}

interface QueryRule {
    rule?: string
    operator: Operator['value']
    operand: string
    value: Array<string | number> | string | number | null 
}

```
### Filter object example 
```ts
const filter = ref({
  logicalOperator: 'AND',
  children: [
    {
      type: 'query-builder-group',
      query: {
        logicalOperator: 'OR',
        children: [
          {
            type: 'query-builder-rule',
            query: {
              rule: 'type',
              operator: 'IN',
              operand: 'type',
              value: [1, 2, 3, 4, 5]
            },
            originalIndex: 0
          },
          {
            type: 'query-builder-rule',
            query: {
              rule: 'category',
              operator: 'IN',
              operand: 'category',
              value: [1, 2, 3]
            },
            originalIndex: 1
          },
          {
            type: 'query-builder-group',
            query: {
              logicalOperator: 'AND',
              children: [
                {
                  type: 'query-builder-rule',
                  query: {
                    rule: '',
                    operator: 'gte',
                    operand: 'customerID',
                    value: '12400'
                  },
                  originalIndex: 0
                },
                {
                  type: 'query-builder-rule',
                  query: {
                    rule: '',
                    operator: 'in',
                    operand: 'deliveryDate',
                    value: 'configured_delivery_date'
                  },
                  originalIndex: 1
                }
              ]
            },
            originalIndex: 2
          }
        ]
      }
    },
    {
      type: 'query-builder-rule',
      query: {
        rule: 'status',
        operator: 'IN',
        operand: 'status',
        value: ['created', 'processing', 'done']
      }
    }
  ]
} as Query)

```
Additionally, the package will accept a string with valid json as a value and will try to parse it.

Example:
![img.png](/example.png)

