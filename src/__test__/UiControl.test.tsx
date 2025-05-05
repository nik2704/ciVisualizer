import { render, RenderResult } from '@testing-library/react';
import { getGraphData, getStatusColor } from 'utils/utils';
import {
  getFullStatusList,
  IGraphData,
  NodeGraph,
  Status,
  statusToString,
  stringToStatus,
} from '../components/UIControl/lib/graphTypes';
import UIControl from '../components/UIControl/UIControl';
import { getNodesFilteredByStatus } from '../components/UIControl/lib/uiControlHelper';
import { FilteredNodes } from '../components/UIControl/lib/uiControlTypes';
import { getTestData, STRING_STATUS_DATA } from '../utils/test/fixtures';

test.each(STRING_STATUS_DATA)('%o expected true', (statusObj) => {
  const statusList: Status[] = getFullStatusList();

  expect(statusList.includes(statusObj.status)).toBeTruthy();
  expect(statusToString(statusObj.status)).toBe(statusObj.statusString);
  expect(stringToStatus(statusObj.statusString)).toEqual(statusObj.status);
  expect(getStatusColor(statusObj.status)).toEqual(statusObj.color);
});

it('tests getFullStatusList length', () => {  
  const statusList: Status[] = getFullStatusList();
  expect(statusList.length).toEqual(STRING_STATUS_DATA.length);
});

it('tests getNodesFilteredByStatus', () => {
  const testData: IGraphData = getGraphData(getTestData()); 
  const nodes: NodeGraph[] = [...testData.nodes];
  let statuses: Status[] = getFullStatusList();

  let filteredNodes: FilteredNodes = getNodesFilteredByStatus(nodes, statuses);
  expect(filteredNodes.currentNodes.length).toEqual(nodes.length);
  expect(filteredNodes.filteredIds.length).toEqual(0);

  statuses = statuses.filter((status) => status !== Status.SUCCESS);
  filteredNodes = getNodesFilteredByStatus(nodes, statuses);
  expect(filteredNodes.currentNodes.length).toEqual(nodes.length - 1);
  expect(filteredNodes.filteredIds.length).toEqual(1);

  statuses = statuses.filter((status) => status !== Status.WARNING);
  filteredNodes = getNodesFilteredByStatus(nodes, statuses);
  expect(filteredNodes.currentNodes.length).toEqual(nodes.length - 2);
  expect(filteredNodes.filteredIds.length).toEqual(2);

  statuses = statuses.filter((status) => status !== Status.CRITICAL);
  filteredNodes = getNodesFilteredByStatus(nodes, statuses);
  expect(filteredNodes.currentNodes.length).toEqual(nodes.length - 3);
  expect(filteredNodes.filteredIds.length).toEqual(3);
});

it('renders UIControl initial', () => {
  const renderResult: RenderResult = render(<UIControl
    sourceData={getTestData()}
  />);
  
  expect(renderResult.asFragment()).toMatchSnapshot();
});

it('renders UIControl initial - selected node', () => {
  const testData = getTestData();
  testData.nodes[0].selected = true;
  testData.nodes[0].focused = true;
  
  const renderResult: RenderResult = render(<UIControl
    sourceData={testData}
  />);
  
  expect(renderResult.asFragment()).toMatchSnapshot();
});
