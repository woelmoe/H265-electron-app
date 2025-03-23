import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { AppLayoutsEnum } from '@/layouts/layouts.types'
import { loadLayoutMiddleware } from './middleware/loadLayout.middleware'

export enum RoutePaths {
  home = 'home',
  taskForm = 'task-from'
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      roles: [],
      layout: AppLayoutsEnum.layouts
    },
    name: RoutePaths.home,
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/task-from',
    meta: {
      roles: [],
      layout: AppLayoutsEnum.layouts
    },
    name: RoutePaths.taskForm,
    component: () => import('@/views/TaskFrom.vue')
  }
]
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach(loadLayoutMiddleware)
