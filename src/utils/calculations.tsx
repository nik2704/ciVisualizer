import { IGraphData, NodeGraph } from 'components/UIControl/lib/graphTypes';
import { LinkMatrix } from 'components/UIControl/lib/LinkMatrix';
import { NodeTypeHierarchy } from 'components/UIControl/lib/hierarchicalTypes';
import { getNodesSortedByFocused, hasLinks } from './utils';

const MIN_DIST_HEIGHT = 120;
const MIN_DIST_WIDTH = 120;

/**
* Расчет координат для размещения объектов по кругу. Если не указан centeredNode - все объекты будут размещены
* по кругу с радиусом 'кол-во объектов' * 110 / 2 * PI. Если указан centeredNode - он будет размещен в центе круга.
* @param {NodeGraph[]} nodes - список узлов.
* @param {number | undefined} height - высота рабочей обрасти.
* @param {number | undefined} width - ширина рабочей обрасти.
* @param {NodeGraph | undefined} centeredNode - узел, который необходимо разместить в центре.
* @returns {NodeGraph[]}
*/
export const forRenderingAsCircle = (
  nodes: NodeGraph[],
  height: number | undefined,
  width: number | undefined,
  centeredNode: NodeGraph | undefined,
): NodeGraph[] => {
  // список узлов,где focused вначале
  const nodesSorted = centeredNode !== undefined ? nodes : getNodesSortedByFocused(nodes);
  // количество секторов (если есть центральный узел, то на 1 меньше)
  const sectors = centeredNode !== undefined ? nodes.length - 1 : nodes.length;
  // угол в градусах
  const baseAlpha: number = 360 / sectors;
  // радиус круга из расчета, что хорда сектора 110
  const circleRadius = (sectors * 110) / (2 * Math.PI);
  // смещение по Х и У в зависимости от ширины и высоты
  const deltaX = width !== undefined ? width / 2 : 100;
  const deltaY = height !== undefined ? height / 7 : 100;

  const result = nodesSorted.reduce<NodeGraph[]>((newNodes, node) => {
    // угол от 0 до дальнего радиуса текущего сектора
    const alpha = baseAlpha * newNodes.length;
    const ugolA = 90 - (360 - alpha);
    // перевод в радианы
    const radians = (ugolA / 180) * Math.PI;
    // расчет координат точки на окружности
    const x = deltaX - circleRadius * Math.cos(radians);
    const y = deltaY + (circleRadius - circleRadius * Math.sin(radians));

    // обногащение "узла" координатами с учетом возможности размещения одного узла в центре
    if (centeredNode !== undefined) {
      if (node.id !== centeredNode.id) {
        newNodes.push({ ...node, x, y });
      }
    } else {
      newNodes.push({ ...node, x, y });
    }

    return [...newNodes];
  }, new Array<NodeGraph>());

  if (centeredNode !== undefined) {
    centeredNode.x = deltaX;
    centeredNode.y = deltaY + circleRadius;

    result.push({ ...centeredNode });
  }
  
  return result;
};

/**
* Расчет координат для размещения объектов в виде ортогонального графа - все объекты будут размещены
* по по уровням: в верхней части - те, что наиболее часто являются "target", в нижней части - реже всего.
* уровни также формируются путем размещения связанных объектов по соседству. Отрисовка производится "сверху вниз".
* @param {IGraphData} dataForProcessing - список узлов.
* @returns {NodeGraph[]}
*/
export const forRenderingAsOrthogonal = (dataForProcessing: IGraphData): NodeGraph[] => {
  // для расчета Х по узлам, в которые не идет ни одна связь
  let unlinkedDelta = 1;

  // получение массива соседних узлов. Структура массива: каждый элемент - строка идентификаторов узлов
  const linkMantrix = new LinkMatrix(dataForProcessing);
  const nodesColocated = linkMantrix.getNodesColocated();

  return [...dataForProcessing.nodes].map((node) => {
    // позиция на схеме выбирается исходя из позиции узла в матрице (строка / столбец)
    const matrixCoordinates = linkMantrix.getValueCoordinatsFromResult(nodesColocated, node.id);
    // значения по умолчанию
    let x = 100 * unlinkedDelta;
    let y = 80;

    // проверка наличия связей
    if (hasLinks(node.id, dataForProcessing.links)) {
      if (matrixCoordinates !== null) {
        // определяется максимально число узлов в строке для расчета координат узлов в других строках
        // (увеличить расстояние между узлами)
        let maxNodesCount = 1;
        nodesColocated.forEach((line) => {
          if (line.length > maxNodesCount) maxNodesCount = line.length;
        });

        const nodesCount = nodesColocated[matrixCoordinates.line].length;
        // расчет расстояния (шага) между узлами
        const step = maxNodesCount / (nodesCount + 1);

        x = (matrixCoordinates.column + 1) * (MIN_DIST_WIDTH * step) + 30;
        y = (matrixCoordinates.line + 1) * MIN_DIST_HEIGHT + 80;
      }
    } else {
      unlinkedDelta += 1;
    }

    return { ...node, x, y };
  });
};

