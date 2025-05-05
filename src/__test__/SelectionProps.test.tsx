import { render, RenderResult } from '@testing-library/react';
import { getTestLink, getTestNode } from '../utils/test/testUtils';
import SelectionProps from '../components/UIControl/Cards/SelectionProps/SelectionProps';

it('renders PROPS EMPTY LIST', () => {
  const renderResult: RenderResult = render(<SelectionProps />);
  
  expect(renderResult.asFragment()).toMatchSnapshot();
});

it('renders current link (0 index from test dataset)', () => {
  const renderResult: RenderResult = render(<SelectionProps
    currentLink={getTestLink()}
  />);
    
  expect(renderResult.asFragment()).toMatchSnapshot();
});
  
it('renders current node (0 index from test dataset)', () => {
  const renderResult: RenderResult = render(<SelectionProps
    currentNode={getTestNode()}
  />);
    
  expect(renderResult.asFragment()).toMatchSnapshot();
});
