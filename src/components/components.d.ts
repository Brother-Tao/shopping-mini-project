// src/types/components.d.ts
import CommonSwiper from './CommonSwiper.vue'
declare module 'vue' {
  export interface GlobalComponents {
    CommonSwiper: typeof CommonSwiper
  }
}
