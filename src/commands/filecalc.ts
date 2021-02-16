import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
  name: 'filecalc',
  run: async (toolbox) => {
    const { print } = toolbox;

    print.info('Welcome to File Calculation CLI');
  },
};

module.exports = command;
