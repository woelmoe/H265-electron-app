import AppLayoutDefault from '@/layouts/AppLayoutDefault.vue'
import AppLayoutLayouts from '@/layouts/AppLayoutLayouts.vue'
import { Component } from 'vue'

export enum AppLayoutsEnum {
  default = 'default',
  layouts = 'layouts'
}

export const appLayoutMap: Record<AppLayoutsEnum, Component> = {
  [AppLayoutsEnum.default]: AppLayoutDefault,
  [AppLayoutsEnum.layouts]: AppLayoutLayouts
}
