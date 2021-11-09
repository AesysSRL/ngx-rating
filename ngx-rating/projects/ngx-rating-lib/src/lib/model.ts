export interface Settings {
  items: Item[],
  theme: string,
  itemDetail: ItemDetail,
  showTitle: boolean,
  titlePosition: string
}

export interface SettingsImage extends Settings {
  images: string[];
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

