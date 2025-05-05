import {
  IGraph,
  IGraphData,
  LinkGraph,
  NodeGraph,
  Status,
  statusToString,
  stringToStatus,
  Node,
  Link,
} from '../components/UIControl/lib/graphTypes';
import { DescrDataArray } from './utilsTypes';

/**
* Проверка на четность.
* @param {number} idx - число, подлежащее проверке.
* @returns {boolean}
*/
export const isOdd = (idx: number): boolean => (idx % 2 !== 0);

/**
* Получение массива - описание связи.
* @param {LinkGraph} currentLink - связь.
* @returns {LinksDescrData}
*/
export const getLinksDescriptionDataObject = (currentLink: LinkGraph | undefined): DescrDataArray => {
  let result: DescrDataArray = [
    { name: 'Тип', value: '' },
    { name: 'Название', value: '' },
    { name: 'Источник', value: '' },
    { name: 'Получатель', value: '' },
    { name: 'Статус', value: '' },
  ];

  if (currentLink) {
    result = [
      { name: 'Тип', value: currentLink.linkType },
      { name: 'Название', value: currentLink.name },
      { name: 'Источник', value: currentLink.source },
      { name: 'Получатель', value: currentLink.target },
      { name: 'Статус', value: statusToString(currentLink.status), highliteStatus: true },
    ];
  }

  return result;
};

/**
* Получение массива - описание узла.
* @param {NodeGraph} currentNode - узел.
* @returns {LinksDescrData}
*/
export const getNodeDescriptionDataObject = (currentNode: NodeGraph | undefined): DescrDataArray => {
  let result: DescrDataArray = [
    { name: 'Код', value: '' },
    { name: 'Название', value: '' },
    { name: 'Статус', value: '' },
  ];
  
  if (currentNode) {
    result = [
      { name: 'Код', value: currentNode.id },
      { name: 'Название', value: currentNode.name },
      { name: 'Статус', value: statusToString(currentNode.status), highliteStatus: true },
    ];
  }
  
  return result;
};

/**
* Получение названия цвета статуса (для формирования класса CSS).
* @param {Status} status - статус.
* @returns {string}
*/
export const getStatusColor = (status: Status): string => {
  let statusColor = 'gray';
  switch (status) {
    case Status.SUCCESS:
      statusColor = 'green';
      break;
    case Status.WARNING:
      statusColor = 'orange';
      break;
    case Status.CRITICAL:
      statusColor = 'red';
      break;
    default:
      break;
  }

  return statusColor;
};

/**
* Преобразование одного узла в структуру NodeGraph.
* @param {Node} rawNode - входной объект с данными.
* @returns {NodeGraph}
*/
export const getGraphNode = (rawNode: Node): NodeGraph => ({
  id: rawNode.code,
  name: rawNode.name,
  focused: rawNode.focused,
  selected: rawNode.selected,
  hasevents: rawNode.hasevents,
  nodeType: rawNode.type,
  status: stringToStatus(rawNode.status),
});

/**
* Преобразование одной связи в структуру LinkGraph.
* @param {Link} rawLink - входной объект с данными.
* @returns {LinkGraph}
*/
export const getGraphLink = (rawLink: Link): LinkGraph => ({
  name: rawLink.name,
  linkType: rawLink.type,
  source: rawLink.primary,
  target: rawLink.secondary,
  status: stringToStatus(rawLink.status),
});

/**
* Преобразование входных данных в структуру, используемую графом.
* @param {IGraph} sourceData - вхлдной объект с данными.
* @returns {IGraph}
*/
export const getGraphData = (sourceData: IGraph): IGraphData => {
  const graphData: IGraphData = { nodes: [], links: [] };
      
  sourceData.nodes.forEach((node) => {
    graphData.nodes.push({ ...getGraphNode(node) });
  });

  sourceData.links.forEach((link) => {
    graphData.links.push({ ...getGraphLink(link) });
  });

  return graphData;
};

/**
* Сортировка (focused в начале списка).
* @param {NodeGraph[]} nodes - список узлов.
* @returns {NodeGraph[]}
*/
export const getNodesSortedByFocused = (nodes: NodeGraph[]): NodeGraph[] => (
  nodes
    .sort((node1, node2) => {
      if (node1.focused && node2.focused) return -1;
      if (node1.focused && !node2.focused) return -1;
      return 1;
    })
);

/**
* Поиск первого узла с атрибутом focused = true.
* @param {NodeGraph[]} nodes - список узлов.
* @returns {NodeGraph}
*/
export const getNodeFocused = (nodes: NodeGraph[]): NodeGraph | undefined => {
  const nodesFocused = nodes.filter((node) => node.focused === true);

  if (nodesFocused.length > 0) return nodesFocused[0];

  return undefined;
};

/**
* Проверка связан ли узел с другими.
* @param {string} nodeId - узел.
* @param {LinkGraph[]} links - массив связей.
* @returns {boolean}
*/
export const hasLinks = (nodeId: string, links: LinkGraph[]): boolean => {
  for (const link of links) {
    if (link.source === nodeId || link.target === nodeId) {
      return true;
    }
  }

  return false;
};
