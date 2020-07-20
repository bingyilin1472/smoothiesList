<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
// 要先引入然後於components中去註冊
import Navbar from "@/components/Navbar";
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>

</style>
