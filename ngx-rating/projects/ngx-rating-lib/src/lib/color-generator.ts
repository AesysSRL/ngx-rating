export function getColorScale(itemNum: number): string[] {

  let color = [];
  let valueRed: number = 0;
  let valueGreen: number = 90;
  let valueBlue: number = 141;
  color.push(`rgb(${valueRed},${valueGreen},${valueBlue})`);

  for (let idx = 0; idx < itemNum - 2; idx++) {

    if (valueRed <= 180 && valueGreen <= 230 && valueBlue <= 245) {
      valueRed = valueRed + 20;
      valueGreen = valueGreen + 30;
      valueBlue = valueBlue + 30;
    }
    if (valueBlue >= 230) {
      valueRed = valueRed + 20;
      valueGreen = valueGreen + 10;
      if(valueRed >= 230){
        valueRed = valueRed + 20;
      }
    }
    color.push(`rgb(${valueRed},${valueGreen},${valueBlue})`);

  }

  valueRed = 180;
  valueGreen = 230;
  valueBlue = 245;
  color.push(`rgb(${valueRed},${valueGreen},${valueBlue})`);
  color.reverse();

  return color;

}
