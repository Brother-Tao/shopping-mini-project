<script setup lang="ts">
import {
  getMemberAddressByIdAPI,
  postMemberAddressAPI,
  putMemberAddressByIdAPI,
} from '@/services/address'
import { onLoad } from '@dcloudio/uni-app'

import { ref } from 'vue'

// 表单数据
const form = ref({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})

const rules: UniHelper.UniFormsRules = {
  receiver: { rules: [{ required: true, errorMessage: '请填写收货人' }] },
  contact: {
    rules: [
      { required: true, errorMessage: '请填写联系方式' },
      { pattern: /^1[3-9]\d{9}$/, errorMessage: '请输入正确的手机号' },
    ],
  },
  fullLocation: { rules: [{ required: true, errorMessage: '请选择省市区' }] },
  address: { rules: [{ required: true, errorMessage: '请填写详细地址' }] },
}
const formRef = ref<UniHelper.UniFormsInstance>()

const query = defineProps<{
  id?: String
}>()
uni.setNavigationBarTitle({
  title: query.id ? '编辑地址' : '新增地址',
})
const onPickerChange: UniHelper.RegionPickerOnChange = (e) => {
  form.value.fullLocation = e.detail.value.join(' ')
  const [provinceCode, cityCode, countyCode] = e.detail.code!
  // form.value.provinceCode = provinceCode
  // form.value.cityCode = cityCode
  // form.value.countyCode = countyCode
  Object.assign(form.value, { provinceCode, cityCode, countyCode })
}

const onSwitchChange: UniHelper.SwitchOnChange = (e) => {
  form.value.isDefault = e.detail.value ? 1 : 0
}

const getMemberAddressByIdData = async () => {
  if (!query.id) return
  const res = await getMemberAddressByIdAPI(query.id)
  // console.log(res)
  Object.assign(form.value, res.result)
}

const onsubmit = async () => {
  try {
    await formRef.value?.validate?.()
    if (query.id) {
      await putMemberAddressByIdAPI(query.id, form.value)
    } else {
      await postMemberAddressAPI(form.value)
    }
    uni.showToast({
      title: query.id ? '修改成功' : '添加成功',
      icon: 'success',
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1000)
  } catch (error) {
    uni.showToast({
      title: '表单填写有误',
      icon: 'error',
    })
  }
}

onLoad(async () => {
  await Promise.all([getMemberAddressByIdData()])
})
</script>

<template>
  <view class="content">
    <uni-forms :rules="rules" :model="form" ref="formRef">
      <!-- 表单内容 -->
      <uni-forms-item class="form-item" name="receiver">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </uni-forms-item>
      <uni-forms-item class="form-item" name="contact">
        <text class="label">手机号码</text>
        <input class="input" placeholder="请填写收货人手机号码" v-model="form.contact" />
      </uni-forms-item>
      <uni-forms-item class="form-item" name="fullLocation">
        <text class="label">所在地区</text>
        <picker
          class="picker"
          mode="region"
          :value="form.fullLocation.split(' ')"
          @change="onPickerChange"
        >
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
      </uni-forms-item>
      <uni-forms-item class="form-item" name="address">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </uni-forms-item>
      <uni-forms-item class="form-item">
        <label class="label">设为默认地址</label>
        <switch
          @change="onSwitchChange"
          class="switch"
          color="#27ba9b"
          :checked="form.isDefault === 1"
        />
      </uni-forms-item>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @tap="onsubmit">保存并使用</button>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
