import CommonSwiper from '../components/CommonSwiper.vue'
import CommonGuess from '../components/CommonGuess.vue'
declare module 'vue' {
  export interface GlobalComponents {
    CommonSwiper: typeof CommonSwiper
    CommonGuess: typeof CommonGuess
  }
}

export type CommonGuessInstance = InstanceType<typeof CommonGuess>
