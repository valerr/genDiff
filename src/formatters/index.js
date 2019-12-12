import renderTree from './renderTree';
import renderPlain from './renderPlain';

const render = (type) => {
  switch (type) {
    case 'plain':
      return renderPlain;
    case 'tree':
      return renderTree;
    case 'json':
      return (ast) => JSON.stringify(ast).concat('\n');
    default:
      return renderTree;
  }
};

export default render;
