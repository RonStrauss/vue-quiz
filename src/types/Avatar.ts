export type GridRoom = { innerValue: string; readonly: boolean; id: string }

export type PossiblePosition =
  | 'TopLeft'
  | 'TopMidLeft'
  | 'TopMidRight'
  | 'TopRight'
  | 'MidLeft'
  | 'BottomLeft'
