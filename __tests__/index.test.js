import genDiff from '../src';

const beforeJSON = `${__dirname}/__fixtures__/before.json`;
const afterJSON = `${__dirname}/__fixtures__/after.json`;
const resultJSON = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

const beforeYML = `${__dirname}/__fixtures__/before.yml`;
const afterYML = `${__dirname}/__fixtures__/after.yml`;
const resultYML = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

test('compare flat JSON', () => {
  expect(genDiff(beforeJSON, afterJSON)).toEqual(resultJSON);
});

test('compare flat YML', () => {
  expect(genDiff(beforeYML, afterYML)).toEqual(resultYML);
});
