import _ from 'lodash';
import parse from './parsers';

export default (config1, config2) => {
  const file1 = parse(config1);
  const file2 = parse(config2);

  const allKeys = _.union(Object.keys(file1), Object.keys(file2));

  const result = allKeys.reduce((acc, key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      return file1[key] === file2[key] ? [...acc, `    ${key}: ${file1[key]}`] : [...acc, `  - ${key}: ${file1[key]}`, `  + ${key}: ${file2[key]}`];
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      return [...acc, `  - ${key}: ${file1[key]}`];
    }
    return [...acc, `  + ${key}: ${file2[key]}`];
  }, []);
  return `{\n${result.join('\n')}\n}`;
};
