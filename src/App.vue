<template>
  <router-view></router-view>
  <metainfo>
    <template v-slot:title="{ metainfo }">{{ metainfo.title }}</template>
  </metainfo>
  </template>
<script>
import { useMeta } from 'vue-meta'
export default {
  setup () {
    useMeta({
      title: 'F2E 前端＆UI薪資調查',
      meta: [
        { name: 'authour', content: 'designed by Joyce, made by Xie Ciao Yun' },
        { name: 'description', content: '六角學院所做之前端工程師、UI設計師薪資調查並以圖表呈現。為The F2E 3rd加開之活動關卡。' }
      ],
      link: [
        { rel: 'icon', href: 'favicon.ico' }
      ]
    })
  }
}
</script>

<style lang="scss">
@import "assets/scss/all";
</style>
