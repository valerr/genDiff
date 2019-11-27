import genDiff from '../src';

const before = `${__dirname}/__fixtures__/before.json`;
const after = `${__dirname}/__fixtures__/after.json`;
const result = `{
host: hexlet.io
- timeout: 50
+ timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;

test('compare flat JSON', () => {
  expect(genDiff(before, after)).toEqual(result);
});
