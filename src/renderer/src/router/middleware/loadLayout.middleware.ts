import { RouteLocationNormalized } from 'vue-router'
import { AppLayoutsEnum, appLayoutMap } from '@/layouts/layouts.types'

export async function loadLayoutMiddleware(
  route: RouteLocationNormalized
): Promise<void> {
  const { layout } = route.meta
  const normalizedLayoutName = layout || AppLayoutsEnum.default
  route.meta.layoutComponent = appLayoutMap[normalizedLayoutName]
}
