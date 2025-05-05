import { render, RenderResult } from '@testing-library/react';
import Icons from '../components/UIControl/Cards/Icons/Icons';
import { STRING_STATUS_DATA } from '../utils/test/fixtures';

test.each(STRING_STATUS_DATA)('%o renders LineTitle snapshot', (statusObj) => {
  const renderResult: RenderResult = render(<Icons
    className="gr-node-status-pict"
    status={statusObj.status}
  />);

  expect(renderResult.asFragment()).toMatchSnapshot();
});
