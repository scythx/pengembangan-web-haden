<template>
  <v-app>
    <v-main>
      <Dashboard />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Dashboard from './components/Dashboard';

export default {
  name: 'App',

  components: {
    HelloWorld,
    Dashboard,
  },

  data: () => ({
    //
  }),
};
</script>
