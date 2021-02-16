import { GluegunCommand } from 'gluegun';

import { ICar } from '../types';

const dealership: GluegunCommand = {
  name: 'dealership',
  alias: ['d'],
  description:
    'Get the total value of cars that exist in a given dealership (Example: "Auto Machado")',
  run: async (toolbox) => {
    const { print, parameters, parseCsvToJson } = toolbox;

    const name = parameters.first;

    if (!name) {
      print.error('Dealership must be specified!');
      return;
    }

    if (typeof name !== 'string') {
      print.error('Dealership must be a number');
      return;
    }

    const json = await parseCsvToJson(
      'backend_file-calculation_dealership.csv'
    );

    function sumDealershipCarsTotalValue(array: ICar[], value: string) {
      let totalValue = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i].dealership === value) {
          totalValue += Number(array[i].value);
        }
      }

      return totalValue;
    }

    const totalValue = sumDealershipCarsTotalValue(json, name);
    const result = `${name} cars total value: $${totalValue.toLocaleString()}`;

    print.success('Cars values succesfully summed!');
    print.info(result);
  },
};

export default dealership;
