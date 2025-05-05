import { NODE_TYPE_LIST } from 'components/UIControl/lib/hierarchicalTypes';
import { forRenderingAsCircle, forRenderingAsHierarchical, forRenderingAsOrthogonal } from 'utils/calculations';
import { getTestData } from 'utils/test/fixtures';
import { getGraphData } from 'utils/utils';

it('tests rendering as circle', () => { 
  const testData = getGraphData(getTestData());
  const renderedData = forRenderingAsCircle(testData.nodes, 90, 90, undefined);

  expect(Math.trunc(Number(renderedData[0].x))).toEqual(45);
  expect(Math.trunc(Number(renderedData[0].y))).toEqual(12);
});

it('tests rendering as orthogonal scheme', () => { 
  const testData = getGraphData(getTestData());
  const renderedData = forRenderingAsOrthogonal(testData);
  const y0 = Number(renderedData[0].y);
  const y1 = Number(renderedData[1].y);
  const y2 = Number(renderedData[2].y);
  
  expect(y1).toBeLessThan(y0);
  expect(y0).toBeLessThan(y2);
});

it('tests rendering as hierarchical scheme', () => { 
  const testData = getGraphData(getTestData());
  const renderedData = forRenderingAsHierarchical(testData, NODE_TYPE_LIST);
  const y0 = Number(renderedData[0].y);
  const y1 = Number(renderedData[1].y);
  const y2 = Number(renderedData[2].y);
    
  expect(y2).toBeLessThan(y0);
  expect(y1).toBeLessThan(y2);
});
