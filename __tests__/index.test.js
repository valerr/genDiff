import path from 'path';
import genDiff from '../src';

const result = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

const table = [
  ['before.json', 'after.json', result],
  ['before.yml', 'after.yml', result],
  ['before.ini', 'after.ini', result],
];

test.each(table)(
  'compare 2 files(%s, %s)', (beforeType, afterType, expected) => {
    const before = path.join(`${__dirname}/__fixtures__/`, beforeType);
    const after = path.join(`${__dirname}/__fixtures__/`, afterType);
    expect(genDiff(before, after)).toEqual(expected);
  },
);
