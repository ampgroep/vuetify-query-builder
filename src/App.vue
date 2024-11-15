<script setup lang="ts">
import Query from '@/models/Query.ts'
import QueryBuilder from './components/QueryBuilder.vue'
import { ref } from 'vue'
import { Operator } from '@/types.ts'

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

const emptyQuery = ref({} as Query)

let filter_fields: Array<string> = [
  'id',
  'name',
  'date',
  'type',
  'customerID',
  'satusraw',
  'coldchain',
  'ambient'
]

let operators: Array<Operator> = [
  { value: 'eq', text: '=', type: 'string' },
  { value: 'ne', text: '!=', type: 'string' },
  { value: 'gt', text: '>', type: 'string' },
  { value: 'lt', text: '<', type: 'string' },
  { value: 'gte', text: '>=', type: 'string' },
  { value: 'lte', text: '<=', type: 'string' }
]
</script>

<template>
  <v-app>
    <v-app-bar
      ><v-app-bar-nav-icon>
        <img
          alt="Vue logo"
          class="logo"
          src="./assets/logo.svg"
          width="50"
          height="50"
        />
      </v-app-bar-nav-icon>
      <v-app-bar-title>Vuetify query builder</v-app-bar-title>
    </v-app-bar>
    <v-main style="width: 100%">
      <v-container :fluid="true">
        <h1>Examples:</h1>
        <hr />
        <div>
          <h2>Existing query object:</h2>
          <query-builder
            v-model="filter"
            :filter-fields="filter_fields"
          ></query-builder>
        </div>
        <hr />
        <div>
          <h2>Empty object {}:</h2>
          <query-builder
            v-model="emptyQuery"
            :filter-fields="filter_fields"
          ></query-builder>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
