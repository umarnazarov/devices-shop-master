import type { App } from 'vue'
import 'vue-router'

import { LayoutName } from '@/common/layouts/types'
import DefaultLayout from './views/default-layout.vue'
import NoLayout from './views/no-layout.vue'

declare module 'vue-router' {
    interface RouteMeta {
        layout?: LayoutName
    }
}

export default (app: App<Element>) => {
    app.component(LayoutName.NO_LAYOUT, NoLayout)
    app.component(LayoutName.DEFAULT_LAYOUT, DefaultLayout)
}