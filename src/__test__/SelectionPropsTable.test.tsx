import { render, RenderResult } from '@testing-library/react';
import { getTestLink, getTestNode } from 'utils/test/testUtils';
import SelectionPropsTable from '../components/UIControl/Cards/SelectionProps/SelectionPropsTable';
import { TEST_SELECTION_DATA } from '../utils/test/fixtures';

test.each(TEST_SELECTION_DATA)('%o renders SelectionPropsTable', (testSelectionObj) => {
  const renderResult: RenderResult = render(<SelectionPropsTable
    currentLink={testSelectionObj.currentLink === 'test' ? getTestLink() : undefined}
    currentNode={testSelectionObj.currentNode === 'test' ? getTestNode() : undefined}
  />);

  expect(renderResult.asFragment()).toMatchSnapshot();
});
