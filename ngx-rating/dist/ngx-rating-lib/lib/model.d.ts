export interface Item {
    id: number;
    name: string;
    description: string;
}
export interface Settings {
    items: Item[];
    selected?: Item;
}
