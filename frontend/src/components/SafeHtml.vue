<template>
  <div v-html="sanitizedContent" :class="className"></div>
</template>

<script setup>
import { computed } from 'vue'
import { sanitizeHtml } from '../directives/sanitize'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})

const sanitizedContent = computed(() => {
  return sanitizeHtml(props.content)
})
</script> 