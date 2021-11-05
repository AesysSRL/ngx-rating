export interface Item {
  id: number,
  description: string,
  color?: Color
}

export interface Settings {
  items: Item[],
}

export interface Color {
  red: number,
  green: number,
  blue: number
}
