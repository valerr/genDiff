import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    const str = Object.keys(value).map((key) => `${key}: ${value[key]}`).join('\n');
    return `{\n${str}\n}`;
  }
  return value;
};

const treeActions = {
  nested: ({ name, children }, func) => {
    const renderChildren = func(children);
    return `${name}: ${renderChildren}`;
  },
  unchanged: ({ name, before }) => `${name}: ${stringify(before)}`,
  changed: ({ name, before, after }) => [
    `  - ${name}: ${stringify(before)}`,
    `  + ${name}: ${stringify(after)}`,
  ],
  added: ({ name, after }) => `  + ${name}: ${stringify(after)}`,
  deleted: ({ name, before }) => `  - ${name}: ${stringify(before)}`,
};


const render = (ast) => {
  const formatted = ast.map((node) => treeActions[node.state](node, render));
  return `{\n${_.flattenDeep(formatted).join('\n')}\n}`;
};

export default render;
