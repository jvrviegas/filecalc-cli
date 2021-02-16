import { GluegunToolbox } from 'gluegun';

import { ICar } from '../types';

export default async (toolbox: GluegunToolbox): Promise<void> => {
  const { print } = toolbox;
  const { bold, blue, yellow } = print.colors;

  function title(myText: string) {
    return bold(blue(myText));
  }

  function text(myText: string) {
    return yellow(myText);
  }

  function printCarPrettyLine(index: number, car: ICar) {
    const brand = `${title('Brand: ')}${text(car.brand)}`;
    const dealership = `${title(' - Dealership: ')}${text(car.dealership)}`;
    const mileage = `${title(' - Mileage: ')}${text(car.mileage)}`;
    const value = `${title(' - Value: ')}${text(car.value)}`;
    print.info(`${index}. ${brand + dealership + mileage + value}`);
  }

  toolbox.printCarPrettyLine = printCarPrettyLine;
};
