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

const renderPlain = (ast, path) => {
  const formatted = ast
    .reduce((acc, node) => {
      const { name, state } = node;
      const newPath = path ? `${path}.${name}` : `${name}`;
      const getString = stringsForTypes[state];
      return [...acc, getString(node, newPath, renderPlain)];
    }, []);
  return `${_.flatten(formatted).join('\n')}`;
};

export default (ast) => renderPlain(ast).concat('\n');
