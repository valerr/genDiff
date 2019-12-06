import fs from 'fs';
import genDiff from '../src';

const table = [
  ['json', 'plain'],
  ['json', 'tree'],
  ['yml', 'plain'],
  ['yml', 'tree'],
  ['ini', 'plain'],
  ['ini', 'tree'],
];

test.each(table)(
  'compare 2 files(%s, %s)', (type, format) => {
    const before = `${__dirname}/__fixtures__/beforeNested.${type}`;
    const after = `${__dirname}/__fixtures__/afterNested.${type}`;
    const result = fs.readFileSync(`${__dirname}/__fixtures__/${format}.txt`, 'utf-8');
    // console.log(genDiff(before, after, format));
    expect(genDiff(before, after, format)).toEqual(result);
  },
);
