import path from 'path';
import genDiff from '../src';

const resultFlat = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

const resultNested = `
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

const table = [
  ['before.json', 'after.json', resultFlat],
  ['before.yml', 'after.yml', resultFlat],
  ['before.ini', 'after.ini', resultFlat],
  ['beforeNested.json', 'afterNested.json', resultNested],
];

test.each(table)(
  'compare 2 files(%s, %s)', (beforeType, afterType, expected) => {
    const before = path.join(`${__dirname}/__fixtures__/`, beforeType);
    const after = path.join(`${__dirname}/__fixtures__/`, afterType);
    expect(genDiff(before, after)).toEqual(expected);
  },
);
