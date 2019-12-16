import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAst from './astBuilder';
import render from './formatters';

const genDiff = (config1, config2, format) => {
  const data1 = fs.readFileSync(config1, 'utf8');
  const data2 = fs.readFileSync(config2, 'utf8');
  const parsed1 = parse(data1, path.extname(config1));
  const parsed2 = parse(data2, path.extname(config2));
  const tree = buildAst(parsed1, parsed2);
  return render(format)(tree);
};

export default genDiff;
