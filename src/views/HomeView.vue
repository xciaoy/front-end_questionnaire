<template>
  <NavbarView></NavbarView>
  <router-view></router-view>
  <FooterView></FooterView>
</template>

<script>
import NavbarView from '@/components/NavbarView.vue'
import FooterView from '@/components/FooterView.vue'
export default {
  name: 'HomeView',
  components: {
    NavbarView,
    FooterView
  }
}
</script>
