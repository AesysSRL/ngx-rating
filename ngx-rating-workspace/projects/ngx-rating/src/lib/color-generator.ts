import { Color, Item } from "./model";

export function getColorScale(items: Item[]): Item[] {

  if(!checkIntegrity(items)){
    console.error("ALL RGB VALUES MUST BE BETWEEN 0 AND 255");
    return items.map(item => {
      return {
        ...item,
        color: getColor(255, 0, 0)
      }
    });
  }

  if(!items[0].color) {
    console.error("SET FIRST ITEM'S COLOR FIELD");
    let toReturn = items;
    toReturn[0].color = getColor(255, 0, 0);
  }
  if(items[0].color && !items[items.length-1].color) {
    const color = items[0].color;
    return items.map(item => {return {...item, color: color}});
  } else {
    let toReturn: Item[] = [items[0]];
    while(toReturn.length !== items.length) {
      let toCalculate = [];
      let first: Color = toReturn[toReturn.length - 1].color || {} as Color;
      for(let i = toReturn.length; !items[i].color && i < items.length; i++) {
        toCalculate.push(items[i]);
      }
      let last: Color = items[toReturn.length + toCalculate.length].color  || {} as Color;
      toReturn = toReturn.concat(calculateColors(first, last, toCalculate));
      toReturn.push(items[toReturn.length]);
    }
    return toReturn;
  }
}

function getColor(red: number, green: number, blue: number): Color {
  return {
    red: red,
    green: green,
    blue: blue
  }
}

function calculateColors(first: Color, last: Color, items: Item[]): Item[] {
  const difference = getColor(
    last.red - first.red,
    last.green - first.green,
    last.blue - first.blue
  );
  return items.map((item, idx) => {
    return {
      ...item,
      color: getColor(
        first.red + ((difference.red/(items.length+1))*(idx+1)),
        first.green + ((difference.green/(items.length+1))*(idx+1)),
        first.blue + ((difference.blue/(items.length+1))*(idx+1))
      )
    }
  });
}

export function toColorString(color: Color): string {
  return `rgb(${color.red},${color.green},${color.blue})`;
}

function checkIntegrity(items: Item[]): boolean {
  let integrity = true;
  items.forEach(item => {
    if(item.color) {
      if(!checkItem(item.color)) {
        integrity = false;
      }
    }
  });

  return integrity;
}

function checkItem(color: Color): boolean {
  if(color.red < 0 || color.red > 255){
    return false;
  }
  if(color.green < 0 || color.green > 255){
    return false;
  }
  if(color.blue < 0 || color.blue > 255){
    return false;
  }

  return true;
}
