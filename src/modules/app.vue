<template>
  <div>
    测试打包结果
    {{ a }}
    <p class="m-0">
      <router-view></router-view>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: '12345678'
    }
  }
}
</script>

<style module>
.m-0 {
  margin: 16px 0;
}
</style>
