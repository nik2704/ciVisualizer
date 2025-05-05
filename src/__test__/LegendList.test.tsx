import { render, RenderResult } from '@testing-library/react';
import { getFullStatusList } from 'components/UIControl/lib/graphTypes';
import LegendList from '../components/UIControl/Cards/Legend/LegendList';
import { stub } from '../components/UIControl/Cards/Legend/lib/legendHelper';

it('renders list', () => {
  const renderResult: RenderResult = render(<LegendList
    showStatusLink={getFullStatusList()}
    showStatusNodes={getFullStatusList()}
    statuses={getFullStatusList()}
    handleToggleStatus={stub}
  />);
  
  expect(renderResult.asFragment()).toMatchSnapshot();
});
