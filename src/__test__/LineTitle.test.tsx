import { render, RenderResult } from '@testing-library/react';
import LineTitle from '../components/UIControl/Cards/Legend/LineCells/LineTitle';
import { STRING_STATUS_DATA } from '../utils/test/fixtures';

test.each(STRING_STATUS_DATA)('%o renders LineTitle snapshot', (statusObj) => {
  const renderResult: RenderResult = render(<LineTitle
    status={statusObj.status}
  />);

  expect(renderResult.asFragment()).toMatchSnapshot();
});
