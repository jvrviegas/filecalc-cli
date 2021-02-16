import { GluegunToolbox } from 'gluegun';
import * as csvToJson from 'csvtojson';

export default async (toolbox: GluegunToolbox): Promise<void> => {
  const parseCsvToJson = async (filename: string) => {
    const result = await csvToJson({
      trim: true,
      headers: ['brand', 'dealership', 'mileage', 'value'],
    }).fromFile(filename);

    return result;
  };

  toolbox.parseCsvToJson = parseCsvToJson;
};
