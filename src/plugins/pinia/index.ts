import type { App } from 'vue'
import { createPinia } from 'pinia'
import storage from 'pinia-plugin-persistedstate'

export default (app: App<Element>) => {
  const pinia = createPinia().use(storage)
  app.use(pinia)
}