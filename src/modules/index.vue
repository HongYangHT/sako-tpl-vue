<template>
  <div class="container">
    <video-player ref="player" :params="videoOptions" />
    <a-button type="primary" class="mt-1" @click="$_onNav">跳转</a-button>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue'
import VideoPlayer from '@/modules/components/play-video/index.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    [Button.name]: Button,
    VideoPlayer
  },
  data() {
    return {
      params: 123,
      videoOptions: {
        controlBar: {
          children: [
            {
              name: 'playToggle'
            },
            {
              name: 'progressControl'
            },
            {
              name: 'currentTimeDisplay'
            },
            {
              name: 'timeDivider'
            },
            {
              name: 'durationDisplay'
            },
            {
              name: 'volumePanel',
              inline: false
            },
            {
              name: 'fullscreenToggle'
            }
          ]
        },
        autoplay: false,
        controls: true,
        language: 'zh-CN',
        preauto: 'auto',
        width: '100%',
        height: '400',
        src:
          'http://10.1.241.36:81/asiainfo-product-portal1/product/48d3306e065ba57b392bae4951952db6.mp4',
        playbackRates: [0.7, 1.0, 1.5, 2.0]
      }
    }
  },
  computed: {
    ...mapState({
      poems: state => state.poems
    }),
    paramb() {
      return 2
    }
  },
  created() {
    this.$_getHomeInit()
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    ...mapActions(['getHomeInit']),
    async $_getHomeInit(params) {
      return this.getHomeInit(params)
    },
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
  flex-direction: column;
}

.mt-1 {
  margin-top: 15px;
}
</style>
