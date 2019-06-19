<template>
  <div class="container">
    <a-button type="primary" @click="$_onNav">跳转</a-button>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue'
export default {
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      params: 123
    }
  },
  computed: {
    paramb() {
      return 2
    }
  },
  methods: {
    $_onNav() {
      this.$router.push({ name: '403' })
    }
  }
}
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 140px;
}
</style>
