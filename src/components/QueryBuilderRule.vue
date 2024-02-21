<template>
  <div
    class="rule-hover"
    :style="id === 0 ? 'margin-top: 20px' : 'margin-top: 0px'"
  >
    <div>
      <v-select
        style="width: 300px"
        label="field"
        variant="outlined"
        density="compact"
        item-value="id"
        item-text="id"
        hide-details
        :items="fields"
        v-model="rule.query.operand"
      ></v-select>
    </div>

    <div>
      <v-select
        style="width: 200px"
        label="operator"
        variant="outlined"
        density="compact"
        hide-details
        item-title="text"
        return-object
        :items="operators"
        v-model="operator"
      ></v-select>
    </div>

    <div v-if="!hideValue()">
      <v-text-field
        v-if="showTextField()"
        label="value"
        variant="outlined"
        density="compact"
        hide-details
        v-model="value"
        clearable
        style="min-width: 200px"
      ></v-text-field>
      <v-combobox
        v-else-if="showCombobox()"
        :items="value"
        v-model="value"
        label="value"
        multiple
        clearable
        variant="outlined"
        density="compact"
        hide-details
        style="max-height: 100px; min-width: 250px"
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 2" small>
                <span>{{ item.title }}</span>
          </v-chip>
          <span v-if="index === 2" style="color: grey; font-size: small"
              >(+{{ value.length - 2 }} others)</span
          >        
	</template>
      </v-combobox>
    </div>

    <div>
      <v-icon @click="removeRule()"
        ><img src="../../public/trash-can.svg" alt="delete" height="20"
      /></v-icon>
    </div>
  </div>
</template>

<script lang="ts">
import QueryRule from '@/models/QueryRule.ts'
import { PropType } from 'vue'
import Child from '@/models/Child.ts'
import { Operator } from '@/types.ts'

export default {
  name: 'QueryBuilderRule',
  components: {},
  props: {
    rule: {
      type: Object as PropType<Child<QueryRule>>,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  },
  computed: {
    operator: {
      get: function () {
        return (
          this.operators.find((operator: Operator) => {
            return (
              operator.value === this.rule.query.operator.toLowerCase() ||
              operator.text === this.rule.query.operator.toLowerCase()
            )
          }) ?? this.operators[0]
        )
      },
      set: function (value: Operator) {
        if (value.type !== this.operator.type) {
          this.value = ''
        }
        this.rule.query.operator = value.value
      }
    },
    value: {
      get: function (): any {
        let value = this.rule.query.value
        if (this.operator.type === 'array' && typeof value !== 'object') {
          try {
            if (typeof value === 'string') {
              // @ts-ignore Ensure unique values
              value = [...new Set(JSON.parse(value))]
            } else {
              value = [value]
            }
          } catch (e) {
            value = []
          }
        }
        return value
      },
      set: function (value: Array<string | number> | string | number) {
        this.rule.query.value = value
      }
    }
  },
  data() {
    return {
      operators: [
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
        { value: 'not in', text: 'not in', type: 'array' }
      ] as Array<Operator>
    }
  },
  methods: {
    removeRule() {
      this.$emit('remove-rule', this.id)
    },
    hideValue() {
      return this.operator.type === 'none'
    },
    showTextField() {
      return this.operator.type === 'string'
    },
    showCombobox() {
      return this.operator.type === 'array'
    }
  }
}
</script>

<style>
.rule-hover {
  display: flex;
  align-items: center;
  gap: 40px;
  flex-grow: 1;
  margin-left: -40px;
  padding: 10px 20px 10px 40px;
}

.combobox-prepend {
  display: flex;
  flex-direction: column;
  min-width: 90px;
  margin: 4px 0 4px 0;
}
</style>
