import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (data, type) => {
  const parseFile = parsers[type];
  return parseFile(data);
};

export default parse;
