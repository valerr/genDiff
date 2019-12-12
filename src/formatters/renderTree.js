import _ from 'lodash';

const makeIndent = (depth) => ' '.repeat(2 * depth);

const stringify = (value, depth) => {
  const untab = makeIndent(depth - 1);
  const tab = makeIndent(depth);
  if (_.isObject(value)) {
    const str = Object.keys(value).map((key) => `${tab}  ${key}: ${value[key]}`);
    const result = [str, `${untab}}`].join('\n');
    return `{\n${result}`;
  }
  return value;
};

const treeActions = {
  nested: ({ name, children }, tab, depth, func) => {
    const renderChildren = func(children, depth + 2);
    return `${tab}  ${name}: ${renderChildren}`;
  },
  unchanged: ({ name, before }, tab, depth) => `${tab}  ${name}: ${stringify(before, depth + 2)}`,
  changed: ({ name, before, after }, tab, depth) => [
    `${tab}- ${name}: ${stringify(before, depth + 2)}`,
    `${tab}+ ${name}: ${stringify(after, depth + 2)}`,
  ],
  added: ({ name, after }, tab, depth) => `${tab}+ ${name}: ${stringify(after, depth + 2)}`,
  deleted: ({ name, before }, tab, depth) => `${tab}- ${name}: ${stringify(before, depth + 2)}`,
};


const render = (ast, depth = 1) => {
  const tab = makeIndent(depth);
  const untab = makeIndent(depth - 1);
  const formatted = ast.map((node) => treeActions[node.state](node, tab, depth, render));
  return `{\n${_.flatten(formatted).join('\n')}\n${untab}}`;
};

export default (ast) => render(ast).concat('\n');
