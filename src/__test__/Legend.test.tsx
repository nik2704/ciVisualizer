import { render, RenderResult } from '@testing-library/react';
import { getFullStatusList } from 'components/UIControl/lib/graphTypes';
import Legend from '../components/UIControl/Cards/Legend/Legend';
import { stub } from '../components/UIControl/Cards/Legend/lib/legendHelper';

it('renders list', () => {
  const renderResult: RenderResult = render(<Legend
    showStatusLink={getFullStatusList()}
    showStatusNodes={getFullStatusList()}
    statuses={getFullStatusList()}
    handleToggleStatus={stub}
  />);
  
  expect(renderResult.asFragment()).toMatchSnapshot();
});
