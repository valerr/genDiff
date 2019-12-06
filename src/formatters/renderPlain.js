import _ from 'lodash';

const stringify = (value) => {
  const stringified = _.isObject(value) ? '[complex value]' : `${value}`;
  return stringified;
};

const stringsForTypes = {
  nested: ({ name, children }, path, func) => func(children, `${path}${name}.`),
  unchanged: () => [],
  changed: ({ name, before, after }, path) => `Property '${path}${name}' was updated. From '${stringify(before)}' to '${stringify(after)}'`,
  added: ({ name, after }, path) => `Property '${path}${name}' was added with value: '${stringify(after)}'`,
  deleted: ({ name }, path) => `Property '${path}${name}' was removed`,
};

const renderPlain = (ast, path = '') => {
  const formatted = ast.map((node) => {
    const getString = stringsForTypes[node.state];
    return getString(node, path, renderPlain);
  });
  return `${_.flatten(formatted).join('\n')}`;
};

export default renderPlain;
