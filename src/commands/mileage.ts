import { GluegunCommand } from 'gluegun';

import { ICar } from '../types';

const mileage: GluegunCommand = {
  name: 'mileage',
  alias: ['m'],
  description:
    'Get the number of cars and the list of cars by mileage range (parameters: maxMileage, minMileage)',
  run: async (toolbox) => {
    const { print, parameters, parseCsvToJson, printCarPrettyLine } = toolbox;

    const minMileage = parameters.first;
    const maxMileage = parameters.second;

    if (!minMileage || !maxMileage) {
      print.error('Min and max mileage must be specified!');
      return;
    }

    if (typeof minMileage !== 'number' || typeof maxMileage !== 'number') {
      print.error('Min and max mileages must be a number');
      return;
    }

    if ((Math.sign(maxMileage) || Math.sign(minMileage)) === -1) {
      print.error('Min and max mileages must be positive');
      return;
    }

    const json = await parseCsvToJson(
      'backend_file-calculation_dealership.csv'
    );

    function countCarsByMileage(
      array: ICar[],
      minValue: number,
      maxValue: number
    ) {
      let count = 0;
      for (let i = 0; i < array.length; i++) {
        const mileageValue = Number(array[i].mileage);
        if (mileageValue >= minValue && mileageValue <= maxValue) {
          count++;
          printCarPrettyLine(count, array[i]);
        }
      }
      return count;
    }

    const numberOfCars = countCarsByMileage(json, minMileage, maxMileage);
    const formattedMinMileage = parameters.first.toLocaleString();
    const formattedMaxMileage = parameters.second.toLocaleString();
    const result = `Number of cars between ${formattedMinMileage} km and ${formattedMaxMileage} km: ${numberOfCars}`;

    print.success('Cars counted succesfully!');
    print.info(result);
  },
};

export default mileage;
