import { AppLayoutsEnum } from '@/layouts/layouts.types'
import { Component } from 'vue'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayoutsEnum
    layoutComponent?: Component
    requiresAuth?: boolean
  }
}
