<template>
  <CustomNavBar />
  <scroll-view
    ref="scrollRef"
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
    @scrolltolower="handelScrolltolower"
    class="scroll"
    scroll-y
  >
    <!-- 轮播图 -->
    <Skeleton v-if="isLonding" />
    <template v-else>
      <CommonSwiper :bannerData="bannerData" />
      <CategoryPanel :categoryPanelData="categoryPanelData" />
      <CommonHotPanel :hotPanelData="hotPanelData" />
      <CommonGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomNavBar from './c-cpns/CustomNavbar.vue'
import CategoryPanel from './c-cpns/CategoryPanel.vue'
import { getHomeBannerApi, getCategoryPanelApi, getHotPanelApi } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { CommonGuessInstance } from '@/types/component'
import Skeleton from './c-cpns/Skeleton.vue'
const bannerData = ref<BannerItem[]>([])
const categoryPanelData = ref<CategoryItem[]>([])
const hotPanelData = ref<HotItem[]>([])
const guessRef = ref<CommonGuessInstance>()
const isTriggered = ref(false)
const isLonding = ref(false)

const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  bannerData.value = res.result
}

const getCategoryPanelData = async () => {
  const res = await getCategoryPanelApi()
  // console.log(res)
  categoryPanelData.value = res.result
}

const getHotPanelData = async () => {
  const res = await getHotPanelApi()
  hotPanelData.value = res.result
}

const handelScrolltolower = () => {
  // console.log('滚动到底部')
  guessRef.value!.getMore()
}

const onRefresherrefresh = async () => {
  console.log('下拉刷新')
  isTriggered.value = true
  // await getHomeBannerData(), await getCategoryPanelData(), await getHotPanelData()
  guessRef.value?.resetData()
  await Promise.all([getHomeBannerData(), getCategoryPanelData(), getHotPanelData()])
  isTriggered.value = false
}

onLoad(async () => {
  isLonding.value = true
  await Promise.all([getHomeBannerData(), getCategoryPanelData(), getHotPanelData()])
  isLonding.value = false
})
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
  .scroll {
    flex: 1;
    background-color: #f7f7f7;
  }
}
</style>
