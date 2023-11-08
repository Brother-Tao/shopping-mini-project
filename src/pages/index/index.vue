<template>
  <CustomNavBar />
  <!-- 轮播图 -->
  <CommonSwiper :bannerData="bannerData" />
  <view>index</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomNavBar from './c-cpns/CustomNavbar.vue'
import { getHomeBannerApi } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem } from '@/types/home'
const bannerData = ref<BannerItem[]>([])

const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  bannerData.value = res.result
  console.log(bannerData.value)
}

onLoad(() => {
  getHomeBannerData()
})
</script>

<style lang="scss">
//
</style>
