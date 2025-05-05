import { NodeGraph, LinkGraph } from 'components/UIControl/lib/graphTypes';
import { getGraphData } from 'utils/utils';
import { getTestData } from 'utils/test/fixtures';

/**
* Возвращает узел из тестового набора по индексу.
* @param {number} index - индекс в тестовом наборе.
* @returns {IGraph}
*/
export const getTestNode = (index: number = 0): NodeGraph => getGraphData(getTestData()).nodes[index];

/**
* Возвращает связь из тестового набора по индексу.
* @param {number} index - индекс в тестовом наборе.
* @returns {IGraph}
*/
export const getTestLink = (index: number = 0): LinkGraph => getGraphData(getTestData()).links[index];
