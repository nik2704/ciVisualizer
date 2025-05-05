import { render, screen, fireEvent } from '@testing-library/react';
import { getGraphData } from 'utils/utils';
import { NodeGraph } from '../components/UIControl/lib/graphTypes';
import UIControl from '../components/UIControl/UIControl';
import { getTestData } from '../utils/test/fixtures';

describe('UiControl click - LegendNodes', () => {
  test('Legend click nodes', () => {
    render(<UIControl
      sourceData={getTestData()}
    />);

    const testNodes: NodeGraph[] = getGraphData(getTestData()).nodes;

    testNodes.forEach((testNode) => {
      expect(screen.getByTestId('ui-main-graph-container')).toHaveTextContent(testNode.id);

      const testElement = screen.getByTestId(`ui-legend-node-btn-${testNode.status}`);
      fireEvent.click(testElement);

      expect(screen.getByTestId('ui-main-graph-container')).not.toHaveTextContent(testNode.id);
      fireEvent.click(testElement);
    });
  });
});
