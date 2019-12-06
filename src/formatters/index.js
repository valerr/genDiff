import renderTree from '../renderTree';
import renderPlain from './renderPlain';

const renderersForFormats = {
  plain: renderPlain,
  tree: renderTree,
};

const chooseFormat = (ast, format) => {
  const render = renderersForFormats[format];
  return render(ast);
};

export default chooseFormat;
