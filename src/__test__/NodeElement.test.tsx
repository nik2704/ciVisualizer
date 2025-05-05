import { render, RenderResult } from '@testing-library/react';
import { getGraphData } from 'utils/utils';
import NodeElement from '../components/UIControl/NodeElement/NodeElement';
import { getTestData } from '../utils/test/fixtures';

const testSetOfNodes = getGraphData(getTestData()).nodes;

test.each(testSetOfNodes)('%o renders Node Element', (testNode) => {
  const renderResult: RenderResult = render(<NodeElement
    node={testNode}
  />);

  expect(renderResult.asFragment()).toMatchSnapshot();
});
