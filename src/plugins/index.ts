import type { App } from 'vue'
import initPinia from './pinia'

export default (app: App<Element>) => {
  initPinia(app)
}