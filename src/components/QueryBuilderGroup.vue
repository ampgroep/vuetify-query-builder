<template>
  <div class="group-wrap">
    <div class="group-header" v-if="group.query">
      <div>
        <v-btn class="mr-2" @click="addGroup">
          <img src="../../public/plus.svg" alt="add" height="20" />group
        </v-btn>
      </div>
      <div>
        <v-btn class="mr-2" @click="addRule">
          <img src="../../public/plus.svg" alt="add" height="20" /> rule
        </v-btn>
      </div>
      <div>
        <v-select
          style="max-width: 200px"
          class="mr-2"
          v-if="group.query.children.length > 1"
          label="logicalOperator"
          variant="outlined"
          density="compact"
          hide-details
          v-model="group.query.logicalOperator"
          :items="['AND', 'OR']"
        ></v-select>
      </div>
      <div style="margin-left: auto" v-if="removable">
        <v-icon @click="removeGroup"
          ><img src="../../public/trash-can.svg" alt="delete" height="20"
        /></v-icon>
      </div>
    </div>
    <div>
      <div v-for="rule in sortedRules" class="child-wrap">
        <query-builder-rule
          :rule="rule"
          :id="rule.originalIndex ?? 0"
          :fields="fields"
          @remove-rule="removeNestedRule"
          :operators="operators"
        >
        </query-builder-rule>
      </div>
      <div v-for="group in sortedGroups" class="child-wrap">
        <query-builder-group
          :group="group"
          :id="group.originalIndex ?? 0"
          :fields="fields"
          @remove-group="removeNestedGroup"
          :operators="operators"
        >
        </query-builder-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import QueryBuilderRule from './QueryBuilderRule.vue'
import Query from '../models/Query.ts'
import Child from '../models/Child.ts'
import QueryRule from '@/models/QueryRule.ts'
import { Children, Operator } from '@/types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'QueryBuilderGroup',
  components: {
    QueryBuilderRule
  },
  props: {
    group: {
      type: Child<Query>,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    removable: {
      type: Boolean,
      default: true
    },
    color: {
      type: String
    },
    operators: {
      type: Object as PropType<Array<Operator>>,
      required: true
    }
  },
  computed: {
    sortedRules(): Children<QueryRule> {
      return (
        this.group.query.children
          ?.filter((item: Child<QueryRule | Query>, index: number) => {
            item.originalIndex = index
            return item.type === 'query-builder-rule'
          })
          // @ts-ignore
          .map((item: Child<QueryRule>) => {
            return new Child<QueryRule>(
              item.query,
              item.type,
              item.originalIndex
            )
          })
      )
    },
    sortedGroups(): Children<Query> {
      return (
        this.group.query.children
          ?.filter((item: Child<QueryRule | Query>) => {
            return item.type === 'query-builder-group'
          })
          // @ts-ignore
          .map((item: Child<Query>) => {
            return new Child<Query>(item.query, item.type, item.originalIndex)
          })
      )
    }
  },
  methods: {
    addGroup() {
      const group: Child<Query> = {
        type: 'query-builder-group',
        query: {
          logicalOperator: 'AND',
          children: []
        }
      }

      this.group.query.children.push(group)
    },
    addRule() {
      const rule: Child<QueryRule> = {
        type: 'query-builder-rule',
        query: {
          rule: '',
          operator: 'eq',
          operand: '',
          value: ''
        }
      }

      this.group.query.children.push(rule)
    },
    removeGroup() {
      this.$emit('remove-group', this.id)
    },
    removeNestedGroup(index: number) {
      this.group.query.children.splice(index, 1)
    },
    removeNestedRule(index: number) {
      this.group.query.children.splice(index, 1)
    }
  },
  mounted() {
    if (this.color !== null && this.color !== undefined) {
      document.documentElement.style.setProperty('--group-color', this.color)
    }
  }
})
</script>

<style>
:root {
  --group-color: rgb(var(--v-theme-primary));
}
.group-wrap {
  flex-grow: 1;
}

.group-header {
  display: flex;
  align-items: center;
  position: relative;
  gap: 10px;
  z-index: 1;
  background-color: var(--group-color);
  border-left: 3px solid var(--group-color);
  padding: 20px 20px 20px 40px;
  margin-top: 20px;
}

button:hover {
  cursor: pointer;
}

.child-wrap {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  border-left: 3px solid var(--group-color);
  padding-left: 40px;
}
</style>
