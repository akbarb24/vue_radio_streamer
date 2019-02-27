<template>
  <div id="app">
    <HomePage></HomePage>
    <!-- <loading-spinner></loading-spinner> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HomePage from './components/HomePage.vue'
import LoadingSpinner from './components/util/LoadingSpinner.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    HomePage,
    'loading-spinner': LoadingSpinner
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