/**
* Расчет координат для размещения объектов в виде иерархического графа - все объекты будут размещены
* по по уровням: в верхней части - те, что наиболее часто являются "target", в нижней части - реже всего.
* уровни также формируются путем размещения связанных объектов по соседству
* @param {IGraphData} dataForProcessing - список узлов.
* @returns {NodeGraph[]}
*/
export const forRenderingAsHierarchical = (dataForProcessing: IGraphData,
  typeList: NodeTypeHierarchy[]): NodeGraph[] => {
  /**
  * Получение значени уровня отображения для узла (в зависимости от типа).
  * Т.е. строка (У), в которую попадет узел зависит от данного уровня.
  * если типа узла в списке нет, результат -1.
  * @param {string | undefined} nodeType - тип узла.
  * @returns {NodeGraph[]}
  */
  const getNodeLevel = (nodeType: string | undefined): number => {
    let nodeLevel = -1;

    if (nodeType) {
      nodeLevel = typeList.findIndex((element) => element.name === nodeType);
    }

    return nodeLevel;
  };

  // определение уровня для каждого узла в списке
  const nodesLevels = [...dataForProcessing.nodes].map((node) => (
    { nodeId: node.id, nodeLevel: getNodeLevel(node.nodeType) }
  ))
    .sort((node1, node2) => node1.nodeLevel - node2.nodeLevel);

  // определение количества узлов на каждом уровне (для распределения узлов в строке)
  const levels = [...new Set(nodesLevels
    .map((levelObj) => levelObj.nodeLevel))]
    .sort((level1, level2) => level1 - level2)
    .map((level) => ({ level, nodeCount: nodesLevels.filter((nodeLevel) => nodeLevel.nodeLevel === level).length }));

  // расчет значений: минимальный уровень, максимальный, максимальное количество узлов, длина строки
  const minLevel = levels.length > 0 ? levels[0].level : -1;
  const maxLevel = levels.length > 0 ? levels[levels.length - 1].level : -1;
  const maxNodesOfLevel = levels
    .sort((level1, level2) => level2.nodeCount - level1.nodeCount)[0].nodeCount;
  const lineWidth = (maxNodesOfLevel - 1) * MIN_DIST_WIDTH;
  
  return [...dataForProcessing.nodes].map((node) => {
    // определение шага размещения
    const nodeLevel = getNodeLevel(node.nodeType);
    const nodesOfSameLevel = nodesLevels.filter((levelObject) => levelObject.nodeLevel === nodeLevel);
    let step = nodesOfSameLevel.length > 0 ? lineWidth / nodesOfSameLevel.length : MIN_DIST_WIDTH;
    if (step < MIN_DIST_WIDTH) step = MIN_DIST_WIDTH;

    const x = (step * (nodesOfSameLevel.findIndex((nodeLevelObject) => nodeLevelObject.nodeId === node.id) + 1));
    let y = 0;

    // определение строки для размещения узла с учетом данных об уровне (-1, если тип отсутствует в списке)
    if (nodeLevel > -1) {
      y = (MIN_DIST_HEIGHT * (levels.findIndex((level) => level.level === nodeLevel) + 1));
    } else {
      y = (MIN_DIST_HEIGHT * (maxLevel - minLevel - 1));
    }

    return {
      ...node,
      y,
      x,
    };
  });
};
