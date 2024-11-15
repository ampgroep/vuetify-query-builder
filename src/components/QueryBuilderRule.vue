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
        item-value="text"
        return-object
        :items="operators"
        v-model="operator"
      ></v-select>
    </div>
    <div v-if="!hideValue">
      <v-text-field
        v-if="showTextField"
        label="value"
        variant="outlined"
        density="compact"
        hide-details
        v-model="value"
        clearable
        style="min-width: 200px"
      ></v-text-field>
      <v-text-field
        v-else-if="showPlaceHolder"
        lable="value"
        variant="outlined"
        density="compact"
        hide-details
        v-model="value"
        clearable
        style="min-width: 200px"
      ></v-text-field>
      <v-text-field
        v-else-if="showRegexpField"
        lable="value"
        variant="outlined"
        density="compact"
        hide-details
        v-model="value"
        clearable
        style="min-width: 200px"
        prefix="/"
        suffix="/g"
        :rules="[validRegexpInput]"
      >
      </v-text-field>
      <v-combobox
        v-else-if="showCombobox"
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
  data() {
    return {
      operator: this.getOperator() as Operator
    }
  },
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
    },
    operators: {
      type: Object as PropType<Array<Operator>>,
      required: true
    }
  },
  computed: {
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
        } else if (this.operator.type === 'regexp') {
          return value ? value.toString().replace(/^\/|\/g$/g, '') : ''
        }
        return value
      },
      set: function (value: Array<string | number> | string | number) {
        if (typeof value === 'object') {
          value = JSON.stringify(value)
        } else if (this.operator.type === 'regexp') {
          if (!this.validRegexp(value.toString())) {
            return
          }
          value = '/' + value + '/g'
        }
        this.rule.query.value = value
      }
    },
    hideValue() {
      return this.operator.type === 'none'
    },
    showTextField() {
      return this.operator.type === 'string'
    },
    showCombobox() {
      return this.operator.type === 'array'
    },
    showRegexpField() {
      return this.operator.type === 'regexp'
    },
    showPlaceHolder() {
      return this.operator.type === 'placeholder'
    }
  },
  watch: {
    operator(newValue: Operator, oldValue: Operator) {
      if (newValue.type !== oldValue.type) {
        this.value = ''
      }
      this.rule.query.operator = newValue.value
    }
  },
  methods: {
    removeRule() {
      this.$emit('remove-rule', this.id)
    },
    validRegexp(value: string) {
      try {
        new RegExp(value)
        return true
      } catch (e) {
        return false
      }
    },
    validRegexpInput(value: string) {
      return this.validRegexp(value) || 'Invalid regexp format'
    },
    getOperator() {
      let queryValue = this.rule.query.value
      if (typeof this.rule.query.value === 'string') {
        try {
          queryValue = JSON.parse(queryValue?.toString() ?? '')
        } catch (e) {
          queryValue = this.rule.query.value
        }
      }
      const queryOperator = this.rule.query.operator.toLowerCase()

      const isNotAnObject = typeof queryValue !== 'object'
      const isInOperator = queryOperator === 'in' || queryOperator === 'not in'
      return (
        this.operators.find(
          (operator: Operator) =>
            operator.value === queryOperator &&
            (isNotAnObject && isInOperator
              ? operator.type === 'placeholder'
              : true)
        ) ?? this.operators[0]
      )
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
</style>
