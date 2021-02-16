import { system, filesystem } from 'gluegun';

const src = filesystem.path(__dirname, '..');

const cli = async (cmd) =>
  system.run(`node ${filesystem.path(src, 'bin', 'filecalc')} ${cmd}`);

test('outputs version', async () => {
  const output = await cli('--version');
  expect(output).toContain('0.0.1');
});

test('outputs help', async () => {
  const output = await cli('--help');
  expect(output).toContain('0.0.1');
});

test('outputs cars count based on brand', async () => {
  const output = await cli('brand tesla');
  expect(output).toContain('Cars counted succesfully');
  expect(output).toContain('Number of TESLA cars:');
});

test('outputs cars count and list based on brand', async () => {
  const output = await cli('brand tesla --list');
  expect(output).toContain('Brand');
  expect(output).toContain('Dealership');
  expect(output).toContain('Mileage');
  expect(output).toContain('Value');
  expect(output).toContain('Cars counted succesfully');
});

test('outputs cars count based on mileage range', async () => {
  const output = await cli('mileage 10000 12000');
  expect(output).toContain('Cars counted succesfully');
  expect(output).toContain('km');
});

test('outputs cars total value on a dealership', async () => {
  const output = await cli('dealership "Auto Machado"');
  expect(output).toContain('Cars values succesfully summed');
  expect(output).toContain('€');
});
