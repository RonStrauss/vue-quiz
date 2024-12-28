import type { Ref } from 'vue'

export type GridRoom = {
  innerValue: string
  id: string
} & (
  | {
      readonly: false
      list: Ref<{ name: string }[]>
    }
  | {
      readonly: true
    }
)

export type PossiblePosition =
  | 'TopLeft'
  | 'TopMidLeft'
  | 'TopMidRight'
  | 'TopRight'
  | 'MidLeft'
  | 'BottomLeft'
