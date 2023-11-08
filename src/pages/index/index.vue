<template>
  <CustomNavBar />
  <scroll-view ref="scrollRef" @scrolltolower="handelScrolltolower" class="scroll" scroll-y>
    <!-- 轮播图 -->
    <CommonSwiper :bannerData="bannerData" />
    <CategoryPanel :categoryPanelData="categoryPanelData" />
    <CommonHotPanel :hotPanelData="hotPanelData" />
    <CommonGuess />
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
const bannerData = ref<BannerItem[]>([])
const categoryPanelData = ref<CategoryItem[]>([])
const hotPanelData = ref<HotItem[]>([])
const scrollRef = ref<CommonGuessInstance>()

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
  console.log('滚动到底部')
  console.log(scrollRef.value?.getMore())
}

onLoad(() => {
  getHomeBannerData(), getCategoryPanelData(), getHotPanelData()
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
