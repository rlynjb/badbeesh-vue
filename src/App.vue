<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="container w-6/12 mt-8 mb-8">
    <div class="grid grid-cols-5">
      <div class="logo col-span-1">
        Badbeesh
      </div>
      <nav class="col-span-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
