<script setup lang="ts">
import { cipher } from '@moeyua/cipher'
import { onMounted, ref } from 'vue'

const password = ref('')
function generate() {
  password.value = cipher()
}
onMounted(() => {
  generate()
})
</script>

<template>
  <header></header>
  <main>
    <button @click="generate">generate</button>
    <p>{{ password }}</p>
  </main>
</template>

<style scoped></style>
