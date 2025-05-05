import { render, RenderResult } from '@testing-library/react';
import { GraphConfig } from 'components/UIControl/lib/configTypes';
import TEMPLATE_CONFIG from 'components/UIControl/lib/TemplateConfig';
import { ViewMode } from '../components/UIControl/ToolBox/lib/toolBoxTypes';
import ToolBox from '../components/UIControl/ToolBox/ToolBox';
import { TOOL_BOX_MODES } from '../utils/test/fixtures';

test.each(TOOL_BOX_MODES)('%o renders ToolBox', (testMode) => {
  const renderResult: RenderResult = render(<ToolBox
    viewMode={testMode.viewMode}
    setViewMode={(viewMode: ViewMode) => { viewMode; }}
    config={TEMPLATE_CONFIG}
    setGraphConfig={( newConfig: GraphConfig) => { newConfig; }}
  />);

  expect(renderResult.asFragment()).toMatchSnapshot();
});
