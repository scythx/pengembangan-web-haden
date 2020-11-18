<template>
  <div id="app">
    <CategoriesPage/>
  </div>
</template>

<script>
import CategoriesPage from './components/CategoriesPage'
import http from '@/http'

export default {
  name: 'App',
  components: {
    CategoriesPage
  },
}
</script>

<style scoped>

</style>