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
              rule: 'ambient',
              operator: 'IN',
              operand: 'ambient',
              value: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
                35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
                67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
                83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
                99
              ]
            },
            originalIndex: 0
          },
          {
            type: 'query-builder-rule',
            query: {
              rule: 'coldchain',
              operator: 'IN',
              operand: 'coldchain',
              value: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
                35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
                67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
                83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
                99
              ]
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
                    operator: 'eq',
                    operand: 'customerID',
                    value: '12400'
                  },
                  originalIndex: 0
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
        rule: 'statusraw',
        operator: 'IN',
        operand: 'statusraw',
        value: [
          'consolidate',
          'sms',
          'sent',
          'RDVAA',
          'RDAA',
          'RDCA',
          'NoStock2',
          'NoStock3',
          'fulfillment',
          'BN',
          'BE',
          'AY',
          'AX',
          'AH',
          'AA',
          'FFA',
          'afhalen',
          'HM',
          'start',
          'FFB',
          'FFC',
          'BA',
          'BB',
          'BC',
          'BH',
          'BF',
          'BO',
          'DA',
          'CA',
          'CB',
          'CC',
          'FB',
          'FC',
          'planning',
          'NBBH',
          'NBCA',
          'NoStock',
          'packed',
          'VAA',
          'VAAP',
          'VAN',
          'VN',
          'BI',
          'timeFrame',
          'timeframe',
          'pending',
          'process',
          'process2',
          'CB',
          'HM2'
        ]
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
