import fs from 'fs';
import genDiff from '../src';

const table = [
  ['json', 'plain'],
  ['json', 'tree'],
  ['json', 'json'],
  ['yml', 'plain'],
  ['yml', 'tree'],
  ['yml', 'json'],
  ['ini', 'plain'],
  ['ini', 'tree'],
  ['ini', 'json'],
];

test.each(table)(
  'compare 2 %s files(output format: %s)', (type, format) => {
    const before = `${__dirname}/__fixtures__/beforeNested.${type}`;
    const after = `${__dirname}/__fixtures__/afterNested.${type}`;
    const result = fs.readFileSync(`${__dirname}/__fixtures__/${format}.txt`, 'utf8');
    expect(genDiff(before, after, format)).toEqual(result);
  },
);
