import type { Ref } from 'vue'

export type AppParams = {
  token?: string
  dark?: boolean
}

export type CardItemBounds = Readonly<
  Ref<Readonly<{ marginLeft: string; marginRight: string; width: string }>>
>

export type UpperField = {
  id: string
  name: string
  description: string
  avatarPath: string
  createTime: string
}
