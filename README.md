# Vuetify Query Builder

## Usage:

The query builder can be used by simply importing the component
and using inside a vue component: 
```vue
<template>
  ...
  <query-builder v-model="filter" :filter-fields="filter_fields" :color="color">
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
           color: 'royalblue'
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
}
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

Example:

![img.png](/example.png)

