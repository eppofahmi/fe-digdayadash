
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'BaseButton': typeof import("../components/Base/BaseButton.vue")['default']
    'BaseCard': typeof import("../components/Base/BaseCard.vue")['default']
    'BaseEChart': typeof import("../components/Base/BaseEChart.vue")['default']
    'BaseModal': typeof import("../components/Base/BaseModal.vue")['default']
    'BasePagination': typeof import("../components/Base/BasePagination.vue")['default']
    'BaseSelect': typeof import("../components/Base/BaseSelect.vue")['default']
    'BaseToast': typeof import("../components/Base/BaseToast.vue")['default']
    'DashboardActivationTable': typeof import("../components/Dashboard/DashboardActivationTable.vue")['default']
    'DashboardFilters': typeof import("../components/Dashboard/DashboardFilters.vue")['default']
    'DashboardHeader': typeof import("../components/Dashboard/DashboardHeader.vue")['default']
    'DashboardScheduleModal': typeof import("../components/Dashboard/DashboardScheduleModal.vue")['default']
    'DashboardShareModal': typeof import("../components/Dashboard/DashboardShareModal.vue")['default']
    'DashboardStatisticsTable': typeof import("../components/Dashboard/DashboardStatisticsTable.vue")['default']
    'DashboardStats': typeof import("../components/Dashboard/DashboardStats.vue")['default']
    'DashboardTrendChart': typeof import("../components/Dashboard/DashboardTrendChart.vue")['default']
    'LayoutFooter': typeof import("../components/Layout/LayoutFooter.vue")['default']
    'LayoutHeader': typeof import("../components/Layout/LayoutHeader.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyBaseButton': LazyComponent<typeof import("../components/Base/BaseButton.vue")['default']>
    'LazyBaseCard': LazyComponent<typeof import("../components/Base/BaseCard.vue")['default']>
    'LazyBaseEChart': LazyComponent<typeof import("../components/Base/BaseEChart.vue")['default']>
    'LazyBaseModal': LazyComponent<typeof import("../components/Base/BaseModal.vue")['default']>
    'LazyBasePagination': LazyComponent<typeof import("../components/Base/BasePagination.vue")['default']>
    'LazyBaseSelect': LazyComponent<typeof import("../components/Base/BaseSelect.vue")['default']>
    'LazyBaseToast': LazyComponent<typeof import("../components/Base/BaseToast.vue")['default']>
    'LazyDashboardActivationTable': LazyComponent<typeof import("../components/Dashboard/DashboardActivationTable.vue")['default']>
    'LazyDashboardFilters': LazyComponent<typeof import("../components/Dashboard/DashboardFilters.vue")['default']>
    'LazyDashboardHeader': LazyComponent<typeof import("../components/Dashboard/DashboardHeader.vue")['default']>
    'LazyDashboardScheduleModal': LazyComponent<typeof import("../components/Dashboard/DashboardScheduleModal.vue")['default']>
    'LazyDashboardShareModal': LazyComponent<typeof import("../components/Dashboard/DashboardShareModal.vue")['default']>
    'LazyDashboardStatisticsTable': LazyComponent<typeof import("../components/Dashboard/DashboardStatisticsTable.vue")['default']>
    'LazyDashboardStats': LazyComponent<typeof import("../components/Dashboard/DashboardStats.vue")['default']>
    'LazyDashboardTrendChart': LazyComponent<typeof import("../components/Dashboard/DashboardTrendChart.vue")['default']>
    'LazyLayoutFooter': LazyComponent<typeof import("../components/Layout/LayoutFooter.vue")['default']>
    'LazyLayoutHeader': LazyComponent<typeof import("../components/Layout/LayoutHeader.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const BaseButton: typeof import("../components/Base/BaseButton.vue")['default']
export const BaseCard: typeof import("../components/Base/BaseCard.vue")['default']
export const BaseEChart: typeof import("../components/Base/BaseEChart.vue")['default']
export const BaseModal: typeof import("../components/Base/BaseModal.vue")['default']
export const BasePagination: typeof import("../components/Base/BasePagination.vue")['default']
export const BaseSelect: typeof import("../components/Base/BaseSelect.vue")['default']
export const BaseToast: typeof import("../components/Base/BaseToast.vue")['default']
export const DashboardActivationTable: typeof import("../components/Dashboard/DashboardActivationTable.vue")['default']
export const DashboardFilters: typeof import("../components/Dashboard/DashboardFilters.vue")['default']
export const DashboardHeader: typeof import("../components/Dashboard/DashboardHeader.vue")['default']
export const DashboardScheduleModal: typeof import("../components/Dashboard/DashboardScheduleModal.vue")['default']
export const DashboardShareModal: typeof import("../components/Dashboard/DashboardShareModal.vue")['default']
export const DashboardStatisticsTable: typeof import("../components/Dashboard/DashboardStatisticsTable.vue")['default']
export const DashboardStats: typeof import("../components/Dashboard/DashboardStats.vue")['default']
export const DashboardTrendChart: typeof import("../components/Dashboard/DashboardTrendChart.vue")['default']
export const LayoutFooter: typeof import("../components/Layout/LayoutFooter.vue")['default']
export const LayoutHeader: typeof import("../components/Layout/LayoutHeader.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyBaseButton: LazyComponent<typeof import("../components/Base/BaseButton.vue")['default']>
export const LazyBaseCard: LazyComponent<typeof import("../components/Base/BaseCard.vue")['default']>
export const LazyBaseEChart: LazyComponent<typeof import("../components/Base/BaseEChart.vue")['default']>
export const LazyBaseModal: LazyComponent<typeof import("../components/Base/BaseModal.vue")['default']>
export const LazyBasePagination: LazyComponent<typeof import("../components/Base/BasePagination.vue")['default']>
export const LazyBaseSelect: LazyComponent<typeof import("../components/Base/BaseSelect.vue")['default']>
export const LazyBaseToast: LazyComponent<typeof import("../components/Base/BaseToast.vue")['default']>
export const LazyDashboardActivationTable: LazyComponent<typeof import("../components/Dashboard/DashboardActivationTable.vue")['default']>
export const LazyDashboardFilters: LazyComponent<typeof import("../components/Dashboard/DashboardFilters.vue")['default']>
export const LazyDashboardHeader: LazyComponent<typeof import("../components/Dashboard/DashboardHeader.vue")['default']>
export const LazyDashboardScheduleModal: LazyComponent<typeof import("../components/Dashboard/DashboardScheduleModal.vue")['default']>
export const LazyDashboardShareModal: LazyComponent<typeof import("../components/Dashboard/DashboardShareModal.vue")['default']>
export const LazyDashboardStatisticsTable: LazyComponent<typeof import("../components/Dashboard/DashboardStatisticsTable.vue")['default']>
export const LazyDashboardStats: LazyComponent<typeof import("../components/Dashboard/DashboardStats.vue")['default']>
export const LazyDashboardTrendChart: LazyComponent<typeof import("../components/Dashboard/DashboardTrendChart.vue")['default']>
export const LazyLayoutFooter: LazyComponent<typeof import("../components/Layout/LayoutFooter.vue")['default']>
export const LazyLayoutHeader: LazyComponent<typeof import("../components/Layout/LayoutHeader.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
