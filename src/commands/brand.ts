import { GluegunCommand } from 'gluegun';

import { ICar } from '../types';

const brand: GluegunCommand = {
  name: 'brand',
  alias: ['b'],
  description:
    'Get the number of cars by brand (parameter: brand, optional flag: list)',
  run: async (toolbox) => {
    const { print, parameters, parseCsvToJson, printCarPrettyLine } = toolbox;

    const name = parameters.first;
    const listCars = parameters.options.list || parameters.options.l;

    if (!name) {
      print.error('Brand must be specified!');
      return;
    }

    if (typeof name !== 'string') {
      print.error('Brand must be a string');
      return;
    }

    const json = await parseCsvToJson(
      'backend_file-calculation_dealership.csv'
    );

    const countCarsByBrand = (array: ICar[], value: string) => {
      let count = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i].brand === value) {
          count++;
          if (listCars) {
            printCarPrettyLine(count, array[i]);
          }
        }
      }
      return count;
    };

    const uppercaseName = name.toUpperCase();
    const numberOfCars = countCarsByBrand(json, uppercaseName);
    const result = `Number of ${uppercaseName} cars: ${numberOfCars}`;

    print.success('Cars counted succesfully!');
    print.info(result);
  },
};

export default brand;
