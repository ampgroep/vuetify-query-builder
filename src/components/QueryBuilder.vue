<template>
  <div>
    <div v-if="modelValue.children">
      <query-builder-group
        :group="outerGroup"
        :id="outerGroup.originalIndex ?? 0"
        :fields="filterFields"
        :removable="false"
        @remove-group="removeGroup"
        :color="color"
      >
      </query-builder-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import QueryBuilderGroup from './QueryBuilderGroup.vue'
import Query from '@/models/Query'
import { computed, onMounted } from 'vue'
import Child from '@/models/Child.ts'
import { PropType } from 'vue'

const props = defineProps({
  filterFields: {
    type: Array<string>,
    required: true
  },
  modelValue: { type: Object as PropType<Query>, required: true },
  color: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])

function removeGroup(index: number): void {
  props.modelValue.children.splice(index, 1)
}

const outerGroup = computed(function (): Child<Query> {
  return new Child<Query>(props.modelValue)
})

onMounted(() => {
  if (props.modelValue?.children === undefined) {
    emit('update:modelValue', { children: [], logicalOperator: 'AND' } as Query)
  }
})
</script>
