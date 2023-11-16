<script setup lang="ts">
import { getMemberProfileApi, updateMemberProfileApi } from '@/services/profile'
import { useMemberStore } from '@/stores/modules/member'
import type { Gender, ProfileDetail } from '@/types/menber'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const memberStore = useMemberStore()
const profileInfo = ref<ProfileDetail>({} as ProfileDetail)
const getMemberProfileData = async () => {
  const res = await getMemberProfileApi()
  profileInfo.value = res.result
}

const onChangeAvatar = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (success) => {
      const avatarPath = success.tempFiles[0].tempFilePath
      uni.uploadFile({
        url: '/member/profile/avatar',
        name: 'file',
        filePath: avatarPath,
        success: (res) => {
          if (res.statusCode !== 200) return uni.showToast({ title: '修改头像失败', icon: 'error' })
          const avatar = JSON.parse(res.data).result.avatar
          memberStore.profile.avatar = avatar
          profileInfo.value!.avatar = avatar
          uni.showToast({
            title: '修改头像成功',
            icon: 'success',
          })
        },
      })
    },
  })
}
let cityCode: [string, string, string] = ['', '', '']
const updataprofileInfo = async () => {
  const res = await updateMemberProfileApi({
    nickname: profileInfo.value.nickname,
    gender: profileInfo.value.gender,
    birthday: profileInfo.value.birthday,
    provinceCode: cityCode[0],
    cityCode: cityCode[1],
    countyCode: cityCode[2],
  })
  if (res.code === '1') {
    memberStore.profile.nickname = profileInfo.value!.nickname
    uni.showToast({ title: '修改成功', icon: 'success' })
    setTimeout(() => {}, 1000)
    uni.navigateBack()
  }
}

const changeGender: UniHelper.RadioGroupOnChange = (e) => {
  profileInfo.value.gender = e.detail.value as Gender
  // console.log(e.detail.value)
}

const changeBirthday: UniHelper.DatePickerOnChange = (e) => {
  console.log(e.detail.value)
  profileInfo.value.birthday = e.detail.value
}

const changeCity: UniHelper.RegionPickerOnChange = (e) => {
  console.log(e.detail)
  cityCode = e.detail.code!
  profileInfo.value.fullLocation = e.detail.value.join(' ')
}

onLoad(async () => {
  await Promise.all([getMemberProfileData()])
})
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view @tap="onChangeAvatar" class="avatar-content">
        <image class="image" :src="profileInfo?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profileInfo?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input
            class="input"
            type="text"
            placeholder="请填写昵称"
            v-model="profileInfo!.nickname"
          />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="changeGender">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="profileInfo?.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profileInfo?.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="profileInfo?.birthday"
            @change="changeBirthday"
          >
            <view v-if="profileInfo?.birthday">{{ profileInfo?.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            class="picker"
            @change="changeCity"
            mode="region"
            :value="profileInfo?.fullLocation?.split(' ')"
          >
            <view v-if="profileInfo?.fullLocation">{{ profileInfo?.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input
            class="input"
            type="text"
            placeholder="请填写职业"
            :value="profileInfo?.profession"
          />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="updataprofileInfo">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
