import {
  IGraph,
  IGraphData,
  LinkGraph,
  NodeGraph,
  stringToStatus,
} from 'components/UIControl/lib/graphTypes';
import {
  getTestLink,
  getTestNode,
} from '../utils/test/testUtils';
import {
  getLinksDescriptionDataObject,
  getNodeDescriptionDataObject,
  isOdd,
  getStatusColor,
  getGraphData,
  hasLinks,
} from '../utils/utils';
import { DescrDataArray } from '../utils/utilsTypes';
import {
  getTestData,
  getTestLinksDescriptionData,
  getTestNodeDescriptionData,
  STRING_STATUS_DATA,
} from '../utils/test/fixtures';

it('tests isOdd (true)', () => {  
  expect(isOdd(2)).toBeFalsy();
});

it('tests isOdd (false)', () => {  
  expect(isOdd(3)).toBeTruthy();
});

test.each(getTestLinksDescriptionData())('%o analyzed (Link description)', (linksDescriptionObj) => {
  const testLink: LinkGraph = getTestLink();
  const descrDataArray: DescrDataArray = getLinksDescriptionDataObject(testLink);

  expect(descrDataArray[linksDescriptionObj.idx].name).toEqual(linksDescriptionObj.fieldCaption);
  expect(descrDataArray[linksDescriptionObj.idx].value).toEqual(linksDescriptionObj.fieldValue);
});

test.each(getTestNodeDescriptionData())('%o analyzed (Node description)', (nodeDescriptionObj) => {
  const testNode: NodeGraph = getTestNode();
  const descrDataArray: DescrDataArray = getNodeDescriptionDataObject(testNode);

  expect(descrDataArray[nodeDescriptionObj.idx].name).toEqual(nodeDescriptionObj.fieldCaption);
  expect(descrDataArray[nodeDescriptionObj.idx].value).toEqual(nodeDescriptionObj.fieldValue);
});

test.each(STRING_STATUS_DATA)('%o analyzed (Status to color)', (statusObj) => {
  expect(getStatusColor(statusObj.status)).toEqual(statusObj.color);
});

it('tests getGraphData', () => { 
  const testData: IGraph = getTestData();
  const graphData: IGraphData = getGraphData(testData);

  // Проверка соотвествия размеров структур с "сырыми" данными и преобразованными в формат "графа"
  expect(graphData.nodes !== undefined).toBeTruthy();
  expect(graphData.links !== undefined).toBeTruthy();
  expect(graphData.nodes.length).toEqual(testData.links.length);
  expect(graphData.links.length).toEqual(testData.links.length);

  // Проверка корректности преобразования массива (в формат "графа"). Анализируются узлы:
  // значение каждого поля должно быть корректно преобразовано (если требуется) и передано
  // в соотвествующее поле целефой структуры.
  for (let i = 0; i < graphData.nodes.length; i += 1) {
    expect(graphData.nodes[i].id).toEqual(testData.nodes[i].code);
    expect(graphData.nodes[i].name).toEqual(testData.nodes[i].name);
    expect(graphData.nodes[i].focused).toEqual(testData.nodes[i].focused);
    expect(graphData.nodes[i].hasevents).toEqual(testData.nodes[i].hasevents);
    expect(graphData.nodes[i].nodeType).toEqual(testData.nodes[i].type);
    expect(graphData.nodes[i].status).toEqual(stringToStatus(testData.nodes[i].status));
  }

  // Проверка корректности преобразования массива (в формат "графа"). Анализируются связи:
  // значение каждого поля должно быть корректно преобразовано (если требуется) и передано
  // в соотвествующее поле целефой структуры.
  for (let i = 0; i < graphData.links.length; i += 1) {
    expect(graphData.links[i].name).toEqual(testData.links[i].name);
    expect(graphData.links[i].source).toEqual(testData.links[i].primary);
    expect(graphData.links[i].target).toEqual(testData.links[i].secondary);
    expect(graphData.links[i].linkType).toEqual(testData.links[i].type);
    expect(graphData.links[i].status).toEqual(stringToStatus(testData.links[i].status));
  }
});

it('tests hasLinks function', () => { 
  const testData = getGraphData(getTestData());
  expect(hasLinks('srv1', testData.links)).toBeTruthy;
  expect(hasLinks('srv11', testData.links)).toBeFalsy;
});
