import type { InjectionKey } from 'vue'

export const updateScrollView = Symbol() as InjectionKey<() => void>
