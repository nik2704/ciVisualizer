import { render, RenderResult } from '@testing-library/react';
import NodeIcons from '../components/UIControl/NodeElement/NodeIcons';
import { TEST_NODE_TYPES } from '../utils/test/fixtures';

test.each(TEST_NODE_TYPES)('%s renders Node Icon', (testNodeType) => {
  const renderResult: RenderResult = render(<NodeIcons
    className="gr-node-pict"
    nodeType={testNodeType}
  />);

  expect(renderResult.asFragment()).toMatchSnapshot();
});
