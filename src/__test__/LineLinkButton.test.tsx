import { render, RenderResult } from '@testing-library/react';
import { getFullStatusList } from 'components/UIControl/lib/graphTypes';
import LineLinkButton from '../components/UIControl/Cards/Legend/LineCells/LineNodeButton';
import { stub } from '../components/UIControl/Cards/Legend/lib/legendHelper';
import { STRING_STATUS_DATA } from '../utils/test/fixtures';

test.each(STRING_STATUS_DATA)('%o renders LinkLineButton snapshot', (statusObj) => {
  const renderResult: RenderResult = render(<LineLinkButton
    showStatusNodes={getFullStatusList()}
    status={statusObj.status}
    handleToggleStatus={stub}
  />);

  expect(renderResult.asFragment()).toMatchSnapshot();
});
