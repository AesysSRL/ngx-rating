export interface Settings {
  items: Item[],
  theme: string,
  images?: string[],
  itemDetail: ItemDetail,
  showTitle: boolean,
  titlePosition: string
}
export interface Item {
  id: number,
  description: string,
  color?: Color
}
export interface Color {
  red: number,
  green: number,
  blue: number
}

export interface ItemDetail {
  width: number,
  height: number
}

