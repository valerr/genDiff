import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import ini from 'ini';

const parsers = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
  '.ini': (data) => ini.parse(data),
};

const parse = (filePath) => {
  const type = path.extname(filePath);
  const data = fs.readFileSync(filePath, 'utf8');
  const parseFile = parsers[type];
  return parseFile(data);
};

export default parse;