<template>
  <div id="app">
    <h1>黑马头条</h1>
    <div class="box"></div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
.box {
  width: 200px;
  height: 200px;
  background-color: aqua;
}
</style>
