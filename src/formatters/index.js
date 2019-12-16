import renderTree from './renderTree';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const render = (type) => {
  switch (type) {
    case 'plain':
      return renderPlain;
    case 'tree':
      return renderTree;
    case 'json':
      return renderJson;
    default:
      return renderTree;
  }
};

export default render;
