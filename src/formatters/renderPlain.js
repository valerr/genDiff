import _ from 'lodash';

const stringify = (value) => {
  const stringified = _.isObject(value) ? '[complex value]' : `${value}`;
  return stringified;
};

const stringsForTypes = {
  nested: (node, path, func) => func(node.children, path),
  unchanged: () => [],
  changed: (node, path) => `Property '${path}' was updated. From '${stringify(node.before)}' to '${stringify(node.after)}'`,
  added: (node, path) => `Property '${path}' was added with value: '${stringify(node.after)}'`,
  deleted: (node, path) => `Property '${path}' was removed`,
};

const renderPlain = (ast, path = '') => {
  const formatted = ast
    .map((node) => {
      const newPath = path ? `${path}.${node.name}` : `${node.name}`;
      const getString = stringsForTypes[node.state];
      return getString(node, newPath, renderPlain);
    });
  return `${_.flatten(formatted).join('\n')}`;
};

export default renderPlain;
