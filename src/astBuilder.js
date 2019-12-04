import _ from 'lodash';

const makeNode = (name, before, after, children, state) => ({
  name,
  before,
  after,
  children,
  state,
});

const nodeActions = [
  {
    type: 'nested',
    check: (obj1, obj2, key) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    process: (obj1, obj2, key, func) => makeNode(key, null, null, func(obj1[key], obj2[key]), 'nested'),
  },
  {
    type: 'deleted',
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    process: (obj1, obj2, key) => makeNode(key, obj1[key], null, [], 'deleted'),
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    process: (obj1, obj2, key) => makeNode(key, null, obj2[key], [], 'added'),
  },
  {
    type: 'changed',
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    process: (obj1, obj2, key) => makeNode(key, obj1[key], obj2[key], [], 'changed'),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    process: (obj1, obj2, key) => makeNode(key, obj1[key], obj2[key], [], 'unchanged'),
  },
];

const buildAst = (object1, object2) => {
  const allKeys = _.union(Object.keys(object1), Object.keys(object2));
  return allKeys.map((key) => {
    const nodeAction = nodeActions.find(({ check }) => check(object1, object2, key));
    return nodeAction.process(object1, object2, key, buildAst);
  });
};

export default buildAst;
