import { GluegunToolbox } from 'gluegun';

import { ICar } from '../types';

export default async (toolbox: GluegunToolbox): Promise<void> => {
  const { print } = toolbox;
  const { bold, blue, yellow } = print.colors;

  function title(myText: string) {
    return bold(blue(myText));
  }

  function printCarPrettyLine(index: number, car: ICar) {
    const brand = `${title('Brand: ')}${yellow(car.brand)}`;
    const dealership = `${title(' - Dealership: ')}${yellow(car.dealership)}`;
    const mileage = `${title(' - Mileage: ')}${yellow(car.mileage)}`;
    const value = `${title(' - Value: ')}${yellow(car.value)}`;
    print.info(`${index}. ${brand + dealership + mileage + value}`);
  }

  toolbox.printCarPrettyLine = printCarPrettyLine;
};
