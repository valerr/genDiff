import fs from 'fs';
import _ from 'lodash';

export default (config1, config2) => {
  const file1 = fs.readFileSync(config1, 'utf8');
  const file2 = fs.readFileSync(config2, 'utf8');
  const json1 = JSON.parse(file1);
  const json2 = JSON.parse(file2);

  const allKeyes = _.union(Object.keys(json1), Object.keys(json2));

  const result = allKeyes.reduce((acc, key) => {
    if (_.has(json1, key) && _.has(json2, key)) {
      return json1[key] === json2[key] ? [...acc, `${key}: ${json1[key]}`] : [...acc, `- ${key}: ${json1[key]}`, `+ ${key}: ${json2[key]}`];
    }
    if (_.has(json1, key) && !_.has(json2, key)) {
      return [...acc, `- ${key}: ${json1[key]}`];
    }
    return [...acc, `+ ${key}: ${json2[key]}`];
  }, []);
  return `{\n${result.join('\n')}\n}`;
};
